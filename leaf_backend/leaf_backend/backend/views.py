from django.contrib.auth.models import User, Group
from rest_framework import viewsets, status
from rest_framework import permissions
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import UserSerializer, GroupSerializer, ReceiptSerializer
from .services.receipt import ReceiptService
from datetime import datetime


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class ReceiptViewSet(APIView):
    authentication_classes = [JWTAuthentication]  # Only valid token allowed
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [FileUploadParser]

    def post(self, request):
        try:
            receipt_service = ReceiptService()
            file = request.FILES['file']
            lines = [line.decode().replace('\r', '') for line in file][4:-2]  # read lines
            blocks = receipt_service.get_blocks(lines)
            data = {
                'name': file.name,
                'date_time': datetime.now(),
                'blocks': blocks
            }
            serializer = ReceiptSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({'blocks': blocks}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(serializer.errors, status=status.HTTP_501_NOT_IMPLEMENTED)
