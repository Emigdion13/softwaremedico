from django.db import models
from patients.models import Patient
from doctors.models import Doctor
from personnel.models import Staff


class Appointment(models.Model):
    """Modelo de programación de citas"""
    STATUS_CHOICES = [
        ('SCHEDULED', 'Programado'),
        ('CONFIRMED', 'Confirmado'),
        ('COMPLETED', 'Completado'),
        ('CANCELLED', 'Cancelado'),
        ('NO_SHOW', 'No Asistió'),
    ]

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='appointments', verbose_name='Paciente')
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='appointments', verbose_name='Doctor')
    # New field: secretary who assisted with scheduling
    assisting_secretary = models.ForeignKey(
        Staff,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='scheduled_appointments',
        verbose_name='Secretaria Asistente'
    )
    
    appointment_date = models.DateTimeField(verbose_name='Fecha de la cita')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='SCHEDULED', verbose_name='Estado')
    reason = models.TextField(blank=True, verbose_name='Motivo')
    notes = models.TextField(blank=True, verbose_name='Notas')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Creado el')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Actualizado el')

    def __str__(self):
        return f"Cita con {self.doctor} el {self.appointment_date}"

    class Meta:
        verbose_name = 'cita'
        verbose_name_plural = 'citas'
