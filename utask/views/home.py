from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from utask.models import Profile, Project
from django.http import JsonResponse
from django.http import HttpResponse
import json




class HomeView(TemplateView):
    template_name = 'page/home.html'

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            user = request.user
            profile = Profile.objects.get(user_id=user.id)
            projects = Project.objects.filter(creator_id=profile.id)
            skills = json.loads(profile.skills)
            return render(request, self.template_name, {'profile': profile, 'projects': projects, 'skills': skills})
        else:
            return redirect('/accounts/login/')
