from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """Custom user model with additional fields for medical software"""
    
    ROLE_CHOICES = [
        ('DOCTOR', 'Doctor'),
        ('SECRETARY', 'Secretaria'),
        ('ADMINISTRATOR', 'Administrador'),
        ('RECEPTIONIST', 'Recepcionista'),
        ('NURSE', 'Enfermera'),
        ('LAB_TECHNICIAN', 'Técnico de Laboratorio'),
    ]
    
    role = models.CharField(
        max_length=50,
        choices=ROLE_CHOICES,
        default='RECEPTIONIST',
        verbose_name='Rol'
    )
    phone = models.CharField(
        max_length=20,
        blank=True,
        verbose_name='Teléfono'
    )
    is_active = models.BooleanField(default=True, verbose_name='Activo')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Creado el')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Actualizado el')

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.get_role_display()}"

    class Meta:
        verbose_name = 'usuario'
        verbose_name_plural = 'usuarios'
