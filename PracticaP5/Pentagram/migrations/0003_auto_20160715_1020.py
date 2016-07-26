# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import Pentagram.models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('Pentagram', '0002_comments'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comments',
            name='photo_id',
            field=models.ForeignKey(to='Pentagram.Photo'),
        ),
        migrations.AlterField(
            model_name='comments',
            name='user_id',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='photo',
            name='photo',
            field=models.ImageField(upload_to=Pentagram.models.photos_directory, null=True),
        ),
    ]
