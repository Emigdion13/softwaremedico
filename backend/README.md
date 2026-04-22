# Backend del Software Médico

## Estructura del Proyecto

```
backend/
├── config/               # Archivos de configuración
│   ├── settings/__init__.py    # Configuraciones Django (base)
│   ├── urls/urls.py            # Enrutamiento URL
│   ├── wsgi.py                 # Aplicación WSGI
│   └── asgi.py                 # Aplicación ASGI
├── patients/             # App de pacientes
│   ├── models.py             # Modelo de paciente
│   ├── views.py              # Vistas API
│   ├── serializers.py        # Serializadores
│   ├── urls.py               # Rutas URL
│   └── admin.py              # Configuración del admin
├── doctors/              # App de doctores (estructura similar)
├── appointments/         # App de citas (estructura similar)
├── medical_records/      # App de historias médicas (estructura similar)
├── migrations/           # Migraciones de base de datos
├── .env.example          # Plantilla de variables de entorno
├── requirements.txt      # Dependencias Python
└── Dockerfile            # Configuración Docker
```

## Instalación

### Requisitos Previos

- Python 3.11+
- PostgreSQL
- pip (gestor de paquetes Python)

### Instalación

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd backend
```

2. Crear entorno virtual e instalar dependencias:
```bash
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con tu configuración
```

4. Ejecutar migraciones:
```bash
python manage.py migrate
```

5. Crear superusuario (opcional):
```bash
python manage.py createsuperuser
```

6. Iniciar servidor de desarrollo:
```bash
python manage.py runserver
```

## Endpoints de la API

### Pacientes
- `GET /api/patients/` - Listar todos los pacientes
- `POST /api/patients/` - Crear un nuevo paciente
- `GET /api/patients/{id}/` - Obtener detalles del paciente
- `PUT /api/patients/{id}/` - Actualizar paciente
- `DELETE /api/patients/{id}/` - Eliminar paciente

### Doctores
- `GET /api/doctors/` - Listar todos los doctores
- `POST /api/doctors/` - Crear un nuevo doctor
- `GET /api/doctors/{id}/` - Obtener detalles del doctor
- `PUT /api/doctors/{id}/` - Actualizar doctor
- `DELETE /api/doctors/{id}/` - Eliminar doctor

### Citas
- `GET /api/appointments/` - Listar todas las citas
- `POST /api/appointments/` - Crear una nueva cita
- `GET /api/appointments/{id}/` - Obtener detalles de la cita
- `PUT /api/appointments/{id}/` - Actualizar cita
- `DELETE /api/appointments/{id}/` - Eliminar cita

### Historias Médicas
- `GET /api/medical-records/` - Listar todas las historias médicas
- `POST /api/medical-records/` - Crear una nueva historia médica
- `GET /api/medical-records/{id}/` - Obtener detalles de la historia médica
- `PUT /api/medical-records/{id}/` - Actualizar historia médica
- `DELETE /api/medical-records/{id}/` - Eliminar historia médica

## Configuración Docker

```bash
# Construir imagen
docker build -t medical-software-backend .

# Ejecutar contenedor
docker run -p 8000:8000 --env-file .env medical-software-backend
```