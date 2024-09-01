from django.db import models
from django.contrib.auth.models import User  # Importa o modelo de usuário padrão do Django

# Modelo das Task
class Task(models.Model):
    title = models.CharField(max_length=255) # Titulo do Job
    created_at = models.DateTimeField(auto_now_add=True) # Data de criação
    description = models.TextField() # Descricao do Job 
    image = models.ImageField(upload_to='job_images/', blank=True, null=True) # Imagem do Job
    due_date = models.DateField(blank=True, null=True) # Prazo de entrega
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='todos') # Usuario que criou o Job
    priority = models.CharField(max_length=255, default='Normal')  # Prioridade do Job 
    status = models.CharField(max_length=255, default='Todo')  # Status do Job

    def __str__(self):
        return self.title
