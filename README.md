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

---

## Project Purpose & Scope

This repository provides a demo medical clinic management system built with Django (backend) and React (frontend). **It is NOT intended for production use or to store real patient data, and therefore does not meet HIPAA compliance requirements.**

## Prerequisites

- Docker & Docker Compose (recommended for quick start)
- Python >= 3.11
- Node.js >= 18
- Git
- (Optional) Make for convenience scripts

## Installation

### Docker‑based Setup (recommended)

1. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
2. Build and start containers:
   ```bash
   docker-compose up --build -d
   ```
3. Access the services:
   - Frontend: http://localhost:3000
   - API: http://localhost:8000/api/
   - Admin: http://localhost:8000/admin/

### Local Development (without Docker)

#### Backend

```bash
python3 -m venv venv
source venv/bin/activate
cd backend
pip install -r requirements.txt
python manage.py migrate
# Create a superuser (optional)
python manage.py createsuperuser
python manage.py runserver
```

#### Frontend

```bash
cd frontend
npm ci
npm run dev
```

The frontend runs on http://localhost:5173 and proxies API requests to the Django backend.

## Running Tests

- **Backend tests** (Django/pytest):
  ```bash
  cd backend
  pytest
  ```
- **Frontend tests** (Vitest/Jest):
  ```bash
  cd frontend
  npm test
  ```

## Code Quality / Linting

- Python linting:
  ```bash
  ruff check backend
  ```
- JavaScript/React linting:
  ```bash
  cd frontend
  npm run lint
  ```

## Environment Configuration

The `.env` file must contain the following keys (see `.env.example` for defaults):

```
DJANGO_SECRET_KEY=change-me-in-production
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=medical_software
DB_USER=postgres
DB_PASSWORD=postgres
DB_PORT=5432
```

Adjust values as needed for your environment. Never commit real secrets.

## Database Migration & Seeding

```bash
# Apply migrations
python manage.py migrate
# (Optional) Load demo data
python manage.py loaddata demo_data.json
```

## Authentication & Authorization

The API uses Django REST Framework token authentication. After creating a superuser, obtain a token via the `/api/token/` endpoint and include it in the `Authorization: Token <your-token>` header for protected routes.

## API Documentation

If Swagger/OpenAPI is enabled, you can view interactive docs at `http://localhost:8000/api/docs/`.

## Frontend Production Build

```bash
cd frontend
npm run build
```
The static files are generated in `frontend/dist/` and can be served by Nginx (see `nginx.conf`).

## Docker Compose Services Overview

| Service   | Purpose                               | Ports |
|-----------|---------------------------------------|-------|
| db        | PostgreSQL database                    | 5432 |
| backend   | Django API server                      | 8000 |
| frontend  | React development server (or static)  | 3000 (dev) / 80 (prod) |
| nginx     | Reverse proxy for production deployment | 80 |

## Troubleshooting

- **Port conflicts**: Ensure ports 3000, 8000, and 5432 are free or adjust `docker-compose.yml`.
- **Database connection errors**: Verify `DB_HOST` (default `db` when using Docker) and credentials in `.env`.
- **CORS issues**: The backend is configured to allow requests from `http://localhost:3000`. Update `CORS_ALLOWED_ORIGINS` in settings if you change the frontend URL.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Follow code style guidelines (ruff, eslint, prettier).
4. Run tests and ensure they pass.
5. Submit a Pull Request with a clear description of changes.

## Contact / Maintainers

For questions or issues, please open an issue on GitHub or contact the maintainer at `maintainer@example.com`.

---

## Licencia

MIT License