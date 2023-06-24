# Generated by Django 4.2 on 2023-06-23 16:37

from django.db import migrations
import django.db.models.deletion
import mptt.fields


class Migration(migrations.Migration):

    dependencies = [
        ('ticket', '0002_alter_ticket_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='parent',
            field=mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='ticket.category', verbose_name='Parent'),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='parent',
            field=mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='ticket.ticket', verbose_name='Parent'),
        ),
    ]