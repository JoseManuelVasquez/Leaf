from django.urls import path
from . import views

urlpatterns = [
    path('receipt', views.ReceiptViewSet.as_view(), name='receipt'),
]