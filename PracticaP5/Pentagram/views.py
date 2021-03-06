from django.conf import settings
from django.contrib.auth.views import logout
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from Pentagram.models import Photo, Comment, Like
from Pentagram.serializers import UserSerializer, PhotoSerializer, CommentSerializer, LikeSerializer
from django.core.exceptions import ObjectDoesNotExist

# Create your views here.
# Controllerul MVC
# @api_view(['POST', 'DELETE', 'PUT', 'GET']) # metoda apelata pentru post / delete / put / get


@api_view(['POST'])
@permission_classes((AllowAny,))
def users(request):
    if request.method == "POST":
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST, data=user_serializer.errors)


@api_view(['GET', 'POST'])
def photos(request):
    if request.method == 'GET':
        all_photos = Photo.objects.all()
        photo_serializer = PhotoSerializer(all_photos, many=True)
        return Response(status=status.HTTP_200_OK, data=photo_serializer.data)

    if request.method == 'POST':
        photo_serializer = PhotoSerializer(data=request.data)
        if photo_serializer.is_valid():
            photo_serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST, data=photo_serializer.errors)


@api_view(['GET', 'POST'])
def comments(request, id_photo):
    if request.method == 'GET':
        all_comments = Comment.objects.filter(photo_id=id_photo)
        comments_serializer = CommentSerializer(all_comments, many=True)
        return Response(status=status.HTTP_200_OK, data=comments_serializer.data)
    if request.method == 'POST':
        comments_serializer = CommentSerializer(data=request.data)
        if comments_serializer.is_valid():
            comments_serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST, data=comments_serializer.errors)

#
# @api_view(['PUT','GET'])
# def like(request, id_photo):
#     # if request.method == 'PUT':
#     #     photo = Photo.objects.get(pk=id_photo)
#     #     photo.counter_like += 1
#     #     photo.save()
#     #     return Response(status=status.HTTP_202_ACCEPTED)
#
#     if request.method == 'GET':
#         id_user = request.user.pk
#         all_likes = Like.objects.filter(photo=id_photo, user=id_user)
#         like_serializer = LikeSerializer(all_likes, many=True)
#         return Response(status=status.HTTP_200_OK, data=like_serializer.data)
#
#     if request.method == 'PUT':
#         id_user = request.user.id
#         photo = Photo.objects.get(pk=id_photo)
#         try:
#             liked_photo = Like.objects.get(photo=id_photo, user=id_user)
#             if liked_photo.liked == 0:
#                 liked_photo.liked += 1
#                 liked_photo.save()
#                 return Response(status=status.HTTP_202_ACCEPTED)
#             elif liked_photo.liked == 1:
#                 liked_photo.liked -= 1
#                 liked_photo.save()
#                 return Response(status=status.HTTP_202_ACCEPTED)
#         except ObjectDoesNotExist:
#             add_like = Like(user_id=id_user, photo_id=id_photo, liked='1')
#             add_like.save()
#             photo.counter_like += 1
#             photo.save()
#             return Response(status=status.HTTP_202_ACCEPTED)


@api_view(['POST','GET'])
def like(request, id_photo):

    if request.method == 'GET':
        id_user = request.user.pk
        all_likes = Like.objects.filter(photo=id_photo, user=id_user)
        like_serializer = LikeSerializer(all_likes, many=True)
        return Response(status=status.HTTP_200_OK, data=like_serializer.data)

    if request.method == 'POST':
        id_user = request.user.id
        # photo = Photo.objects.get(pk=id_photo)
        try:
            liked_photo = Like.objects.get(photo=id_photo, user=id_user)
            liked_photo.delete()
            return Response(status=status.HTTP_302_FOUND)
        except ObjectDoesNotExist:
            add_like = Like(user_id=id_user, photo_id=id_photo)
            add_like.save()
            return Response(status=status.HTTP_201_CREATED)

# all_likes = Like.objects.filter(photo=id_photo).count()
