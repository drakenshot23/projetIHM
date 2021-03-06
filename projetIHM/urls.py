"""projetIHM URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/dev/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include

from utask.views.board import BoardView, create_project, delete_all_project, BoardAPIViewSet
from utask.views.profil import updateProfil

from utask.views.home import HomeView, update_user
from utask.views.signup import SignupView, LoginView, logout_view

from rest_framework.routers import DefaultRouter

router = DefaultRouter()


router.register(r'boardAPI', BoardAPIViewSet, base_name='boardAPI')


urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^login/', LoginView.as_view(), name='login'),
    url(r'logout/', logout_view, name='logout'),
    path('', HomeView.as_view(), name='home'),
    path('signup/', SignupView.as_view(), name='signup'),
    url(r'board/(?P<project_id>\d+)/$', BoardView.as_view(), name='board'),
    path('save-profil/', updateProfil, name='save-profil'),
    path('delete_all_project/', delete_all_project, name='delete_all-project'),
    path('ajax_create_project/', create_project, name='create_project'),
    path('ajax_update_user/', update_user, name='update_user'),
]
