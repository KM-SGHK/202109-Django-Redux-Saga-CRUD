from django.urls import path
from django.conf.urls import url
from apiSubApp import views 

urlpatterns = [
    path('', views.welcomeMsg, name='welcome'),
    url(r'^tasks$', views.task_list, name='task'),
    url(r'^tasks/(?P<pk>[0-9]+)$', views.tasks_processing)
]

#For funcational based views, url must be used! 