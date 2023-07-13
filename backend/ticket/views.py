from django.shortcuts import render
from rest_framework import generics, status, permissions, authentication, views, pagination
from rest_framework.response import Response
from .models import Category, Priority, Ticket
from .serializers import BasicCategorySerializer, BasicPrioritySerializer, BasicTicketSerializer, \
    TicketCreateSerializer, BasicMediaSerializer
from django.utils.translation import gettext_lazy as _
from drf_spectacular.utils import extend_schema
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser


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
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    @extend_schema(tags=["Ticket"])
    def get(self, request):
        user = request.user
        try:
            queryset = Ticket.objects.prefetch_related().filter(level=0)
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
        request.data._mutable = True
        data = request.data
        files = request.FILES.get("attachment")
        user = request.user
        data["user"] = user.id
        request.data._mutable = False
        serializer = TicketCreateSerializer(data=data, context={"request": request}, many=False)
        if serializer.is_valid():
            instance = serializer.save()
            prep_data = {
                "ticket": instance.id,
                "image": files
            }
            attachment_data = None
            media_serializer = BasicMediaSerializer(data=prep_data, context={"request": request}, many=False)
            if media_serializer.is_valid():
                media_serializer.save()
            else:
                print(media_serializer.errors)

            serializer_data = self.serializer_class(
                instance,
                many=False,
                read_only=True,
                context={"request": request}
            ).data
            response = {
                "success": True,
                "results": serializer_data,
            }
            return Response(response, status=status.HTTP_201_CREATED)
        else:
            response = {"error": serializer.errors, "success": False}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


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
