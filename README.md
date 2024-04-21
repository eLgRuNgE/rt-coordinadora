# [ 💪 Reto Técnico Coordinadora - Plataforma de Gestión de Eventos API]

🧑‍💻 Desarrollado por **Fabián A. Callejas Varela**
😎 Contacto: [LinkedIn](https://www.linkedin.com/in/fabiancallejas/)

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
- Tener instalado [docker](https://www.docker.com/)
- Se requieren los puertos 3000 y 5432 libres para el correcto funcionamiento de la app y posgreSQL.
- Para despliegue local requiere:
    * Node v20.11.1
    * PostgreSQL v15

## Ejecución

* En macOS / Linux
1. Inicie docker.
2. Descargue una copia del repositorio y descomprimala en algun directorio.
3. Abra una terminal en el directorio del proyecto y ejecute:
```sh
$ chmod +x run_docker.sh
$ ./run_docker.sh
```
4. Espere un momento a que los contenedores se levanten y se ejecute la inicialización de la base de datos.

* En Windows
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

# API RESTful - Plataforma de Gestión de Eventos

## Descripción
Esta API permite crear, promocionar y gestionar eventos. Proporciona endpoints para la autenticación de usuarios, registro de nuevos usuarios, gestión de perfiles de usuario, así como para la creación, actualización y eliminación de eventos. También incluye funcionalidades avanzadas como la carga masiva de datos desde archivos Excel y consultas sobre lugares cercanos a los eventos.

## Contacto
Para más información, contacta a Fabian Callejas en [fabiancallejas@gmail.com](mailto:fabiancallejas@gmail.com).

## Autenticación
Algunos edpoints estan protegidos con autenticación. Utilizamos el esquema de autenticación Bearer con JWT. Incluya el token JWT en la cabecera `Authorization` de sus solicitudes.



## Endpoints Disponibles

### 1.1. Usuarios

#### 1. Iniciar Sesión de Usuario
- Método: `POST`
- Endpoint: `/users/login`
- Descripción: Este endpoint autentica a un usuario mediante su nombre de usuario y contraseña.
- **Autenticación Requerida**: No
- Request Body:
  ```json
    {
        "username": "nombredeusuario",
        "password": "contraseña"
    }
 ```
- Respuestas:
  - `200 OK`: Usuario autenticado exitosamente. Devuelve un token JWT.
  - `401 Unauthorized`: Fallo de autenticación.

#### 2. Registro de Nuevo Usuario
- Método: `POST`
- Endpoint: `/users/register`
- Descripción: Este endpoint registra un nuevo usuario.
- **Autenticación Requerida**: No
- Request Body:
  ```json
    {
        "username": "nuevousuario",
        "email": "usuario@example.com",
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

#### 5. Actualizar Evento
- Método: `PUT`
- Endpoint: `/events/{eventId}`
- Descripción: Actualiza un evento existente.
- **Autenticación Requerida**: Sí, mediante JWT
- Parámetros de URL:
  - `eventId`: ID numérico del evento a actualizar.
- Respuestas:
  - `200 OK`: Evento actualizado exitosamente.
  - `404 Not Found`: Evento no encontrado.

#### 6. Eliminar Evento
- Método: `DELETE`
- Endpoint: `/events/{eventId}`
- Descripción: Elimina un evento por su ID.
- **Autenticación Requerida**: Sí, mediante JWT
- Parámetros de URL:
  - `eventId`: ID numérico del evento a eliminar.
- Respuestas:
  - `200 OK`: Evento eliminado exitosamente.
  - `404 Not Found`: Evento no encontrado.

#### 7. Obtener Lista de Eventos
- Método: `GET`
- Endpoint: `/events`
- Descripción: Recupera una lista de eventos.
- Respuestas:
  - `200 OK`: Lista de eventos.

#### 8. Crear Nuevo Evento
- Método: `POST`
- Endpoint: `/events`
- Descripción: Crea un nuevo evento con los datos proporcionados en el cuerpo de la solicitud.
- **Autenticación Requerida**: Sí, mediante JWT
- Respuestas:
  - `201 Created`: Evento creado exitosamente.
  - `400 Bad Request`: Cuerpo de solicitud inválido o parámetros.
  - `500 Internal Server Error`: Error al crear el evento.

### Carga Masiva de Datos

#### 9. Subir Archivo Excel para Carga Masiva
- Método: `POST`
- Endpoint: `/bulk-upload/upload`
- Descripción: Permite a los usuarios cargar archivos Excel con información de eventos para procesar y almacenar en la base de datos.
- **Autenticación Requerida**: Sí, mediante JWT
- Respuestas:
  - `200 OK`: Datos cargados exitosamente.
  - `401 Unauthorized`: Token JWT inválido o faltante.
  - `500 Internal Server Error`: Error interno del servidor.

### Consulta de Ubicaciones Cercanas

#### 10. Obtener Lugares Cercanos al Evento
- Método: `GET`
- Endpoint: `/events/{eventId}/nearby_places`
- Descripción: Recupera una lista de lugares cerca de la ubicación del evento.
- **Autenticación Requerida**: Sí, mediante JWT
- Parámetros de URL:
  - `eventId`: ID del evento.
- Respuestas:
  - `200 OK`: Lista de lugares cercanos.
  - `404 Not Found`: Evento no encontrado.

### Estadísticas Avanzadas

#### 11. Obtener Asistentes por Día de la Semana
- Método: `GET`
- Endpoint: `/events/attendees_by_weekday`
- Descripción: Devuelve un objeto JSON con el recuento de asistentes por día de la semana.
- **Autenticación Requerida**: Sí, mediante JWT
- Respuestas:
  - `200 OK`: Objeto JSON con los recuentos de asistentes por día de la semana.
  - `400 Bad Request`: Solicitud incorrecta.
  - `500 Internal Server Error`: Error interno del servidor.

## Esquemas de Datos
Para obtener información detallada sobre los esquemas de datos utilizados, consulta el archivo /src/config/swagger.yaml.
