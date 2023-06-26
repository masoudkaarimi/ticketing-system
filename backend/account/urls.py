from django.urls import path
from .views import UserVerify

app_name = "accountApi"

urlpatterns = [
    path("verify/", UserVerify.as_view(), name="userVerify")
]
