from ticket.models import Category, Priority, Ticket, Media
from rest_framework import serializers
from django.contrib.auth.models import User


class RecursiveCategoryField(serializers.Serializer):

    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class CategorySerializer(serializers.ModelSerializer):
    children = RecursiveCategoryField(many=True, read_only=False)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'level', 'children']


class PrioritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Priority
        fields = "__all__"


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = "__all__"


class RecursiveTicketField(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ["password"]


class TicketSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    priority = PrioritySerializer()
    children = RecursiveTicketField(many=True, read_only=False)
    user = UserSerializer(read_only=True)
    attachment = serializers.SerializerMethodField()

    class Meta:
        model = Ticket
        fields = [
            'id',
            'category',
            'user',
            'status',
            'title',
            'message',
            'priority',
            'parent',
            'children',
            'is_active',
            'attachment',
            'create_at',
            'update_at',
        ]

    def get_attachment(self, obj):
        query = Media.objects.filter(ticket_id=obj.id, is_active=True)
        return MediaSerializer(query, read_only=True, many=False, context=self.context).data
