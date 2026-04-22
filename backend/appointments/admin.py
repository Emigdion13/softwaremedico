from django.contrib import admin
from .models import Appointment


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('patient', 'doctor', 'appointment_date', 'status', 'reason')
    search_fields = ('patient__first_name', 'doctor__first_name', 'reason')
    list_filter = ('status', 'appointment_date')
    date_hierarchy = 'appointment_date'
