from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import JSONField
from django.db import models

User = get_user_model()


class CodePromo(models.Model):
    code = models.CharField(max_length=10)
    matieres = JSONField()

    def __str__(self):
        return self.code


class Profile(models.Model):
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    skills = JSONField()
    image = models.FileField(upload_to='profile/')
    codePromo = models.ForeignKey(CodePromo, related_name='profiles', on_delete=models.CASCADE)
