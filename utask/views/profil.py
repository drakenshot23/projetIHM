from pprint import pprint

from django.shortcuts import redirect, render
from utask.models import Profile
from django.http import JsonResponse, HttpResponse


def updateProfil(request):
    user = request.user
    skill = request.POST.get('skills')
    profile = Profile.objects.get(user_id=user.id)
    pprint(skill)
    profile.skills= skill
    profile.save()

    return JsonResponse({'status': 'Updated', 'skill': skill})
"""
[
    {
        "name": "Css",
        "score": 0
    },
    {
        "name": "Php",
        "score": 0
    },
    {
        "name": "Java",
        "score": 0
    },
    {
        "name": "Html",
        "score": 0
    },
    {
        "name": "JS",
        "score": 0
    }
]
"""


