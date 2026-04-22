from rest_framework import serializers
from .models import MedicalRecord


class MedicalRecordSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.first_name', read_only=True)
    doctor_name = serializers.CharField(source='doctor.first_name', read_only=True)

    class Meta:
        model = MedicalRecord
        fields = '__all__'
        extra_kwargs = {
            'patient': {'write_only': True},
            'doctor': {'write_only': True},
            'appointment': {'write_only': True},
        }
