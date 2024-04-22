# 💪 Reto Técnico Coordinadora - Plataforma de Gestión de Eventos API

[![JavaScript](https://img.shields.io/badge/JavaScript-yellow?style=for-the-badge&logo=javascript&logoColor=white&labelColor=101010)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-green?style=for-the-badge&logo=node.js&logoColor=white&labelColor=101010)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue?style=for-the-badge&logo=postgresql&logoColor=white&labelColor=101010)](https://www.postgresql.org/)
[![docker](https://img.shields.io/badge/docker-blue?style=for-the-badge&logo=docker&logoColor=white&labelColor=101010)](https://www.docker.com)


## Caso  Práctico:  Plataforma  de  Gestión  de  Eventos

Se realiza el desarrollo de una **API RESTful** para una plataforma de gestión de eventos. Esta plataforma permitirá a los usuarios crear, promocionar y gestionar eventos de manera efectiva. Los usuarios  podrán  registrarse  para  asistir  a  eventos  al  igual  que  ver  detalles  sobre  los  eventos como información detallada o lugares cercanos.

## ✨ Caracteristicas
- Gestión de usuarios:
    * Permite registrar nuevos usuarios.
    * Permite la autenticación de usuarios para poder gestionar eventos.
    * Permite ver el perfil del usuario con los eventos creados y en los que va a participar [Auth].
- Gestión de eventos:
    * Permite ver todos los eventos.
    * Permite consultar los eventos por su id [Auth].
    * Permite consultar los asistentes a un evento por su id [Auth].
    * Permite crear/modificar/eliminar eventos [Auth].
    * Permite registrar asistentes a un evento [Auth].
- Carga masiva de datos:
    * Con el uso de una plantilla en Excel, se pueden cargar los usuarios y eventos de manera masiva [Auth].
- Consulta de ubicaciones cercanas:
    * Permite la consulta de las ubicaciones cercanas al evento, con su georeferenciación [Auth].
- Consulta de asistencia:
    * Permite ver el consolidado de asistencia semanal dia por dia [Auth].

## ⚠️ Requerimientos:
- Tener conexión a internet :trollface:.
- Tener instalado [docker](https://www.docker.com/).
- Se requieren los puertos 3000 y 5432 libres para el correcto funcionamiento de la app y posgreSQL.
- Para despliegue local requiere:
    * Node v20.11.1
    * PostgreSQL v15

## 🖥 Ejecución

### Creación del archivo de variables de entorno
- En la raiz del proyecto se debe crear un archivo .env que contiene las siguientes variables:
```
DB_USER=usuario
DB_HOST=base_datos
DB_NAME=nombre_base_datos
DB_PASSWORD=contraseña
DB_PORT=puerto
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@db:${DB_PORT}/${DB_NAME}
JWT_SECRET=s3cr3t
MAPBOX_ACCESS_TOKEN=token_mapbox

```

### En macOS / Linux
1. Inicie docker.
2. Descargue una copia del repositorio y descomprimala en algun directorio.
3. Abra una terminal en el directorio del proyecto y ejecute:
```sh
$ chmod +x run_docker.sh
$ ./run_docker.sh
```
4. Espere un momento a que los contenedores se levanten y se ejecute la inicialización de la base de datos.

### En Windows
1. Inicie docker.
2. Descargue una copia del repositorio y descomprimala en algun directorio.
3. Abra una terminal en el directorio del proyecto y ejecute:
```sh
$ run_docker.bat
```
4. Espere un momento a que los contenedores se levanten y se ejecute la inicialización de la base de datos.

## Funcionamiento:

En su navegador de preferencia ingrese al Swagger de la app con la siguiente URL:
```
http://localhost:3000/api-docs/
```

# ✅ API RESTful - Plataforma de Gestión de Eventos

## Descripción
Esta API permite crear, promocionar y gestionar eventos. Proporciona endpoints para la autenticación de usuarios, registro de nuevos usuarios, gestión de perfiles de usuario, así como para la creación, actualización y eliminación de eventos. También incluye funcionalidades avanzadas como la carga masiva de datos desde archivos Excel y consultas sobre lugares cercanos a los eventos.

## Contacto
Para más información, contacta a Fabian Callejas en [fabiancallejas@gmail.com](mailto:fabiancallejas@gmail.com).

## Autenticación
Algunos edpoints estan protegidos con autenticación. Utilizamos el esquema de autenticación Bearer con JWT. Incluya el token JWT en la cabecera `Authorization` de sus solicitudes.
```json
 Bearer <token>
```


## Endpoints Disponibles

La aplicación se compone de 13 endpoints disponibles y agrupados. A continuación la descripción de cada uno:

### 1.1. Usuarios

#### 1. Iniciar Sesión de Usuario
- Método: `POST`
- Endpoint: `/users/login`
- Descripción: Este endpoint autentica a un usuario mediante su nombre de usuario y contraseña.
- **Autenticación Requerida**: No
- Request Body:
```json
{
  "username": "nombre_usuario",
  "email": "correo@servidor.com",
}
```
- Respuestas:
  - `200 OK`: Usuario autenticado exitosamente. 🔑 **<span style="color:green">Devuelve un token JWT</span>**.
  - `401 Unauthorized`: Fallo de autenticación.

#### 2. Registro de Nuevo Usuario
- Método: `POST`
- Endpoint: `/users/register`
- Descripción: Este endpoint registra un nuevo usuario.
- **Autenticación Requerida**: No
- Request Body:
```json
{
  "username": "nombre_usuario",
  "email": "correo@servidor.com",
  "password": "contraseña"
}
```
- Respuestas:
  - `201 Created`: Usuario registrado exitosamente.
  - `400 Bad Request`: Datos de entrada inválidos o usuario ya existe.

#### 3. Obtener Perfil de Usuario
- Método: `GET`
- Endpoint: `/users/profile`
- Descripción: Este endpoint devuelve los detalles del perfil del usuario autenticado.
- **Autenticación Requerida**: Sí, mediante JWT
- Respuestas:
  - `200 OK`: Perfil de usuario recuperado exitosamente.
  - `401 Unauthorized`: No autorizado.

### 1.2. Consulta Eventos

#### 4. Obtener Evento por ID
- Método: `GET`
- Endpoint: `/events/{eventId}`
- Descripción: Recupera un evento específico por su ID.
- **Autenticación Requerida**: Sí, mediante JWT
- Parámetros de URL:
  - `eventId`: ID único del evento a recuperar.
- Respuestas:
  - `200 OK`: Objeto del evento.
  - `404 Not Found`: Evento no encontrado.
  - `500 Internal Server Error`: Error del servidor.

#### 5. Obtener Asistentes de un Evento
- Método: `GET`
- Endpoint: `/events/{eventId}/attendees`
- Descripción: Recupera una lista de los asistentes al evento especificado por su ID.
- **Autenticación Requerida**: Sí, mediante JWT
- Parámetros de URL:
  - `eventId`: ID del evento del cual se desean obtener los asistentes.
- Respuestas:
  - `200 OK`: Lista de asistentes al evento.
  - `404 Not Found`: Evento no encontrado o sin asistentes.

#### 6. Obtener Lista de Eventos
- Método: `GET`
- Endpoint: `/events`
- Descripción: Recupera una lista de eventos.
- Respuestas:
  - `200 OK`: Lista de eventos.

### 1.3. Manejo de Eventos

#### 7. Actualizar Evento
- Método: `PUT`
- Endpoint: `/events/{eventId}`
- Descripción: Actualiza un evento existente.
- **Autenticación Requerida**: Sí, mediante JWT
- Request Body:
```json
{
  "event_id": 0,
  "title": "nombre_evento",
  "description": "descripcion_evento",
  "start_time": "2024-04-22T01:41:45.735Z",
  "end_time": "2024-04-22T01:41:45.735Z",
  "location": "string",
  "latitude": 0,
  "longitude": 0,
  "organizer_id": 0
}
```
- Parámetros de URL:
  - `eventId`: ID numérico del evento a actualizar.
- Respuestas:
  - `200 OK`: Evento actualizado exitosamente.
  - `404 Not Found`: Evento no encontrado.

#### 8. Eliminar Evento
- Método: `DELETE`
- Endpoint: `/events/{eventId}`
- Descripción: Elimina un evento por su ID.
- **Autenticación Requerida**: Sí, mediante JWT
- Parámetros de URL:
  - `eventId`: ID numérico del evento a eliminar.
- Respuestas:
  - `200 OK`: Evento eliminado exitosamente.
  - `404 Not Found`: Evento no encontrado.

#### 9. Registrar Asistente a un Evento
- Método: `POST`
- Endpoint: `/events/{eventId}/attendees`
- Descripción: Registra un usuario como asistente al evento especificado por su ID, esta diseñado para registrar uno a la vez.
- **Autenticación Requerida**: Sí, mediante JWT
- Parámetros de URL:
  - `eventId`: ID del evento al cual se desea agregar el asistente.
- Parámetros de Cuerpo:
  - `userId`: ID del usuario que se está registrando como asistente.
- Respuestas:
  - `201 Created`: Asistente registrado exitosamente.
  - `400 Bad Request`: Solicitud incorrecta, posiblemente debido a un ID de usuario faltante o ID de evento inválido.
  - `404 Not Found`: Evento no encontrado.

#### 10. Crear Nuevo Evento
- Método: `POST`
- Endpoint: `/events`
- Descripción: Crea un nuevo evento con los datos proporcionados en el cuerpo de la solicitud.
- **Autenticación Requerida**: Sí, mediante JWT
- Request Body:
```json
{
  "title": "nombre_evento",
  "description": "descripcion_evento",
  "start_time": "2024-04-22T01:44:08.457Z",
  "end_time": "2024-04-22T01:44:08.457Z",
  "location": "nombre_o_direccion_evento,_ciudad,_pais",
  "organizer_id": 0
}
```
- Consideraciones:
  - La dirección del evento debe especificar bien la ciudad y el pais separados por comas para una mejor georeferenciación. Por ejemplo: Jardín Botanico, Medellin, Colombia.
- Respuestas:
  - `201 Created`: Evento creado exitosamente.
  - `400 Bad Request`: Cuerpo de solicitud inválido o parámetros.
  - `500 Internal Server Error`: Error al crear el evento.

### 2. Carga Masiva de Datos

#### 11. Subir Archivo Excel para Carga Masiva
- Método: `POST`
- Endpoint: `/bulk-upload/upload`
- Descripción: Permite a los usuarios cargar archivos Excel con información de eventos para procesar y almacenar en la base de datos.
- **Autenticación Requerida**: Sí, mediante JWT
- Respuestas:
  - `200 OK`: Datos cargados exitosamente.
  - `401 Unauthorized`: Token JWT inválido o faltante.
  - `500 Internal Server Error`: Error interno del servidor.

### 3. Consulta de Ubicaciones Cercanas

#### 12. Obtener Lugares Cercanos al Evento
- Método: `GET`
- Endpoint: `/events/{eventId}/nearby_places`
- Descripción: Recupera una lista de lugares cerca de la ubicación del evento.
- **Autenticación Requerida**: Sí, mediante JWT
- Parámetros de URL:
  - `eventId`: ID del evento.
- Respuestas:
  - `200 OK`: Lista de lugares cercanos.
  - `404 Not Found`: Evento no encontrado.

### 4. Estadísticas Avanzadas

#### 13. Obtener Asistentes por Día de la Semana
- Método: `GET`
- Endpoint: `/events/attendees_by_weekday`
- Descripción: Devuelve un objeto JSON con el recuento de asistentes por día de la semana.
- **Autenticación Requerida**: Sí, mediante JWT
- Respuestas:
  - `200 OK`: Objeto JSON con los recuentos de asistentes por día de la semana.
  - `400 Bad Request`: Solicitud incorrecta.
  - `500 Internal Server Error`: Error interno del servidor.

### Más información
Para obtener información detallada sobre los esquemas de datos utilizados, consulta el archivo /src/config/swagger.yaml.


# 📚 Base de Datos
Se utiliza el motor de base de datos PosgreSQL.

## Esquemas de Datos

### Tabla de Usuarios
- **Nombre:** users
- **Descripción:** Esta tabla se utiliza para gestionar el registro de usuarios y la autenticación.
  
| Campo          | Tipo                   | Restricciones               |
|----------------|------------------------|-----------------------------|
| user_id        | SERIAL                 | PRIMARY KEY                 |
| username       | VARCHAR(50)            | UNIQUE, NOT NULL            |
| email          | VARCHAR(100)           | UNIQUE, NOT NULL            |
| password_hash  | VARCHAR(255)           | NOT NULL                    |
| created_at     | TIMESTAMP WITH TIMEZONE| DEFAULT CURRENT_TIMESTAMP   |

### Tabla de Eventos
- **Nombre:** events
- **Descripción:** Esta tabla almacena detalles de eventos organizados.
  
| Campo          | Tipo                   | Restricciones               |
|----------------|------------------------|-----------------------------|
| event_id       | SERIAL                 | PRIMARY KEY                 |
| organizer_id   | INT                    | NOT NULL                    |
| title          | VARCHAR(255)           | NOT NULL                    |
| description    | TEXT                   |                             |
| start_time     | TIMESTAMP WITH TIMEZONE| NOT NULL                    |
| end_time       | TIMESTAMP WITH TIMEZONE| NOT NULL                    |
| latitude       | DECIMAL(9,6)           |                             |
| longitude      | DECIMAL(9,6)           |                             |
| location       | VARCHAR(255)           |                             |
| created_at     | TIMESTAMP WITH TIMEZONE| DEFAULT CURRENT_TIMESTAMP   |
| updated_at     | TIMESTAMP WITH TIMEZONE| DEFAULT CURRENT_TIMESTAMP   |
| FOREIGN KEY (organizer_id) REFERENCES users (user_id) |

### Tabla de Asistentes
- **Nombre:** attendees
- **Descripción:** Esta tabla registra usuarios en eventos.
  
| Campo          | Tipo                   | Restricciones               |
|----------------|------------------------|-----------------------------|
| attendee_id    | SERIAL                 | PRIMARY KEY                 |
| event_id       | INT                    | NOT NULL                    |
| user_id        | INT                    | NOT NULL                    |
| registered_at  | TIMESTAMP WITH TIMEZONE| DEFAULT CURRENT_TIMESTAMP   |
| FOREIGN KEY (event_id) REFERENCES events (event_id) |
| FOREIGN KEY (user_id) REFERENCES users (user_id)   |

### Tabla de Lugares Cercanos
- **Nombre:** nearby_places
- **Descripción:** Esta tabla almacena lugares cercanos a eventos (opcional).
  
| Campo          | Tipo                   | Restricciones               |
|----------------|------------------------|-----------------------------|
| place_id       | SERIAL                 | PRIMARY KEY                 |
| event_id       | INT                    | NOT NULL                    |
| name           | VARCHAR(255)           | NOT NULL                    |
| address        | TEXT                   |                             |
| latitude       | DECIMAL(9,6)           |                             |
| longitude      | DECIMAL(9,6)           |                             |
| FOREIGN KEY (event_id) REFERENCES events (event_id) |

### Link a diagrama ER de la base de datos:
[Diagrama ER Base de Datos](https://drive.google.com/file/d/15fQ3vCWXg87Q4-cLN8hgL8eF5aakMsuT/view)


# 🤓 Conocimientos sobre Servidores, Infraestructura y DevOps 
- Acá [DevOps](DevOps.md) se tiene una documentación detallada sobre los Triggers, Despliegues y Rollback en el contexto de la implementación de CI/CD con Jenkins y Docker para este reto técnico.
- Acá [Arquitectura](Architecture.md) se tiene una documentación de como realizar una arquitectura híbrida para una API resiliente, idempotente y escalable, combinando on-premise y cloud, para el manejo de este reto técnico.

# 🤚🏻 Contacto

- 🧑‍💻 Desarrollado por **Fabián A. Callejas Varela**
- 😎 Contacto: [LinkedIn](https://www.linkedin.com/in/fabiancallejas/)

### Perfil de GitHub

[![Web](https://img.shields.io/badge/GitHub-eLgRuNgE-14a1f0?style=for-the-badge&logo=github&logoColor=white&labelColor=101010)](https://github.com/eLgRuNgE)