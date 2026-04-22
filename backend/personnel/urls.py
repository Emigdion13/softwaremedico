from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PersonnelViewSet

router = DefaultRouter()
router.register(r'personnel', PersonnelViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
