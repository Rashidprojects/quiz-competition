import random
from django.http import JsonResponse
from rest_framework import generics
from django.core.mail import send_mail
from rest_framework.permissions import IsAuthenticated
from core.models import Quiz, QuizRoom, Question
from core.serializers import QuizSerializer, QuizRoomSerializer, QuestionSerializer
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt

# A dictionary to temporarily store OTPs; for production, store them in a model
OTP_STORE = {}


# List all quizzes (public only) or create a new quiz
class QuizListView(generics.ListCreateAPIView):
    queryset = Quiz.objects.filter(is_public=True) # Show only public quizzes
    serializer_class = QuizSerializer

    def perform_create(self, serializer):
        # Link the quiz to the creator
        serializer.save(creator=self.request.user)

# Retrieve, update, or delete a quiz
class QuizDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

# Create a new quiz room
class QuizRoomCreateView(generics.CreateAPIView):
    queryset = QuizRoom.objects.all()
    serializer_class = QuizRoomSerializer

    def perform_create(self, serializer):
        # Set up a room ID and link the quiz
        serializer.save(room_id="ROOM-" + str(self.request.user.id))

# List quiz rooms for a specific quiz
class QuizRoomListView(generics.ListAPIView):
    queryset = QuizRoom.objects.all()
    serializer_class = QuizRoomSerializer

    def get_queryset(self):
        return QuizRoom.objects.filter(quiz_id=self.kwargs['quiz_id'])
    
class QuestionListView(generics.ListCreateAPIView):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        quiz_id = self.kwargs['quiz_id']
        return Question.objects.filter(quiz_id=quiz_id)

class QuestionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


# Send OTP to mail
def send_otp_email(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        if email:
            otp = random.randint(100000, 999999)
            OTP_STORE[email] = otp
            send_mail(
                'Your OTP Code',
                f'Your OTP code is {otp}',
                'noreply@quizapp.com',
                [email],
                fail_silently=False,
            )
            return JsonResponse({'status': 'OTP sent successfully'})
        return JsonResponse({'error': 'Email not provided'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

def verify_otp(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        otp = request.POST.get('otp')
        
        print(f'Your OTP code is {otp} and session OTP is ')

         # Verify OTP
        if OTP_STORE.get(email) == int(otp):
            del OTP_STORE[email]  # OTP used, so delete it
            return JsonResponse({'success': True, 'message': 'OTP verified'})
        else:
            return JsonResponse({'success': False, 'message': 'Invalid OTP'})


def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken' : csrf_token})