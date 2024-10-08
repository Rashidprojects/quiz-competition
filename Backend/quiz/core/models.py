from django.db import models
from django.contrib.auth.models import User

class Quiz(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100) # Example : 'Science', 'Coding'
    description = models.TextField(blank=True)
    is_public = models.BooleanField(default=True) # Public or Private quiz
    creator = models.ForeignKey(User, on_delete=models.CASCADE) # Reference to the user who created the quiz
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)

    def __str__(self):
        return self.text
    
class Answer(models.Model):
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text
    
class QuizRoom(models.Model):
    quiz = models.ForeignKey(Quiz, related_name='rooms', on_delete=models.CASCADE)
    room_id = models.CharField(max_length=50, unique=True) # Room id for joining the quiz
    participants = models.ManyToManyField(User, related_name='quiz_rooms') # Users joining this room
    started_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.room_id