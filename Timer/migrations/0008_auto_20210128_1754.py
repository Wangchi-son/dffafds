# Generated by Django 3.1.5 on 2021-01-28 08:54

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Timer', '0007_auto_20210128_1751'),
    ]

    operations = [
        migrations.AlterField(
            model_name='goal',
            name='endDate',
            field=models.DateField(default=datetime.date(2021, 1, 28)),
        ),
        migrations.AlterField(
            model_name='goal',
            name='startDate',
            field=models.DateField(default=datetime.date(2021, 1, 28)),
        ),
    ]