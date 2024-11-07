from django.db import models
import uuid
from django.utils import timezone
from django.contrib.auth.hashers import make_password

class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    fullname = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    email_verified = models.BooleanField(default=False)
    verification_token = models.UUIDField(default=uuid.uuid4, editable=False)
    otp = models.CharField(max_length=6, blank=True, null=True)  # New field for OTP
    otp_expiration = models.DateTimeField(blank=True, null=True)  # New field for OTP expiration
    bg_color = models.CharField(max_length=7, blank=True, null=True)
    icon = models.CharField(max_length=1, blank=True, null=True)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        from django.contrib.auth.hashers import check_password
        return check_password(raw_password, self.password)
    
    def __str__(self):
        return self.username
