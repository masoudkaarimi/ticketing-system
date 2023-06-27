from rest_framework import serializers
from .models import Category, Priority, Ticket


class RecursiveCategoryField(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class BasicCategorySerializer(serializers.ModelSerializer):
    children = RecursiveCategoryField(many=True, read_only=False)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'level', 'children']


class BasicPrioritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Priority
        fields = "__all__"


class RecursiveTicketField(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class BasicTicketSerializer(serializers.ModelSerializer):
    category = BasicCategorySerializer()
    priority = BasicPrioritySerializer()
    children = RecursiveCategoryField(many=True, read_only=False)

    class Meta:
        model = Ticket
        fields = ['category',
                  'user',
                  'status',
                  'title',
                  'message',
                  'priority',
                  'parent',
                  'children',
                  'is_active',
                  'create_at',
                  'update_at', ]
