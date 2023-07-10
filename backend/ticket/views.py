from django.shortcuts import render
from rest_framework import generics, status, permissions, authentication, views, pagination
from rest_framework.response import Response
from .models import Category, Priority, Ticket
from .serializers import BasicCategorySerializer, BasicPrioritySerializer, BasicTicketSerializer
from django.utils.translation import gettext_lazy as _
from drf_spectacular.utils import extend_schema


# Create your views here.
class TicketRetrieveView(generics.RetrieveAPIView):
    permissions = [permissions.AllowAny]
    serializer_class = BasicTicketSerializer

    @extend_schema(tags=["Ticket"])
    def get(self, request, pk=None):
        user = request.user
        try:
            queryset = Ticket.objects.filter(pk=pk)
            if queryset.exists:
                serializer = self.serializer_class(queryset.first(), context={"request": request})
                response = {
                    "success": True,
                    "results": serializer.data
                }
                return Response(response, status=status.HTTP_200_OK)
            else:
                response = {
                    "success": False,
                    "results": "could not find this ticket"
                }
                return Response(response, status.HTTP_404_NOT_FOUND)
        except:
            return Response(
                {"error": "something whent wrong when trying retrieve ticket"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class TicketView(views.APIView):
    permissions = [permissions.AllowAny]
    pagination_class = pagination.PageNumberPagination
    serializer_class = BasicTicketSerializer

    @extend_schema(tags=["Ticket"])
    def get(self, request):
        user = request.user
        try:
            queryset = Ticket.objects.filter(level=0)
            if queryset.exists():
                paginator = self.pagination_class()
                paginator.page_size = 25
                paginator_queryset = paginator.paginate_queryset(queryset=queryset, request=request)
                serializer = self.serializer_class(paginator_queryset, many=True, context={"request": request})
                response = {
                    "count": paginator.page.paginator.count,
                    "next": paginator.get_next_link(),
                    "previous": paginator.get_previous_link(),
                    "success": True,
                    "results": serializer.data,
                }
                return Response(response, status=status.HTTP_200_OK)
            else:
                response = {
                    "success": False,
                    "error": _("could not find any ticket"),
                }
                return Response(response, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(
                {"error": _("something went wrong when trying get ticket list")},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @extend_schema(tags=["Ticket"])
    def post(self, request, **kwargs):
        data = request.data
        try:
            user = request.data
            data["user"] = user
            serializer = self.serializer_class(data=data, context={"request": request}, many=False)
            if serializer.is_valid():
                serializer.save()
                response = {
                    "success": True,
                    "results": serializer.data,
                }
                return Response(response, status=status.HTTP_201_CREATED)
            else:
                response = {"error": serializer.errors, "success": False, "test": _("hello mamad")}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(
                {"error": _("something went wrong when trying create new ticket")},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@extend_schema(tags=["Ticket"])
class CategoryList(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Category.objects.filter(level=0)
    serializer_class = BasicCategorySerializer


@extend_schema(tags=["Ticket"])
class PriorityList(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Priority.objects.all()
    serializer_class = BasicPrioritySerializer
