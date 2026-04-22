from django.contrib import admin
from .models import MedicalRecord


@admin.register(MedicalRecord)
class MedicalRecordAdmin(admin.ModelAdmin):
    list_display = ('patient', 'doctor', 'appointment', 'created_at')
    search_fields = ('patient__first_name', 'doctor__first_name', 'diagnosis', 'treatment')
    list_filter = ('created_at',)
