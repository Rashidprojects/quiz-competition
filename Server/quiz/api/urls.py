from django.urls import path
from core.views import UserRegistrationView, VerifyOtpView, UserDetailView, UserSignInView, UserMailView, google_login

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('verify-otp/', VerifyOtpView.as_view(), name='verify-otp'),
    path('user/<str:username>/', UserDetailView.as_view(), name='user-detail'),
    path('signin/', UserSignInView.as_view(), name='signin'),
    path('usermail/<str:email>/', UserMailView.as_view(), name='user-mail'),
    path('google-login/', google_login, name='google-login'),

]
