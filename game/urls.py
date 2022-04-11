from django.urls import path
from .views import homePageView, loginView

urlpatterns = [
    path('home', homePageView, name='home'),
    path('',loginView, name='login'),
]