from django.db import models
from patients.models import Patient
from doctors.models import Doctor
from appointments.models import Appointment


class MedicalRecord(models.Model):
    """Modelo de historias médicas"""
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='medical_records', verbose_name='Paciente')
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='medical_records', verbose_name='Doctor')
    appointment = models.OneToOneField(Appointment, on_delete=models.SET_NULL, null=True, blank=True, verbose_name='Cita')
    diagnosis = models.TextField(verbose_name='Diagnóstico')
    treatment = models.TextField(verbose_name='Tratamiento')
    medications = models.TextField(blank=True, verbose_name='Medicamentos')
    follow_up_date = models.DateField(null=True, blank=True, verbose_name='Fecha de Seguimiento')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Creado el')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Actualizado el')

    def __str__(self):
        return f"Historia Médica de {self.patient} - {self.diagnosis}"

    class Meta:
        verbose_name = 'historia médica'
        verbose_name_plural = 'historias médicas'
