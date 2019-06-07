from django import template

register = template.Library()


@register.simple_tag(name="pourcent")
def pourcent(value):
    return value*10
