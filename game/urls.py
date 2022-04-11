from django.urls import path
from .views import homePageView, loginView,room

urlpatterns = [
    path('home', homePageView, name='home'),
    path('',loginView, name='login'),
    path('<str:room_name>/', room, name='room'),
]