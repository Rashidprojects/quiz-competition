from rest_framework import serializers
from .models import Quiz, Question, Answer, QuizRoom

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'text', 'is_correct']

class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True) # Nested serialization for answers

    class Meta:
        model = Question
        fields = ['id', 'text', 'answers']

class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True) # Nested serialization for questions

    class Meta:
        model = Quiz
        fields = ['id', 'title', 'category', 'description', 'is_public', 'questions', 'created_at']

class QuizRoomSerializer(serializers.ModelSerializer):
    quiz = QuizSerializer() # Include quiz details in the room

    class Meta:
        model = QuizRoom
        fields = ['id', 'room_id', 'quiz', 'participants', 'started_at']