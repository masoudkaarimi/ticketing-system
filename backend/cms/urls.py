from django.urls import path
from .views import TicketModelViewSet, CategoryModelViewSet, PriorityModelViewSet, MediaModelViewSet, TicketActionView
from rest_framework.routers import SimpleRouter

app_name = "cmsApi"

router = SimpleRouter()
router.register(r"tickets", TicketModelViewSet)
router.register(r"categories", CategoryModelViewSet)
router.register(r"priorities", PriorityModelViewSet)
router.register(r"medias", MediaModelViewSet)
urlpatterns = router.urls + [
    path("tickets/action/<int:pk>/", TicketActionView.as_view(), name="TicketActionView"),
]
