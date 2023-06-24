from django.contrib import admin
from .models import Ticket, Category, Media, Priority
from mptt.admin import MPTTModelAdmin
from django.contrib.auth.models import Permission,ContentType

admin.site.register(Permission)
admin.site.register(ContentType)
# Register your models here.

class TicketAdmin(admin.ModelAdmin):
    list_display = ['user', 'title', 'category', 'status', 'priority', 'create_at']
    list_filter = ['create_at', 'category', 'status', 'priority']


admin.site.register(Ticket, TicketAdmin)
admin.site.register(Category, MPTTModelAdmin)
admin.site.register(Media)
admin.site.register(Priority)
