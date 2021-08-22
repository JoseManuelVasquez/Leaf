from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Block, Receipt


class UserSerializer(serializers.HyperlinkedModelSerializer):
    receipts = serializers.PrimaryKeyRelatedField(many=True, queryset=Receipt.objects.all())

    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups', 'receipts']


class UserListSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=100)
    password = serializers.CharField(max_length=100)

    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.save()

        return user


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class BlockSerializer(serializers.ModelSerializer):
    begin_row = serializers.IntegerField()
    begin_col = serializers.IntegerField()
    end_row = serializers.IntegerField()
    end_col = serializers.IntegerField()

    def create(self, validated_data):
        return Block.objects.create(**validated_data)

    class Meta:
        model = Block
        fields = ['begin_row', 'begin_col', 'end_row', 'end_col']


class ReceiptSerializer(serializers.HyperlinkedModelSerializer):
    date_time = serializers.DateTimeField()
    blocks = BlockSerializer(many=True)

    def create(self, validated_data):
        blocks_data = validated_data.pop('blocks')
        receipt = Receipt.objects.create(**validated_data)
        for block_data in blocks_data:
            Block.objects.create(receipt=receipt, **block_data)
        return receipt

    class Meta:
        model = Receipt
        fields = ['date_time', 'blocks']
