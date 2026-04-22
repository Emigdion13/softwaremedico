# Software Médico

Un sistema integral de gestión médica construido con Django (backend), React (frontend), base de datos PostgreSQL y contenedorizado con Docker para una fácil implementación.

## Características

- **Gestión de Pacientes**: Registrar y administrar la información de los pacientes
- **Gestión de Doctores**: Mantener perfiles de doctores y especializaciones
- **Programación de Citas**: Programar y rastrear las citas de los pacientes
- **Historias Médicas**: Almacenar y acceder a las historias médicas de los pacientes

## Stack Tecnológico

- **Backend**: Python 3.11, Django 3.2, Django REST Framework
- **Frontend**: React 18, Material UI, Vite
- **Base de Datos**: PostgreSQL 15
- **Contenedorización**: Docker, Docker Compose

## Documentación Adicional

### READMEFIXES.md - Guía de Fixes y Soluciones

**Importante para desarrollo futuro**: Este archivo contiene el registro detallado de todos los errores encontrados y soluciones implementadas durante el desarrollo. Incluye:

- Problemas técnicos encontrados (como errores de login, CORS, autenticación)
- Causas raíz分析 (raíz analysis) y cómo se diagnosticaron
- Soluciones paso a paso implementadas
- Comandos útiles para depuración

**Antes de hacer cambios o troubleshooting**, revisa `READMEFIXES.md` para entender qué soluciones ya fueron intentadas y evitar reinventar soluciones.

**Nota para modelos de IA futuros**: Este archivo existe para que no te pierdas en el historial de fixes. Revisa siempre este documento antes de proponer nuevas soluciones a problemas que ya han sido abordados.

## Requisitos Previos

- Docker y Docker Compose instalados
- Node.js 18+ (para desarrollo local sin Docker)
- Python 3.11+ (para desarrollo local sin Docker)

## Inicio Rápido con Docker

1. Copiar `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Construir e iniciar los contenedores:
   ```bash
   docker-compose up --build
   ```

3. Acceder a la aplicación:
   - Frontend: http://localhost:3000
   - API Backend: http://localhost:8000/api/
   - Admin: http://localhost:8000/admin/

## Desarrollo Local (sin Docker)

### Configuración del Backend

1. Crear y activar el entorno virtual:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

2. Instalar dependencias:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. Ejecutar migraciones:
   ```bash
   python manage.py migrate
   ```

4. Crear superusuario (opcional):
   ```bash
   python manage.py createsuperuser
   ```

5. Iniciar servidor de desarrollo:
   ```bash
   python manage.py runserver
   ```

### Configuración del Frontend

1. Navegar al directorio frontend e instalar dependencias:
   ```bash
   cd frontend
   npm install
   ```

2. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```

El frontend se ejecutará en http://localhost:5173 y hará proxy de las peticiones API al backend Django.

## Estructura del Directorio

```
medicalSoftware/
├── backend/               # Aplicación Django backend
│   ├── api/              # App médica (pacientes, doctores, citas, historias)
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/             # Aplicación React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── index.js
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── .env.example
├── README.md             # Este archivo
└── READMEFIXES.md        # Registro de fixes y soluciones (¡LEER PRIMERO!)
```

## Endpoints de la API

- `GET /api/patients` - Listar todos los pacientes
- `POST /api/patients` - Crear un nuevo paciente
- `GET /api/doctors` - Listar todos los doctores
- `POST /api/doctors` - Crear un nuevo doctor
- `GET /api/appointments` - Listar todas las citas
- `POST /api/appointments` - Programar una nueva cita
- `GET /api/medical-records` - Listar todas las historias médicas
- `POST /api/medical-records` - Crear una nueva historia médica

## Variables de Entorno

Copiar `.env.example` a `.env` y modificar según sea necesario:

```
DJANGO_SECRET_KEY=tu-clave-secreta-aqui-cambiar-en-produccion
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=medical_software
DB_USER=postgres
DB_PASSWORD=postgres
DB_PORT=5432
```

## Licencia

MIT License