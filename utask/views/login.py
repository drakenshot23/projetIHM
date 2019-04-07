from django.contrib.auth.views import LoginView


class MyLoginView(LoginView):
    redirect_authenticated_user = True
    template_name = 'registration/login.html'

    def get(self, request, *args, **kwargs):
        print('salut')

