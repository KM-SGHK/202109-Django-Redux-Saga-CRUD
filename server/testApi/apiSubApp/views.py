from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from apiSubApp.models import Task
from apiSubApp.serializers import TaskSerializer
from rest_framework.decorators import api_view

# Create your views here.
def welcomeMsg(request):
    print('testing in views.py')
    return HttpResponse('Hello World!')

@api_view(['GET', 'POST'])
def task_list(request):
    if request.method == 'GET':
        print("gettting API!")

        tasks = Task.objects.all()

        task_serializer = TaskSerializer(tasks, many=True)
        return JsonResponse(task_serializer.data, safe=False)
            # 'safe=False' for objects serialization

    elif request.method == 'POST':
        print('API got for post case!')
        print('testing request', request)
        tasks_data = JSONParser().parse(request)
        print('testing posts_data', tasks_data)
        tasks_serializer = TaskSerializer(data=tasks_data)
        if tasks_serializer.is_valid():
            tasks_serializer.save()
            print('testing tasks_serializer, ', tasks_serializer.data)
            return JsonResponse(tasks_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(tasks_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def tasks_processing(request, pk):
    try:
        task = Task.objects.get(pk=pk)
    except Task.DoesNotExist:
        return JsonResponse({'message': 'The task does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        countries_serializer = TaskSerializer(task)
        return JsonResponse(countries_serializer.data)

    elif request.method == 'PUT':
        task_data = JSONParser().parse(request)
        task_serializer = TaskSerializer(task, data=task_data)
        if task_serializer.is_valid():
            task_serializer.save()
            print("testing serialized data at PUT case, ", task_serializer.data)
            return JsonResponse(task_serializer.data)
        return JsonResponse(task_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        task.delete()
        return JsonResponse({'message': 'Task was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)