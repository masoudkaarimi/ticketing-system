from django.shortcuts import render
from ticket.models import Category, Priority, Ticket, Media
from .serializers import TicketSerializer, CategorySerializer, MediaSerializer, PrioritySerializer
from rest_framework import status, viewsets, permissions
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiExample


# Create your views here.
@extend_schema(tags=["CMS - Ticket"])
class TicketModelViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAdminUser]
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer


@extend_schema(tags=["CMS - Category"])
class CategoryModelViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAdminUser]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


@extend_schema(tags=["CMS - Priority"])
class PriorityModelViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAdminUser]
    queryset = Priority.objects.all()
    serializer_class = PrioritySerializer


@extend_schema(tags=["CMS - Media"])
class MediaModelViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAdminUser]
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
