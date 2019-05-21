from django import forms


class UserCreationForm(forms.Form):
    email = forms.EmailField(required=True)
    password = forms.PasswordInput()
    codePromo = forms.CharField(required=False, max_length=10)
