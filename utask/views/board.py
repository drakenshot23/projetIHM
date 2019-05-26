from django.core.serializers.json import DjangoJSONEncoder
from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from utask.models import Project, Profile
from django.http import JsonResponse
from django.core.serializers import serialize


def create_project(request):
    user = request.user
    profile = Profile.objects.get(user_id=user.id)
    project = Project(name="Nouveau projet", description="Decrivez votre projet.", creator_id=profile.id)
    project.save()

    data = {
        "project": {
            'id': project.id,
            'name': project.name,
            'description': project.description
        }
    }

    return JsonResponse(data)


class BoardView(TemplateView):
    template_name = 'page/board.html'

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return render(request, self.template_name)
        else:
            return redirect('/accounts/login/')
