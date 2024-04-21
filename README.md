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


