from pprint import pprint

from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from utask.models import Profile, Project
from django.http import JsonResponse
from django.http import HttpResponse
import json


def update_user(request):
    user = request.user
    data = request.POST.get('data')
    myjson = json.loads(data)
    if myjson['attribute'] == "first_name":
        user.first_name = myjson['value']

    if myjson['attribute'] == "last_name":
        user.last_name = myjson['value']

    user.save()
    return JsonResponse({'status': 'Updated'})


class HomeView(TemplateView):
    template_name = 'page/home.html'

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            user = request.user
            profile = Profile.objects.get(user_id=user.id)
            data = json.dumps(profile.skills)
            a = json.loads(data)
            projects = Project.objects.filter(creator_id=profile.id)
            return render(request, self.template_name, {'profile': profile, 'data': a, 'projects': projects})
        else:
            return redirect('/accounts/login/')
