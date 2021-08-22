from django.contrib.auth.models import User, Group
from rest_framework import viewsets, status
from rest_framework import permissions
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import UserSerializer, GroupSerializer, ReceiptSerializer, UserListSerializer
from .services.receipt import ReceiptService
from datetime import datetime
import json


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserList(APIView):
    serializer_class = UserListSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            data = request.data
            if not data['username'] or not data['password']:
                return Response({'error': 'Missing parameters'}, status=status.HTTP_400_BAD_REQUEST)
            data = {
                'username': data['username'],
                'password': data['password'],
                'email': 'example@example.com'
            }
            serializer = UserListSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({'success': True}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({'error': 'Something happened'}, status=status.HTTP_501_NOT_IMPLEMENTED)


class ReceiptViewSet(APIView):
    authentication_classes = [JWTAuthentication]  # Only valid token allowed
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [FileUploadParser]

    def post(self, request):
        try:
            file = request.data['file']
            if not file:
                return Response({'error': 'Missing file'}, status=status.HTTP_400_BAD_REQUEST)
            if 'text/plain' not in file.content_type:
                return Response({'error': 'Content type is not allowed'}, status=status.HTTP_400_BAD_REQUEST)

            receipt_service = ReceiptService()  # Receipt service for algorithms
            file_content = json.loads(file.read().decode("utf-8").replace('\'', '\"'))
            asd = file.read().decode("utf-8")

            lines = file_content['file'].split('\n')  # read lines
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
