# Generated by Django 3.2.7 on 2021-09-27 09:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apiSubApp', '0003_rename_tasks_task'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='instructor',
            name='belongs_to',
        ),
    ]
