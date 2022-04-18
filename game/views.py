from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.contrib.auth import login
from django.contrib import messages

from . import models 
from . import forms

@login_required
def homePageView(request):
    context = {
        "title": "Home Page",
        "header": "Stuff",   
    }
    return render(request, 'index.html',context=context)


def register(request):
    if request.method == "POST":
        form = forms.RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save(request)
            login(request,user)
            messages.success(request, "Account created successfully")
            return redirect("/home")
    else:
        form = forms.RegistrationForm(request.POST)

    context = {
        "form": form,
        "title": "Registration",
        "header": "Register",
    }
    return render(request, 'registration/register.html',context=context)

def login(request):
    context = {
        "title": "Login",
        "header": "Login",
    }
    return render(request, 'registration/login.html',context=context)
    
    
def logout_user(request):
    logout(request)
    return redirect("/login")