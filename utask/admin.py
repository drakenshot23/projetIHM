from profile import Profile

from django.contrib import admin

# Register your models here.
from utask.models import *

admin.site.register(Profile)
admin.site.register(CodePromo)
admin.site.register(Color)
admin.site.register(TaskFile)
admin.site.register(TaskTag)
admin.site.register(Task)
admin.site.register(TaskList)
admin.site.register(Project)

admin.site.site_header = 'UTASK'
admin.site.site_title = 'UTASK'