# api/urls.py
from django.urls import path
from .views import QuizListView, QuizDetailView, QuestionListView, QuestionDetailView,QuizRoomListView,QuizRoomCreateView
from .import views

urlpatterns = [
    path('quizzes/', QuizListView.as_view(), name='quiz-list'),
    path('quizzes/<int:pk>/', QuizDetailView.as_view(), name='quiz-detail'),
    path('quizzes/<int:quiz_id>/questions/', QuestionListView.as_view(), name='question-list'),
    path('quizzes/<int:quiz_id>/questions/<int:pk>/', QuestionDetailView.as_view(), name='question-detail'),
    path('quizzes/<int:quiz_id>/rooms/', QuizRoomListView.as_view(), name='quiz-room-list'),
    path('rooms/create/', QuizRoomCreateView.as_view(), name='quiz-room-create'),
    path('send-otp-email/', views.send_otp_email, name=('send_otp_email')),
    path('verify-otp/', views.verify_otp, name=('verify-otp')),
    path('get-csrf-token/', views.get_csrf_token, name='get_csrf_token')
]
