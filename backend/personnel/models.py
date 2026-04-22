from django.db import models
from doctors.models import Doctor


class Staff(models.Model):
    """Base model for all personnel/staff members"""
    ROLE_CHOICES = [
        ('SECRETARY', 'Secretaria'),
        ('ADMINISTRATOR', 'Administrador'),
        ('RECEPTIONIST', 'Recepcionista'),
        ('NURSE', 'Enfermera'),
        ('LAB_TECHNICIAN', 'Técnico de Laboratorio'),
    ]

    first_name = models.CharField(max_length=100, verbose_name='Nombre')
    last_name = models.CharField(max_length=100, verbose_name='Apellido')
    email = models.EmailField(unique=True, verbose_name='Email')
    phone = models.CharField(max_length=20, verbose_name='Teléfono')
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, verbose_name='Rol')
    is_active = models.BooleanField(default=True, verbose_name='Activo')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Creado el')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Actualizado el')

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.get_role_display()}"

    class Meta:
        verbose_name = 'personal'
        verbose_name_plural = 'personal'


class Secretary(models.Model):
    """Secretary model linked to a doctor they assist"""
    staff_member = models.OneToOneField(
        Staff, 
        on_delete=models.CASCADE, 
        related_name='secretary_profile',
        verbose_name='Personal Asignado'
    )
    assigned_doctor = models.ForeignKey(
        Doctor,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='secretaries',
        verbose_name='Doctor Asignado'
    )
    
    # Secretary-specific fields
    assistant_level = models.CharField(
        max_length=20,
        choices=[
            ('JUNIOR', 'Junior'),
            ('SENIOR', 'Senior'),
            ('HEAD', 'Jefe de Recepción'),
        ],
        default='JUNIOR',
        verbose_name='Nivel'
    )
    
    can_schedule_appointments = models.BooleanField(default=True, verbose_name='Puede programar citas')
    can_take_notes = models.BooleanField(default=True, verbose_name='Puede tomar notas')
    can_view_medical_records = models.BooleanField(default=False, verbose_name='Puede ver historias médicas')
    can_prescribe_medications = models.BooleanField(default=False, verbose_name='Puede prescribir medicamentos')

    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Creado el')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Actualizado el')

    def __str__(self):
        return f"Secretaria: {self.staff_member.first_name} {self.staff_member.last_name}"

    class Meta:
        verbose_name = 'secretaria'
        verbose_name_plural = 'secretarias'
