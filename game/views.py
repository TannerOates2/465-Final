from django.shortcuts import render

# Create your views here.
def homePageView(request):
    context = {
        "title": "Home Page",
        "header": "Tic-tac-toe",
        
    }
    return render(request, 'index.html',context=context)

def loginView(request):
    context = {
        "title": "Login",
        
    }
    return render(request,'login.html',context=context)