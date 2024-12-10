from django.db import models
from core.models import User
import uuid

class NewQuiz(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name= "quizzes")
    title = models.CharField(max_length=255)
    organization_name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    user_size = models.IntegerField()
    banner_image = models.ImageField(upload_to="quiz_banners/", blank=True, null=True)
    num_questions = models.PositiveIntegerField()
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    show_results = models.BooleanField(default=True)
    is_public = models.BooleanField(default=True)
    room_code = models.CharField(max_length=6, unique=True)
    join_link = models.URLField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
class Question(models.Model):
    quiz = models.ForeignKey(NewQuiz, on_delete=models.CASCADE, related_name="questions")
    text = models.TextField()
    marks = models.PositiveIntegerField(default=1)
    
    def __str__(self):
        return self.text
    
    
class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="choices")
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)
    
    def __str__(self):
        return self.text