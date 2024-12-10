import uuid
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404, redirect
from django.utils import timezone
from django.conf import settings
from django.contrib.auth import authenticate
from rest_framework import status
import logging
from google.oauth2 import id_token
from google.auth.transport import requests
from rest_framework.decorators import api_view
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from .utils import generate_random_color
from rest_framework.views import APIView
from .models import User
from .serializers import UserRegistrationSerializer, UserDetailSerializer, UserLoginSerializer, UserEmailSerializer
import random


class UserDetailView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_object(self):
         # Get the username from the URL
        username = self.kwargs['username']
        return get_object_or_404(User, username=username)
    
class UserMailView(RetrieveAPIView):
    queryset = User.username
    serializer_class = UserEmailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_object(self):
         # Get the username from the URL
        email = self.kwargs['email']
        return get_object_or_404(User, email=email)

class CheckUsernameView(APIView):
    def get(self, request, username):
        # Check if the username already exists in the database
        if User.objects.filter(username=username).exists():
            return Response({"available": False, "message": "This username is already taken."}, status=status.HTTP_200_OK)
        else:
            return Response({"available": True, "message": "This username is available."}, status=status.HTTP_200_OK)

class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Create a new user with unverified email
        user = User(
            username=serializer.validated_data['username'],
            fullname=serializer.validated_data['fullname'],
            email=serializer.validated_data['email'],
            password=serializer.validated_data['password'],
            email_verified=False,
            verification_token=uuid.uuid4(),
            bg_color= generate_random_color(),  # Set random background color
            icon=serializer.validated_data['username'][0].upper() 
        )
        user.set_password(serializer.validated_data['password'])  # Hash the password
        user.save()

        # Generate a 6-digit OTP
        user.otp = str(random.randint(100000, 999999))
        user.otp_expiration = timezone.now() + timezone.timedelta(minutes=5)  # Set OTP expiration time
        user.save()

        # Send OTP email
        send_mail(
            'Your OTP Code',
            f'Your OTP code is: {user.otp}. It is valid for 5 minutes.',
            settings.EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
        )

        return Response({"message": "OTP sent to your email. Please check your inbox."}, status=status.HTTP_200_OK)

class VerifyOtpView(APIView):
    def post(self, request):
        username = request.data.get('username')
        otp = request.data.get('otp')
        
        print("Entered username:", username)  # Check if username is received
        print("Entered OTP:", otp)  # Check if OTP is received

        try:
            user = User.objects.get(username=username)
            print('User found:', user.username)  # Confirm user is found
            print('User stored OTP:', user.otp, 'User entered OTP:', otp)  # Print both OTPs
        except User.DoesNotExist:
            print("User not found")  # Print if user is not found
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        # Check if OTP is valid and not expired
        if user.otp == otp and user.otp_expiration > timezone.now():
            user.email_verified = True
            user.otp = None  # Clear OTP after verification
            user.otp_expiration = None  # Clear OTP expiration
            user.save()  # Ensure you save the user after changing fields
            return Response({"message": "OTP verified successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid OTP or OTP expired."}, status=status.HTTP_400_BAD_REQUEST)
        
class UserSignInView(APIView):
    def post(self, request):
        # Deserialize the request data using the UserLoginSerializer
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username_or_email = serializer.validated_data['username_or_email']
        password = serializer.validated_data['password']

        # Check if the user is signing in with a username or email
        user = None
        if '@' in username_or_email:  # It's an email
            try:
                user = User.objects.get(email=username_or_email)
            except User.DoesNotExist:
                return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
        else:  # It's a username
            try:
                user = User.objects.get(username=username_or_email)
            except User.DoesNotExist:
                return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate the user
        if user and user.check_password(password):
            return Response({"message": "Sign-in successful"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
        

logger = logging.getLogger(__name__)

@api_view(['POST'])
def google_login(request):
    token = request.data.get('token')
    logger.debug(f"Received token: {token}")

    if not token:
        return Response({'error': 'Token is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Verify the token
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), "214071378160-adm1tfkuuobg61n576q97cnplq2rap23.apps.googleusercontent.com")
        
        # Process user information (e.g., create or retrieve user in your database)
        user_email = idinfo['email']
        user_fullname = idinfo['name']
        user_firstname = idinfo.get('given_name', user_fullname.split()[0])
        
        try:
            user = User.objects.get(email=user_email)
            # If user exists, return user details
            return Response({
                'username': user.username,
                'fullname': user.fullname,
                'email': user.email,
                'bg_color': user.bg_color,
                'icon': user.icon,
            }, status=status.HTTP_200_OK)
            
        except User.DoesNotExist:
            # Generate a new unique username and set icon and background
            user_id = str(uuid.uuid4().int)[:3]  # Generates a unique user ID part
            username = f"{user_firstname}{user_id}"  # Example: rashid123
            bg_color = generate_random_color()  # Use your utility function
            icon = user_firstname[0].upper()

            # Create new user
            user = User(
                username=username,
                fullname=user_fullname,
                email=user_email,
                email_verified=True,  # Set email verified since verified by Google
                bg_color=bg_color,
                icon=icon
            )
            user.save()

            return Response({
                'username': user.username,
                'fullname': user.fullname,
                'email': user.email,
                'bg_color': user.bg_color,
                'icon': user.icon,
            }, status=status.HTTP_201_CREATED)

    except ValueError:
        return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

