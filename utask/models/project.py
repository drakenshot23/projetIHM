import datetime

from django.db import models
from utask.choices import TASK_STATUS
from utask.models.profile import Profile


class Color(models.Model):
    code = models.CharField(max_length=7)


class TaskFile(models.Model):
    file = models.FileField(upload_to='taskFiles/')


class TaskTag(models.Model):
    name = models.CharField(max_length=100)
    color = models.ForeignKey(Color, related_name='taskTags', on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Project(models.Model):
    creator = models.ForeignKey(Profile, related_name='projects', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    startDate = models.DateField(default=datetime.date.today())
    endDate = models.DateField()
    image = models.FileField(upload_to='projectImages/')
    members = models.ManyToManyField(Profile)

    def __str__(self):
        return self.name


class TaskList(models.Model):
    name = models.CharField(max_length=100)
    project = models.ForeignKey(Project, related_name='takLists', on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    files = models.ForeignKey(TaskFile, related_name='tasks', on_delete=models.CASCADE)
    tags = models.ForeignKey(TaskTag, related_name='tasks', on_delete=models.CASCADE, null=True, blank=True)
    startDate = models.DateTimeField(default=datetime.datetime.now())
    endDate = models.DateTimeField()
    status = models.CharField(choices=TASK_STATUS, max_length=11)
    madeBy = models.ForeignKey(Profile, related_name='tasks', on_delete=models.CASCADE)
    taskList = models.ForeignKey(TaskList, related_name='tasks', on_delete=models.CASCADE)

    def __str__(self):
        return self.title
