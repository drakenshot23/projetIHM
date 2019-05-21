from django.shortcuts import redirect, render


def updateProfil(request):
    firstname = request.POST['firstname']
    lastname = request.POST['lastname']
    user = request.user

    return redirect('home')
