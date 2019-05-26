from django.shortcuts import redirect, render
from utask.models import Profile
from utask.models import CodePromo
import json


def updateProfil(request):
    user = request.user

    codeFind = CodePromo.objects.filter(code="LP-PRISM")

    if not codeFind:
        skills = json.dumps({1: "Php", 2: "Css", 3: "Javascript", 4: "Html", 5: "SQL"}, sort_keys=True)
        code = CodePromo(code="LP-PRISM", matieres=skills)
        code.save()

    code = CodePromo.objects.get(id=1)
    profileFind = Profile.objects.get(user_id=user.id)

    if not profileFind:
        profile = Profile(skills=code.matieres, user_id=user.id, codePromo_id=code.id)
        profile.save()

    return redirect('home')

