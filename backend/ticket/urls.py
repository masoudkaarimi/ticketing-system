from django.urls import path
from .views import CategoryList, PriorityList, TicketView, TicketRetrieveView

appname = "ticket"

urlpatterns = [
    path("category/", CategoryList.as_view(), name="categoryList"),
    path("priority/", PriorityList.as_view(), name="priorityList"),
    path("", TicketView.as_view(), name="ticketView"),
    path("<int:pk>/", TicketRetrieveView.as_view(), name="ticketRetrieveView")
]
