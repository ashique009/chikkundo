from django.contrib import admin

# Register your models here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User,Interest,ConnectRequest

admin.site.register(User, UserAdmin)
admin.site.register(Interest)
admin.site.register(ConnectRequest)