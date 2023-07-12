from django.db import models
from django.utils.translation import gettext_lazy as _
from mptt.models import MPTTModel
from mptt.fields import TreeForeignKey
from django.contrib.auth.models import User
from datetime import datetime
# Create your models here.


TICKET_STATUS = (
    ("PENDING", "PENDING"),
    ("ANSWERED", "ANSWERED"),
    ("CLOSED", "CLOSED")
)


class Category(MPTTModel):
    name = models.CharField(
        max_length=255, verbose_name=_("Name"), null=False, blank=False, unique=True,
        help_text=_("format:max-255,required , unique")
    )

    slug = models.SlugField(
        allow_unicode=True, blank=True, null=True,
        help_text=_("format:safe url , underscore , hyphen , dash  allowed")
    )
    parent = TreeForeignKey(
        'self', verbose_name=_("Parent"), related_name="children", on_delete=models.CASCADE,
        null=True, blank=True
    )
    is_active = models.BooleanField(default=True, verbose_name=_("Visibility"), help_text=_("format:true=visible"))
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    class MPTTMeta:
        order_insertion_by = ['-create_at']

    def __str__(self):
        return self.name


class Priority(models.Model):
    name = models.CharField(
        max_length=255, verbose_name=_("Name"), null=False, blank=False, unique=True,
        help_text=_("format:max-255,required , unique")
    )
    index = models.SmallIntegerField(default=0, verbose_name=_("Index"))
    color = models.CharField(
        max_length=50,
        verbose_name=_("Color"),
        null=False,
        blank=False,
        default="#fdfdfd",
        help_text=_(
            "format: max-20, rgba,hex ,mui color palette like primary, secondary and can use main,light and dark"
        )
    )

    class Meta:
        ordering = ['-index']

    def __str__(self):
        return self.name


class Ticket(MPTTModel):
    category = models.ForeignKey(
        Category, related_name="ticket_category", on_delete=models.SET_NULL,
        verbose_name=_("Category"), blank=True,
        null=True
    )
    user = models.ForeignKey(
        User, related_name="ticket_user", verbose_name=_("Author"), on_delete=models.CASCADE,
        blank=False, null=False
    )
    status = models.CharField(
        max_length=15, choices=TICKET_STATUS, default="PENDING", verbose_name=_("Status"),
        blank=True, null=True
    )
    title = models.CharField(
        max_length=255, verbose_name=_("Title"), null=False, blank=False, unique=False,
        help_text=_("format:max-255,required")
    )
    message = models.TextField(max_length=3000, verbose_name=_("Message"), blank=True, null=True)
    priority = models.ForeignKey(
        Priority, related_name="ticket_priority", verbose_name=_("Priority"), blank=False,
        null=False, on_delete=models.PROTECT
    )
    parent = TreeForeignKey(
        'self', verbose_name=_("Parent"), related_name="children", null=True, blank=True,
        on_delete=models.CASCADE
    )
    is_active = models.BooleanField(default=True, verbose_name=_("Visibility"), help_text=_("format:true=visible"))
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-create_at']

    def __str__(self):
        return str(self.id)


def media_dynamic(instance, filename):
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    return f'ticket/images/{timestamp}-{filename}'


class Media(models.Model):
    ticket = models.ForeignKey(
        Ticket, related_name="media_ticket", verbose_name=_("Belongs To"), blank=True,
        null=True, on_delete=models.SET_NULL
    )
    image = models.ImageField(upload_to=media_dynamic)
    is_active = models.BooleanField(default=True, verbose_name=_("Visibility"), help_text=_("format:true=visible"))
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return f"{self.ticket}"
