from django import forms


class RegistrationForm(forms.Form):
    email = forms.EmailField(required=True)
    password = forms.PasswordInput()
    codePromo = forms.CharField(required=True, max_length=10)
