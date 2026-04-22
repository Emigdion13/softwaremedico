from django.db import models


class Doctor(models.Model):
    """Modelo de información del doctor"""
    SPECIALIZATION_CHOICES = [
        ('GP', 'Medicina General'),
        ('CARDIOLOGY', 'Cardiología'),
        ('NEUROLOGY', 'Neurología'),
        ('PEDIATRICS', 'Pediatría'),
        ('DERMATOLOGY', 'Dermatología'),
        ('ORTHOPEDICS', 'Ortopedia'),
        ('OTHER', 'Otros'),
    ]

    first_name = models.CharField(max_length=100, verbose_name='Nombre')
    last_name = models.CharField(max_length=100, verbose_name='Apellido')
    email = models.EmailField(unique=True, verbose_name='Email')
    phone = models.CharField(max_length=20, verbose_name='Teléfono')
    specialization = models.CharField(max_length=50, choices=SPECIALIZATION_CHOICES, verbose_name='Especialización')
    license_number = models.CharField(max_length=100, unique=True, verbose_name='Número de Licencia')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Creado el')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Actualizado el')

    def __str__(self):
        return f"Dr. {self.first_name} {self.last_name}"

    class Meta:
        verbose_name = 'doctor'
        verbose_name_plural = 'doctores'
