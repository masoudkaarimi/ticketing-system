# Generated by Django 4.2.2 on 2023-07-18 20:17

from django.db import migrations, models
import ticket.models


class Migration(migrations.Migration):

    dependencies = [
        ('ticket', '0004_priority_color'),
    ]

    operations = [
        migrations.AlterField(
            model_name='media',
            name='image',
            field=models.ImageField(upload_to=ticket.models.media_dynamic),
        ),
    ]
