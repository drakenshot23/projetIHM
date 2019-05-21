from django.shortcuts import render, redirect
from django.views.generic import TemplateView


class BoardView(TemplateView):
    template_name = 'board.html'

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return render(request, self.template_name)
        else:
            return redirect('/accounts/login/')
