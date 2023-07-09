from rest_framework import serializers
from .models import Category, Priority, Ticket, Media
from account.serializers import SafeUserSerializer


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


class BasicMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ["image"]


class RecursiveTicketField(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class BasicTicketSerializer(serializers.ModelSerializer):
    category = BasicCategorySerializer()
    priority = BasicPrioritySerializer()
    children = RecursiveTicketField(many=True, read_only=False)
    user = SafeUserSerializer(read_only=True)
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
        return [BasicMediaSerializer(item, read_only=True, many=False, context=self.context).data.get("image") for item
                in query]
