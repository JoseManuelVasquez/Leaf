from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
import json


class ReceiptTestCase(TestCase):

    def setUp(self):
        user = User(
            email='test',
            first_name='testing',
            last_name='testing',
            username='test'
        )
        user.set_password('passw0rd123')
        user.save()

        client = APIClient()
        response = client.post(
            '/token', {
                'username': 'test',
                'password': 'passw0rd123',
            },
            format='json'
        )

        result = json.loads(response.content)
        self.access = result['access']
        self.user = user
        self.file_path = "leaf_backend/backend/tests/receipt_sample.txt"

    def test_process_receipt_text(self):
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access)
        with open(self.file_path) as f:
            file = f.read()

        response = client.post(
            '/receipt', {
                'file': file
            },
            content_type='text/plain; charset=UTF-8',
            **{
                'HTTP_CONTENT_DISPOSITION': 'attachment; filename=file.txt',
            }
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        result = json.loads(response.content)
        self.assertIn('blocks', result)

    def test_process_receipt_binary(self):
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access)
        with open(self.file_path, 'rb') as f:
            file = f.read()

        response = client.post(
            '/receipt', {
                'file': file
            },
            format='multipart',
            **{
                'HTTP_CONTENT_DISPOSITION': 'attachment; filename=file.txt',
            }
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        result = json.loads(response.content)
        self.assertEqual(result['error'], 'Content type is not allowed')
