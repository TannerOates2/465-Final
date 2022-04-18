from django.urls import path
from . import views 
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('home/', views.homePageView, name='home'),
    path('', auth_views.LoginView.as_view()),
    path('login/', auth_views.LoginView.as_view()),
    path('register/', views.register, name="register"),
    path('logout/', views.logout_user, name="logout"),
]