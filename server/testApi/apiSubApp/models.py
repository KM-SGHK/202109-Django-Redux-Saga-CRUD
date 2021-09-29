from django.db import models

# Create your models here.

class Department(models.Model):
    department_name = models.CharField(max_length=100)

    def __str__(self):
        return self.department_name


class Instructor(models.Model):
    instructor_name = models.CharField(max_length=100)

    def __str__(self):
        return self.instructor_name


class Task(models.Model):
    task_title = models.CharField(max_length=500)
    task_body = models.CharField(max_length=2000)

    def __str__(self):
        return self.task_title