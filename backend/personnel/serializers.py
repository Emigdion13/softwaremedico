from rest_framework import serializers
from .models import Staff, Secretary


class StaffSerializer(serializers.ModelSerializer):
    """Serializer for the Staff model"""
    class Meta:
        model = Staff
        fields = '__all__'


class SecretarySerializer(serializers.ModelSerializer):
    """Serializer for the Secretary model"""
    staff_member = StaffSerializer(read_only=True)
    
    class Meta:
        model = Secretary
        fields = '__all__'
