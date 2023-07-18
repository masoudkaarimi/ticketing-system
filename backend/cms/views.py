from django.shortcuts import render
from ticket.models import Category, Priority, Ticket, Media
from .serializers import TicketSerializer, CategorySerializer, MediaSerializer, PrioritySerializer
from rest_framework import status, viewsets, permissions, views
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiExample


# Create your views here.
@extend_schema(tags=["CMS - Ticket"])
class TicketModelViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAdminUser]
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer


@extend_schema(tags=["CMS - Ticket"])
class TicketActionView(views.APIView):
    permission_classes = [permissions.IsAdminUser]

    def patch(self, request, pk=None):
        type = request.data.get("type")
        value = request.data.get("value")
        if not type and not value:
            return Response({"error": "type and value is required"}, status=status.HTTP_400_BAD_REQUEST)

        queryset = Ticket.objects.filter(pk=pk)
        if not queryset.exists():
            return Response(
                {"error": "could not find any ticket with given parameters"},
                status=status.HTTP_404_NOT_FOUND
                )

        queryset = queryset.first()
        if type == "status":
            queryset.status = value
        elif type == "priority":
            priority_obj = Priority.objects.get(pk=int(value))
            queryset.priority = priority_obj
        else:
            return Response(
                {"error": "type must be either status or priority "},
                status=status.HTTP_400_BAD_REQUEST
            )
        queryset.save()
        serializer = TicketSerializer(queryset, many=False, context={"request": request})
        return Response({"results": serializer.data}, status=status.HTTP_200_OK)



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
