from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views import View
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from utask.models import Project, Profile, TaskList
from utask.serializers.board import TaskListSerializer, TaskSerializer


def delete_all_project(request):
    Project.objects.delete()
    return redirect('home')


def create_project(request):
    user = request.user
    profile = Profile.objects.get(user_id=user.id)
    project = Project(name="Nouveau projet", description="Decrivez votre projet.", creator_id=profile.id)
    project.save()
    html = "<a href='/board/" + str(
        project.id) + "'><div class='card-project'><img src='static/images/img-project-default.svg' alt='Photo du projet'><p class='title'>" + project.name + "</p><p class='description'>" + project.description + "</p></div></a>"
    data = {
        "project": {
            'id': project.id,
            'name': project.name,
            'description': project.description,
            'html': html
        }
    }

    return JsonResponse(data)


class BoardView(View):
    template_name = 'page/board.html'

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            project = Project.objects.get(id=self.kwargs['project_id'])
            task_list = TaskList.objects.prefetch_related('tasks').filter(project_id=project.id)

            response = {
                "project": project,
                "taskList": task_list
            }
            return render(request, self.template_name, response)
        else:
            return redirect('/accounts/login/')


class BoardAPIViewSet(viewsets.ModelViewSet):
    queryset = None
    serializer_class = None

    @action(methods=['POST'], detail=True)
    def update_project_title(self, request, *args, **kwargs):
        project = Project.objects.get(pk=self.kwargs['pk'])
        project.name = request.data['name']
        project.save(update_fields=['name'])

        response = {
            "message": '',
            "success": True
        }

        return Response(response, status=status.HTTP_200_OK)

    @action(methods=['POST'], detail=True)
    def update_task_list_name(self, request, *args, **kwargs):
        list = TaskList.objects.get(id=self.kwargs['pk'])
        list.name = request.data['name']
        list.save(update_fields=['name'])

        response = {
            "message": '',
            "success": True
        }

        return Response(response, status=status.HTTP_200_OK)

    @action(methods=['POST'], detail=False)
    def add_task_list(self, request, *args, **kwargs):
        task_list = TaskListSerializer(data=request.data)
        if task_list.is_valid():
            pass
            # task_list.save()
        else:
            response = {
                "message": 'Invalid request',
                "success": False
            }

            return Response(response, status=status.HTTP_200_OK)

        response = {
            "new_list": 20,
            "name": "nouvelle liste ok",
            "message": '',
            "success": True
        }

        return JsonResponse(response)

    @action(methods=['POST'], detail=True)
    def add_new_task(self, request, *args, **kwargs):
        task = TaskSerializer(data=request.data)
        if task.is_valid():
            task.save()
        else:
            response = {
                "message": 'Invalid request',
                "success": False
            }

            return Response(response, status=status.HTTP_200_OK)

        response = {
            "new_task": task.data['id'],
            "message": '',
            "success": True
        }

        return Response(response, status=status.HTTP_200_OK)
