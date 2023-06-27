from django.shortcuts import render
from rest_framework import views, status, permissions
from rest_framework.response import Response
from .serializers import BasicUserSerializer


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
