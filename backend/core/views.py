from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count
from .models import Category, MenuItem, Order, News, AnalyticsEvent
from .serializers import CategorySerializer, MenuItemSerializer, OrderSerializer, NewsSerializer, AnalyticsEventSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class MenuItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class NewsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer

class AnalyticsEventViewSet(viewsets.ModelViewSet):
    queryset = AnalyticsEvent.objects.all()
    serializer_class = AnalyticsEventSerializer

class PredictionViewSet(viewsets.ViewSet):
    def list(self, request):
        # Simple prediction based on most purchased/added-to-cart items
        popular_items = AnalyticsEvent.objects.filter(
            event_type__in=['ADD_TO_CART', 'PURCHASE']
        ).values('menu_item').annotate(
            event_count=Count('menu_item')
        ).order_by('-event_count')[:5]

        item_ids = [item['menu_item'] for item in popular_items if item['menu_item']]
        items = MenuItem.objects.filter(id__in=item_ids)

        # If not enough data, just return some items
        if items.count() < 3:
            items = MenuItem.objects.all()[:5]

        serializer = MenuItemSerializer(items, many=True)
        return Response(serializer.data)
