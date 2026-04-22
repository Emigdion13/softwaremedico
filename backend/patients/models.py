from django.db import models


class Patient(models.Model):
    """Modelo de información del paciente"""
    GENDER_CHOICES = [
        ('M', 'Masculino'),
        ('F', 'Femenino'),
        ('O', 'Otros'),
    ]

    first_name = models.CharField(max_length=100, verbose_name='Nombre')
    last_name = models.CharField(max_length=100, verbose_name='Apellido')
    email = models.EmailField(unique=True, verbose_name='Email')
    phone = models.CharField(max_length=20, verbose_name='Teléfono')
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, verbose_name='Género')
    date_of_birth = models.DateField(verbose_name='Fecha de Nacimiento')
    address = models.TextField(blank=True, verbose_name='Dirección')
    medical_history = models.TextField(blank=True, verbose_name='Historial Médico')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Creado el')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Actualizado el')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        verbose_name = 'paciente'
        verbose_name_plural = 'pacientes'
