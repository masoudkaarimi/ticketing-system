"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/tickets/', include('ticket.urls',namespace="ticketApi")),
    path('api/account/', include('account.urls',namespace="accountApi")),
    path('api/cms/', include('cms.urls',namespace="cmsApi")),
    path('api-auth/', include('rest_framework.urls',)),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    re_path(r'^auth/', include('drf_social_oauth2.urls', namespace='drf')),
    # Optional UI:
    path('api/schema/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    # re_path(r'^rosetta/', include('rosetta.urls')),
    # path('api/schema/docs/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT
)
