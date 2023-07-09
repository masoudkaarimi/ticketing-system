from django.urls import path
from .views import TicketModelViewSet, CategoryModelViewSet, PriorityModelViewSet, MediaModelViewSet
from rest_framework.routers import SimpleRouter

app_name = "cmsApi"

router = SimpleRouter()
router.register(r"tickets", TicketModelViewSet)
router.register(r"categories", CategoryModelViewSet)
router.register(r"priorities", PriorityModelViewSet)
router.register(r"medias", MediaModelViewSet)
urlpatterns = router.urls
