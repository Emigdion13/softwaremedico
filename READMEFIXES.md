# README de Fixs y Soluciones - Sistema Médico

Este documento registra los errores encontrados, las soluciones implementadas y las lecciones aprendidas durante el desarrollo y despliegue del sistema.

---

## 1. Problema: Login Page Faltante

**Error**: La aplicación no tenía una página de login. Los usuarios eran redirigidos directamente al dashboard sin autenticación.

**Solución Implementada**:
- Creó `frontend/src/pages/Login.jsx` con formulario completo (username, password, toggle visibility)
- Creó `frontend/src/pages/Register.jsx` para registro de nuevos usuarios
- Agregó `useAuth()` hook en `frontend/src/utils/auth.jsx`
- Actualizó `App.jsx` con rutas protegidas y redirección a `/login` cuando no hay autenticación

**Archivos Creados/Modificados**:
- `frontend/src/pages/Login.jsx` - Página de login
- `frontend/src/pages/Register.jsx` - Página de registro  
- `frontend/src/utils/auth.jsx` (renombrado de auth.js) - Contexto de autenticación
- `frontend/src/App.jsx` - Rutas protegidas

**Credenciales Demo**:
```
Username: admin
Password: admin123
```

---

## 2. Problema: Error "Load failed" al intentar hacer login

### Causa Principal #1: Archivo .js con JSX

**Error**: 
```
[vite:build-import-analysis] Failed to parse source for import analysis because the content contains invalid JS syntax. If you are using JSX, make sure to name the file with the .jsx or .tsx extension.
file: /app/src/utils/auth.js
```

**Solución**: Renombrar `auth.js` a `auth.jsx` ya que contiene JSX syntax.

```bash
mv src/utils/auth.js src/utils/auth.jsx
```

### Causa Principal #2: URL del API incorrecta en Docker

**Error**: El frontend dentro del contenedor no podía conectarse a `http://localhost:8000` porque desde el navegador, `localhost` se refiere a la máquina cliente, no al contenedor del backend.

**Archivos Analizados**:
- `frontend/vite.config.js` - Tiene proxy para desarrollo local
- `frontend/nginx.conf` - Tiene proxy `/api` hacia `http://backend:8000`
- `frontend/Dockerfile` - No pasaba variables de entorno

**Solución**: Usar URLs relativas en lugar de URLs absolutas. El frontend ahora usa:

```javascript
// Antes (no funciona):
await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/accounts/login/`, ...)

// Después (funciona):
await fetch('/api/accounts/login/', ...)
```

Esto hace que las peticiones pasen por el proxy de nginx configurado en `nginx.conf`:
```nginx
location /api {
    proxy_pass http://backend:8000;
    ...
}
```

**Archivos Modificados**:
- `frontend/src/pages/Login.jsx` - Cambiado a URL relativa `/api/accounts/login/`
- `frontend/src/pages/Register.jsx` - Cambiado a URL relativa `/api/accounts/register/`
- `frontend/Dockerfile` - Agregado ARG para VITE_API_URL (aunque ahora no se usa por usar URLs relativas)
- `frontend/.env.production` - Archivo creado con `VITE_API_URL=http://backend:8000`

---

## 3. Configuración de CORS

**Verificación realizada**: El backend ya tenía configurado CORS correctamente en `config/settings/__init__.py`:

```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]
CORS_ALLOW_CREDENTIALS = True
```

**No se requirió cambio**.

---

## 4. Flujo de Autenticación

### Antes del fix:
```
Usuario → localhost:3000 → Dashboard (sin login)
```

### Después del fix:
```
Usuario → localhost:3000/login
  ↓
Ingresa credenciales (admin / admin123)
  ↓
POST /api/accounts/login/ (via nginx proxy a backend:8000)
  ↓
Backend devuelve JWT tokens
  ↓
Tokens almacenados en localStorage
  ↓
Usuario redirigido a /appointments
```

---

## 5. Comandos Útiles para Depuración

```bash
# Ver logs del frontend
docker logs medical-software-frontend --tail 20

# Verificar si el backend responde
curl -s http://localhost:8000/api/accounts/login/

# Probar login directamente
curl -X POST http://localhost:8000/api/accounts/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Reconstruir frontend después de cambios
cd /Users/emi/Desktop/projects/medicalSoftware
docker-compose build frontend

# Verificar que nginx tenga el proxy correcto
cat frontend/nginx.conf
```

---

## 6. Estructura del Login

### Componentes:
1. **Login.jsx**: Formulario de inicio de sesión
   - Inputs: username, password (con toggle visibility)
   - Validación de campos vacíos
   - Manejo de errores
   - Llamada a `/api/accounts/login/`
   - Almacenamiento de tokens en localStorage

2. **auth.jsx** (contexto):
   - `useAuth()` hook para acceder al contexto
   - Estado del usuario (user, loading)
   - Funciones: login(), logout()
   - Persistencia con localStorage

3. **App.jsx**:
   - `ProtectedRoute` componente que verifica autenticación
   - Rutas protegidas redirigen a `/login` si no autenticado
   - Loading state mientras verifica token

### Flujo de tokens:
```
Login exitoso → localStorage.setItem('accessToken', data.access)
              → localStorage.setItem('refreshToken', data.refresh)  
              → localStorage.setItem('user', JSON.stringify(data.user))
```

---

## 7. Notas Importantes para Próximos Fixes

1. **Siempre usar URLs relativas en el frontend** cuando esté contenedorizado con nginx proxy
2. **Archivos que contengan JSX deben tener extensión .jsx**, no .js
3. **Revisar CORS headers** siempre que cambie la URL del frontend
4. **Logs de Docker**: Usar `docker logs <container>` para depurar errores de build o runtime
5. **Variables de entorno en Vite** usan `import.meta.env.VITE_*` (no `process.env.REACT_APP_*`)

---

## 8. Status Activo

✅ Login page implementada y funcional  
✅ Rutas protegidas configuradas  
✅ Proxy nginx working correctamente  
✅ JWT authentication integrado  

---

## 9. Cómo Cerrar Sesión (Logout) - Agregado el 2026-04-21

### Componentes Agregados:
- `frontend/src/components/Navbar.jsx` - Barra superior con botón "Cerrar Sesión"

### Ubicación del Botón:
El botón de logout se encuentra en la **barra superior (navbar)** de la aplicación, a la derecha. Muestra el nombre de usuario y un botón "Cerrar Sesión".

### Acciones al hacer Logout:
1. Limpia tokens de localStorage (`accessToken`, `refreshToken`)
2. Elimina datos del usuario (`user`)
3. Redirige a `/login`

---

## 10. Registro de Usuarios (Fix) - Agregado el 2026-04-22

### Problema:
Al intentar registrar un nuevo usuario, se recibía el error: **"Las credenciales de autenticación no se proveyeron."**

### Causa:
El `RegisterView` en Django REST Framework heredaba las configuraciones globales que requieren autenticación por defecto (`IsAuthenticated`).

### Solución:
Agregado explícitamente en `backend/accounts/views.py`:
```python
class RegisterView(generics.CreateAPIView):
    authentication_classes = []  # Permite acceso sin autenticación
    permission_classes = []      # No requiere permisos para registrar
```

### Archivos Modificados:
- `backend/accounts/views.py` - Agregado `authentication_classes` y `permission_classes`
- `frontend/src/pages/Register.jsx` - Mejorado manejo de errores y mensajes de éxito

---

## 13. Registro de Usuarios - Error "password_confirm" (Fix) - Agregado el 2026-04-22

### Problema:
Al intentar registrar un nuevo usuario, se recibía el error: **"Error al crear la cuenta."**

### Causa:
El frontend no estaba enviando el campo `password_confirm` al backend. El `RegisterSerializer` requiere este campo para validar que las contraseñas coincidan.

**Request del frontend (antes)**:
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "pass123"
}
```

El backend respondía con error 400 porque faltaba `password_confirm`.

### Solución:
Actualizar el frontend para incluir `password_confirm` en el body de la petición:

**Request del frontend (después)**:
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "pass123",
  "password_confirm": "pass123"
}
```

### Archivos Modificados:
- `frontend/src/pages/Register.jsx` - Agregado campo `password_confirm` en el body del POST

**Código actualizado**:
```javascript
body: JSON.stringify({
  username: formData.username,
  email: formData.email,
  password: formData.password,
  password_confirm: formData.confirmPassword  // ← Agregado
}),
```

### Flujo de Registro:
1. Usuario ingresa datos en `/register`
2. Frontend envía POST a `/api/accounts/register/`
3. Backend valida (contraseñas coinciden, email único, etc.)
4. Si exitoso: devuelve HTTP 201 con mensaje y usuario creado
5. Frontend muestra mensaje de éxito y redirige a `/login` tras 1.5s

---

## 14. Notas Importantes para Próximos Fixes

1. **Siempre usar URLs relativas en el frontend** cuando esté contenedorizado con nginx proxy
2. **Archivos que contengan JSX deben tener extensión .jsx**, no .js
3. **Revisar CORS headers** siempre que cambie la URL del frontend
4. **Logs de Docker**: Usar `docker logs <container>` para depurar errores de build o runtime
5. **Variables de entorno en Vite** usan `import.meta.env.VITE_*` (no `process.env.REACT_APP_*`)

---

## 15. Status Activo

✅ Login page implementada y funcional  
✅ Rutas protegidas configuradas  
✅ Proxy nginx working correctamente  
✅ JWT authentication integrado  
✅ Navbar con botón de logout  
✅ Registro de usuarios (fix: 2026-04-22)  

---

## 16. Esquema de Base de Datos

**Actualizado**: 2026-04-22

### Tablas y Sus Campos:

#### `accounts_user` - Usuario del sistema
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | bigint | Primary Key |
| password | varchar(128) | Contraseña cifrada |
| username | varchar(150) | Username único |
| first_name | varchar(150) | Nombre |
| last_name | varchar(150) | Apellidos |
| email | varchar(254) | Email único |
| role | varchar(50) | Rol (DOCTOR, SECRETARY, ADMINISTRATOR, RECEPTIONIST, NURSE, LAB_TECHNICIAN) |
| phone | varchar(20) | Teléfono |
| is_active | boolean | Estado activo |
| created_at | timestamp | Fecha de creación |
| updated_at | timestamp | Última actualización |

#### `patients_patient` - Pacientes
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | bigint | Primary Key |
| first_name | varchar(100) | Nombre |
| last_name | varchar(100) | Apellidos |
| email | varchar(254) | Email único |
| phone | varchar(20) | Teléfono |
| gender | varchar(1) | Género (M/F/O) |
| date_of_birth | date | Fecha de nacimiento |
| address | text | Dirección |
| medical_history | text | Historial médico |
| created_at | timestamp | Fecha de creación |
| updated_at | timestamp | Última actualización |

#### `doctors_doctor` - Doctores
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | bigint | Primary Key |
| first_name | varchar(100) | Nombre |
| last_name | varchar(100) | Apellidos |
| email | varchar(254) | Email único |
| phone | varchar(20) | Teléfono |
| specialization | varchar(50) | Especialidad |
| license_number | varchar(100) | Número de licencia único |
| created_at | timestamp | Fecha de creación |
| updated_at | timestamp | Última actualización |

#### `personnel_staff` - Personal
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | bigint | Primary Key |
| first_name | varchar(100) | Nombre |
| last_name | varchar(100) | Apellidos |
| email | varchar(254) | Email único |
| phone | varchar(20) | Teléfono |
| role | varchar(50) | Rol del personal |
| is_active | boolean | Estado activo |
| created_at | timestamp | Fecha de creación |
| updated_at | timestamp | Última actualización |

#### `personnel_secretary` - Secretarias
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | bigint | Primary Key |
| staff_member_id | bigint | FK a personnel_staff (único) |
| assistant_level | varchar(20) | Nivel de asistente |
| can_schedule_appointments | boolean | Puede programar citas |
| can_take_notes | boolean | Puede tomar notas |
| can_view_medical_records | boolean | Puede ver registros médicos |
| can_prescribe_medications | boolean | Puede recetar medicamentos |
| assigned_doctor_id | bigint | FK a doctors_doctor (opcional) |
| created_at | timestamp | Fecha de creación |
| updated_at | timestamp | Última actualización |

#### `appointments_appointment` - Citas Médicas
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | bigint | Primary Key |
| patient_id | bigint | FK a patients_patient |
| doctor_id | bigint | FK a doctors_doctor |
| appointment_date | timestamp | Fecha y hora de la cita |
| status | varchar(20) | Estado (scheduled, completed, cancelled, rescheduled) |
| reason | text | Motivo de la cita |
| notes | text | Notas adicionales |
| assisting_secretary_id | bigint | FK a personnel_staff (opcional) |
| created_at | timestamp | Fecha de creación |
| updated_at | timestamp | Última actualización |

#### `medical_records_medicalrecord` - Registros Médicos
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | bigint | Primary Key |
| patient_id | bigint | FK a patients_patient |
| doctor_id | bigint | FK a doctors_doctor |
| appointment_id | bigint | FK a appointments_appointment (único) |
| diagnosis | text | Diagnóstico |
| treatment | text | Tratamiento |
| medications | text | Medicamentos recetados |
| follow_up_date | date | Fecha de seguimiento (opcional) |
| created_at | timestamp | Fecha de creación |
| updated_at | timestamp | Última actualización |

### Relaciones (Foreign Keys):
- `appointments_appointment` → `patients_patient`, `doctors_doctor`, `personnel_staff`
- `medical_records_medicalrecord` → `patients_patient`, `doctors_doctor`, `appointments_appointment`
- `personnel_secretary` → `doctors_doctor`, `personnel_staff`

---

**Última actualización**: 2026-04-22
