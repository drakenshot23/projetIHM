from django.core.serializers.json import DjangoJSONEncoder
from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from utask.models import Project, Profile
from django.http import JsonResponse
from django.core.serializers import serialize


def delete_all_project(request):
    projects = Project.objects.all()
    for project in projects:
        project.delete()
    return redirect('home')


def create_project(request):
    user = request.user
    profile = Profile.objects.get(user_id=user.id)
    project = Project(name="Nouveau projet", description="Decrivez votre projet.", creator_id=profile.id)
    project.save()
    html = "<a href='/board/" + str(project.id) + "'><div class='card-project'><img src='static/images/img-project-default.svg' alt='Photo du projet'><p class='title'>" + project.name + "</p><p class='description'>" + project.description + "</p></div></a>"
    data = {
        "project": {
            'id': project.id,
            'name': project.name,
            'description': project.description,
            'html': html
        }
    }

    return JsonResponse(data)


class BoardView(TemplateView):
    template_name = 'page/board.html'

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            project = Project.objects.get(id=self.kwargs['project_id'])
            print(project)
            return render(request, self.template_name, {'project': project})
        else:
            return redirect('/accounts/login/')
