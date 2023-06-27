from django.shortcuts import render
from rest_framework import views, status, permissions
from rest_framework.response import Response
from .serializers import BasicUserSerializer
from django.contrib.auth.models import User
from django.db.models import Q


# Create your views here.


class UserVerify(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = BasicUserSerializer(user, many=False, context={"request": request})
        response = {
            "success": True,
            "results": serializer.data
        }
        return Response(response, status=status.HTTP_200_OK)


class UserRegister(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        data = request.data
        first_name = data.get("first_name", "")
        last_name = data.get("last_name", "")
        email = data.get("email", "")
        username = data.get("username")
        password = data.get("password")
        confirm_password = data.get("confirm_password")
        try:
            if username and password and confirm_password:
                if password == confirm_password:
                    query = Q(username=username) | Q(email=email)
                    if not User.objects.filter(query).exists():
                        user = User.objects.create_user(
                            username=username,
                            password=password,
                            first_name=first_name,
                            last_name=last_name,
                            email=email
                        )
                        if user:
                            response = {
                                "success": True,
                            }
                            return Response(response, status=status.HTTP_201_CREATED)
                        else:
                            return Response(
                                {"error": "could not create user"},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR
                            )
                    else:
                        return Response({"error": "use already exists"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({"error": "password do not match"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(
                    {"error": "username , password , confirm password required"},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except:
            return Response(
                {"error": "something went wrong when trying register user"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
