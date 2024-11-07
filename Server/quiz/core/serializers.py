from rest_framework import serializers
from .models import User


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'fullname', 'email', 'email_verified', 'bg_color', 'icon']
        
class UserEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'fullname', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},  # Ensure password is write-only
        }

    def create(self, validated_data):
        # Create the user instance but do not save it yet
        return User(**validated_data)

class VerifyOtpSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    otp = serializers.CharField(max_length=6)

    def validate(self, attrs):
        # Optional: Add any custom validation here
        return attrs
    
class UserLoginSerializer(serializers.Serializer):
    username_or_email = serializers.CharField()
    password = serializers.CharField(write_only=True)
