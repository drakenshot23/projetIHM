from django.contrib.auth import authenticate, login, get_user_model
from django.shortcuts import redirect, render
from django.views import View
from utask.forms.registration import UserCreationForm

User = get_user_model()


class SignupView(View):
    form_class = UserCreationForm
    template_name = 'registration/login.html'

    def post(self, request, *args, **kwargs):
        form = UserCreationForm(data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('email')
            raw_password = form.cleaned_data.get('password')
            if User.objects.filter(username=username).exists():
                response = {
                    "already_exist": True
                }
                return render(request, self.template_name, context=response)
            user = User.objects.create(username=username, email=username)
            user.set_password(raw_password=raw_password)
            user.save()
            login(request, user)
            return redirect('home')
        else:
            response = {
                "signup_error": True
            }
            return render(request, self.template_name, context=response)