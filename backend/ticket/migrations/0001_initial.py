# Generated by Django 4.2 on 2023-06-23 14:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import mptt.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='format:max-255,required , unique', max_length=255, unique=True, verbose_name='Name')),
                ('slug', models.SlugField(allow_unicode=True, blank=True, help_text='format:safe url , underscore , hyphen , dash  allowed', null=True)),
                ('is_active', models.BooleanField(default=True, help_text='format:true=visible', verbose_name='Visibility')),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('lft', models.PositiveIntegerField(editable=False)),
                ('rght', models.PositiveIntegerField(editable=False)),
                ('tree_id', models.PositiveIntegerField(db_index=True, editable=False)),
                ('level', models.PositiveIntegerField(editable=False)),
                ('parent', mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ticket.category', verbose_name='Parent')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Priority',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='format:max-255,required , unique', max_length=255, unique=True, verbose_name='Name')),
                ('index', models.SmallIntegerField(default=0, verbose_name='Index')),
            ],
            options={
                'ordering': ['-index'],
            },
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(blank=True, choices=[('PENDING', 'PENDING'), ('ANSWERED', 'ANSWERED'), ('CLOSED', 'CLOSED')], default='PENDING', max_length=15, null=True, verbose_name='Status')),
                ('title', models.CharField(help_text='format:max-255,required', max_length=255, unique=True, verbose_name='Title')),
                ('message', models.TextField(blank=True, max_length=3000, null=True, verbose_name='Message')),
                ('is_active', models.BooleanField(default=True, help_text='format:true=visible', verbose_name='Visibility')),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('lft', models.PositiveIntegerField(editable=False)),
                ('rght', models.PositiveIntegerField(editable=False)),
                ('tree_id', models.PositiveIntegerField(db_index=True, editable=False)),
                ('level', models.PositiveIntegerField(editable=False)),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ticket_category', to='ticket.category', verbose_name='Category')),
                ('parent', mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ticket.ticket', verbose_name='Parent')),
                ('priority', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='ticket_priority', to='ticket.priority', verbose_name='Priority')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ticket_user', to=settings.AUTH_USER_MODEL, verbose_name='Author')),
            ],
            options={
                'ordering': ['-create_at'],
            },
        ),
        migrations.CreateModel(
            name='Media',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='ticket/images/')),
                ('is_active', models.BooleanField(default=True, help_text='format:true=visible', verbose_name='Visibility')),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('ticket', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='media_ticket', to='ticket.ticket', verbose_name='Belongs To')),
            ],
            options={
                'ordering': ['-id'],
            },
        ),
    ]
