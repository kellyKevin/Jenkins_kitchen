from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.views import CategoryViewSet, MenuItemViewSet, OrderViewSet, NewsViewSet, AnalyticsEventViewSet, PredictionViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'menu-items', MenuItemViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'news', NewsViewSet)
router.register(r'analytics', AnalyticsEventViewSet)
router.register(r'predictions', PredictionViewSet, basename='prediction')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
