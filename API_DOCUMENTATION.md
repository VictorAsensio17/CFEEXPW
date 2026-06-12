# 🔌 API Documentation - Club Finanzas Extremadura

## Endpoints Propuestos

### Base URL
```
http://localhost:3000/api
```

---

## 👤 Autenticación

Actualmente no se requiere autenticación para los endpoints de admisión y contacto.

---

## 📝 Endpoints

### 1. ADMISIONES

#### POST `/admission`
Registrar nuevo miembro

**Request:**
```json
{
  "fullName": "Juan Pérez García",
  "email": "juan@alumnos.unex.es",
  "degree": "grado-3",
  "interests": "Inversión en mercados de renta variable",
  "phone": "+34612345678"
}
```

**Response (201):**
```json
{
  "status": "success",
  "message": "Solicitud enviada correctamente",
  "admissionId": "ADM-2026-0001",
  "data": {
    "id": "ADM-2026-0001",
    "email": "juan@alumnos.unex.es",
    "status": "pending",
    "createdAt": "2026-05-31T10:30:00Z"
  }
}
```

---

### 2. CONTACTO

#### POST `/contact`
Enviar mensaje de contacto

**Request:**
```json
{
  "name": "María López",
  "email": "maria@example.com",
  "subject": "Propuesta de Colaboración",
  "message": "Me gustaría colaborar con el club..."
}
```

**Response (201):**
```json
{
  "status": "success",
  "message": "Mensaje enviado correctamente",
  "messageId": "MSG-2026-0001"
}
```

---

### 3. EVENTOS

#### GET `/events`
Obtener lista de eventos

**Query Parameters:**
- `page`: Página (default: 1)
- `limit`: Eventos por página (default: 10)
- `type`: Tipo de evento (debate, taller, networking)
- `status`: Estado (upcoming, past, ongoing)

**Response (200):**
```json
{
  "status": "success",
  "data": [
    {
      "id": "EVT-001",
      "title": "Workshop: Bloomberg Terminal",
      "description": "Introducción a Bloomberg Terminal",
      "date": "2026-06-02T18:00:00Z",
      "location": "Campus UEx",
      "type": "taller",
      "capacity": 40,
      "registered": 35,
      "image": "https://api.example.com/events/evt-001.jpg"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45
  }
}
```

#### GET `/events/:id`
Obtener detalles de un evento específico

#### POST `/events/:id/register`
Registrarse a un evento

---

### 4. RECURSOS

#### GET `/resources`
Obtener lista de recursos/artículos

**Query Parameters:**
- `category`: Categoría (tecnologia, macroeconomia, mercados)
- `search`: Búsqueda de texto
- `sort`: Ordenar por (date, popularity)

**Response (200):**
```json
{
  "status": "success",
  "data": [
    {
      "id": "RES-001",
      "title": "El impacto de la IA en los modelos de valoración",
      "category": "tecnologia",
      "excerpt": "Exploramos cómo los algoritmos...",
      "content": "Contenido completo del artículo",
      "author": "Juan García",
      "publishedAt": "2026-05-12T00:00:00Z",
      "views": 145,
      "readTime": "8 minutos"
    }
  ]
}
```

#### GET `/resources/:id`
Obtener artículo completo

#### POST `/resources`
Crear nuevo artículo (solo admin)

---

### 5. USUARIOS

#### GET `/users/profile`
Obtener perfil del usuario autenticado

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "id": "USR-001",
    "fullName": "Juan Pérez",
    "email": "juan@example.com",
    "degree": "grado-3",
    "joinDate": "2026-01-15T00:00:00Z",
    "memberStatus": "active",
    "interests": ["inversión", "análisis técnico"]
  }
}
```

#### PUT `/users/profile`
Actualizar perfil del usuario

---

### 6. MIEMBROS

#### GET `/members`
Listar miembros (acceso admin/moderador)

**Response (200):**
```json
{
  "status": "success",
  "data": [
    {
      "id": "USR-001",
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "joinDate": "2026-01-15T00:00:00Z",
      "status": "active",
      "eventsAttended": 5
    }
  ]
}
```

---

### 7. MERCADOS

#### GET `/markets/overview`
Obtener overview de mercados

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "ibex35": {
      "value": 18436.70,
      "change": 0.80,
      "changePercentage": 0.0045,
      "updatedAt": "2026-05-31T17:30:00Z"
    },
    "sp500": {
      "value": 7519.21,
      "change": 45.12,
      "changePercentage": 0.0061,
      "updatedAt": "2026-05-31T21:30:00Z"
    },
    "eurusd": {
      "value": 1.1628,
      "change": -0.0019,
      "changePercentage": -0.0013,
      "updatedAt": "2026-05-31T17:30:00Z"
    }
  }
}
```

---

## 🔐 Códigos de Error

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Solicitud exitosa |
| 201 | Created | Recurso creado |
| 400 | Bad Request | Solicitud inválida |
| 401 | Unauthorized | No autenticado |
| 403 | Forbidden | Permiso denegado |
| 404 | Not Found | Recurso no encontrado |
| 409 | Conflict | Conflicto (ej: email duplicado) |
| 500 | Server Error | Error del servidor |

**Response de error:**
```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "El email ya está registrado",
  "errors": [
    {
      "field": "email",
      "message": "Email duplicado"
    }
  ]
}
```

---

## 📦 Rate Limiting

- **Límite**: 100 requests por minuto por IP
- **Headers de respuesta**:
  - `X-RateLimit-Limit: 100`
  - `X-RateLimit-Remaining: 95`
  - `X-RateLimit-Reset: 1622522400`

---

## 🔑 Autenticación - JWT

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "contraseña"
}
```

### Response
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 86400,
  "user": {
    "id": "USR-001",
    "email": "usuario@example.com"
  }
}
```

---

## 📝 Ejemplos de Uso

### JavaScript Fetch

```javascript
// GET - Obtener eventos
async function getEvents() {
  const response = await fetch(
    'https://api.clubfinanzasextremadura.es/v1/events',
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  const data = await response.json();
  return data;
}

// POST - Registrar admisión
async function registerAdmission(formData) {
  const response = await fetch(
    'https://api.clubfinanzasextremadura.es/v1/admission/register',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    }
  );
  return await response.json();
}
```

### cURL

```bash
# GET
curl -H "Authorization: Bearer TOKEN" \
  https://api.clubfinanzasextremadura.es/v1/events

# POST
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Juan","email":"juan@example.com"}' \
  https://api.clubfinanzasextremadura.es/v1/admission/register
```

---

## 🛠️ Tecnologías Recomendadas (Backend)

### Node.js + Express
```javascript
// Ejemplo básico
const express = require('express');
const app = express();

app.post('/api/v1/admission/register', (req, res) => {
  // Procesar solicitud
  res.json({ status: 'success' });
});
```

### Python + Flask
```python
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/api/v1/admission/register', methods=['POST'])
def register_admission():
    data = request.get_json()
    # Procesar datos
    return jsonify({'status': 'success'})
```

### Base de Datos
- **PostgreSQL** (recomendado para producción)
- **MongoDB** (si prefieres NoSQL)
- **MySQL** (compatible)

---

## 📞 Contacto para Integraciones

**Email**: dev@clubfinanzasextremadura.es  
**Documentación interactiva**: https://api.clubfinanzasextremadura.es/docs
