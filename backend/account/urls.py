from django.urls import path
from .views import UserVerify, UserRegister

app_name = "accountApi"

urlpatterns = [
    path("verify/", UserVerify.as_view(), name="userVerify"),
    path("register/", UserRegister.as_view(), name="userRegister"),
]
