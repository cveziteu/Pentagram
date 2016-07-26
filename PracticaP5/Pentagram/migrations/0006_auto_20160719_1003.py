# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Pentagram', '0005_like'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='like',
            name='liked',
        ),
        migrations.RemoveField(
            model_name='photo',
            name='counter_like',
        ),
    ]
