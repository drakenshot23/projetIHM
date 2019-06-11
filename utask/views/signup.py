from django.contrib.auth import authenticate, login, get_user_model
from django.contrib.auth.base_user import BaseUserManager
from django.shortcuts import redirect, render
from django.views import View
from utask.forms.registration import UserCreationForm
from utask.models import Profile, CodePromo
from django.contrib.auth.models import User


class SignupView(View):
    form_class = UserCreationForm
    template_name = 'registration/login.html'

    def post(self, request, *args, **kwargs):
        form = UserCreationForm(data=request.POST)
        print(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('email')
            raw_password = form.cleaned_data.get('password')
            code_promo = form.cleaned_data.get('codePromo') if 'codePromo' in form.cleaned_data else ''
            if User.objects.filter(username=username).exists():
                response = {
                    "already_exist": True
                }
                return render(request, self.template_name, context=response)
            if code_promo == '':
                response = {
                    "invalid_code_promo": True
                }
                return render(request, self.template_name, context=response)
            else:
                try:
                    code_promo = CodePromo.objects.get(code=code_promo)
                except CodePromo.DoesNotExist:
                    response = {
                        "invalid_code_promo": True
                    }
                    return render(request, self.template_name, context=response)
            user = User.objects.create_user(username=username, email=username, password=raw_password)
            user.set_password(raw_password=raw_password)
            user.save()
            print(user.password)
            Profile.objects.create(user=user, codePromo=code_promo, skills=code_promo.matieres)
            user = authenticate(request, username=username, password=raw_password)
            if user is not None:
                login(request, user)
                return redirect('home')
            else:
                return redirect('login')
        else:
            response = {
                "signup_error": True
            }
            return render(request, self.template_name, context=response)
