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
        "title": "Tic-Tac-Toe",
        "header": "Tic-Tac-Toe",   
    }
    return render(request, 'index.html',context=context)


def register(request):
    if request.method == "POST":
        form = forms.RegistrationForm(request.POST or None)
        if form.is_valid():
            form.save(request)
            return redirect("/login/")
    else:
        form = forms.RegistrationForm(request.POST or None)

    context = {
        "form": form,
        "title": "Registration",
        "header": "Register",
    }
    return render(request, 'registration/register.html',context=context)
   
    
def logout_user(request):
    logout(request)
    return redirect("/")

@login_required
def account(request):
    context = {
        "title": "Account",   
    }
    return render(request, 'account.html',context=context)