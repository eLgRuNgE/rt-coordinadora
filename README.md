# 💪 Reto Técnico Coordinadora - Plataforma de Gestión de Eventos API

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

## 🖥 Ejecución

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

# <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">

<defs>
</defs>
<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
	<path d="M 78.045 37.212 c -0.264 -2.766 -0.939 -5.411 -1.963 -7.875 C 71.957 19.41 62.17 12.428 50.75 12.428 c -5.328 0 -10.3 1.52 -14.507 4.149 c -6.501 4.063 -11.176 10.777 -12.517 18.627 h -3.127 C 9.775 35.205 1 43.979 1 54.803 v 0 c 0 10.824 8.775 19.599 19.599 19.599 h 48.803 C 80.225 74.402 89 65.627 89 54.803 v 0 C 89 47.082 84.533 40.407 78.045 37.212 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(105,227,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 11.41 6.978 L 11.41 6.978 c 0.265 -0.11 0.285 -0.354 0.285 -0.427 c 0 -0.072 -0.02 -0.317 -0.285 -0.427 c -0.133 -0.055 -0.237 -0.159 -0.292 -0.292 s -0.055 -0.28 0 -0.413 l 0.352 -0.849 c 0.114 -0.275 0.43 -0.406 0.706 -0.292 c 0.265 0.11 0.452 -0.049 0.503 -0.1 c 0.051 -0.051 0.21 -0.239 0.1 -0.503 c -0.055 -0.133 -0.055 -0.28 0 -0.413 c 0.055 -0.133 0.159 -0.237 0.292 -0.292 l 0.849 -0.352 c 0.275 -0.114 0.591 0.017 0.706 0.292 c 0.11 0.264 0.354 0.285 0.427 0.285 c 0.072 0 0.317 -0.02 0.427 -0.285 c 0.055 -0.133 0.159 -0.237 0.292 -0.292 c 0.133 -0.055 0.28 -0.055 0.413 0 l 0.849 0.352 c 0.133 0.055 0.237 0.159 0.292 0.292 c 0.055 0.133 0.055 0.28 0 0.413 c -0.11 0.265 0.049 0.452 0.1 0.503 c 0.051 0.051 0.239 0.21 0.503 0.1 c 0.133 -0.055 0.28 -0.055 0.413 0 c 0.133 0.055 0.237 0.159 0.292 0.292 l 0.352 0.849 c 0.055 0.133 0.055 0.28 0 0.413 s -0.159 0.237 -0.292 0.292 c -0.264 0.11 -0.285 0.354 -0.285 0.427 s 0.021 0.317 0.285 0.427 c 0.275 0.114 0.406 0.431 0.292 0.706 l -0.352 0.849 c -0.055 0.133 -0.159 0.237 -0.292 0.292 c -0.133 0.055 -0.28 0.055 -0.413 0 c -0.264 -0.109 -0.452 0.049 -0.503 0.1 c -0.051 0.051 -0.21 0.239 -0.1 0.503 c 0.114 0.275 -0.017 0.592 -0.292 0.706 l -0.849 0.352 c -0.067 0.028 -0.137 0.041 -0.207 0.041 s -0.14 -0.014 -0.207 -0.041 c -0.133 -0.055 -0.237 -0.159 -0.292 -0.292 c -0.11 -0.265 -0.354 -0.285 -0.427 -0.285 l 0 0 c -0.072 0 -0.317 0.02 -0.427 0.285 c -0.114 0.275 -0.431 0.406 -0.706 0.292 l -0.849 -0.352 c -0.275 -0.114 -0.406 -0.431 -0.292 -0.706 c 0.11 -0.265 -0.049 -0.452 -0.1 -0.503 c -0.051 -0.051 -0.238 -0.21 -0.503 -0.1 C 11.9 8.938 11.584 8.807 11.47 8.532 l -0.352 -0.849 C 11.004 7.408 11.135 7.092 11.41 6.978 z M 15.053 8.042 c 0.822 0 1.491 -0.669 1.491 -1.491 S 15.875 5.06 15.053 5.06 c -0.822 0 -1.491 0.669 -1.491 1.491 S 14.231 8.042 15.053 8.042 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(249,249,249); fill-rule: nonzero; opacity: 1;" transform=" matrix(3.89 0 0 3.89 -1.9444444444444287 -1.9444444444444287) " stroke-linecap="round" />
	<path d="M 42.007 61.715 H 35.14 c -0.552 0 -1 -0.447 -1 -1 V 47.139 c 0 -0.553 0.448 -1 1 -1 h 6.867 c 0.552 0 1 0.447 1 1 s -0.448 1 -1 1 H 36.14 v 11.576 h 5.867 c 0.552 0 1 0.447 1 1 S 42.56 61.715 42.007 61.715 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 39.925 54.927 H 35.14 c -0.552 0 -1 -0.447 -1 -1 s 0.448 -1 1 -1 h 4.785 c 0.552 0 1 0.447 1 1 S 40.478 54.927 39.925 54.927 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 25.697 54.927 h -4.674 c -0.552 0 -1 -0.447 -1 -1 v -6.788 c 0 -0.553 0.448 -1 1 -1 h 4.674 c 1.983 0 3.596 1.613 3.596 3.596 v 1.597 C 29.293 53.313 27.68 54.927 25.697 54.927 z M 22.023 52.927 h 3.674 c 0.88 0 1.596 -0.716 1.596 -1.596 v -1.597 c 0 -0.88 -0.716 -1.596 -1.596 -1.596 h -3.674 V 52.927 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 28.293 61.715 c -0.552 0 -1 -0.447 -1 -1 v -4.192 c 0 -0.88 -0.716 -1.596 -1.596 -1.596 h -3.674 v 5.788 c 0 0.553 -0.448 1 -1 1 s -1 -0.447 -1 -1 v -6.788 c 0 -0.553 0.448 -1 1 -1 h 4.674 c 1.983 0 3.596 1.613 3.596 3.596 v 4.192 C 29.293 61.268 28.845 61.715 28.293 61.715 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 68.977 48.139 h -8.564 c -0.553 0 -1 -0.447 -1 -1 s 0.447 -1 1 -1 h 8.564 c 0.553 0 1 0.447 1 1 S 69.529 48.139 68.977 48.139 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 64.694 61.715 c -0.553 0 -1 -0.447 -1 -1 V 47.139 c 0 -0.553 0.447 -1 1 -1 s 1 0.447 1 1 v 13.576 C 65.694 61.268 65.247 61.715 64.694 61.715 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 51.715 61.715 h -1.259 c -2.064 0 -3.743 -1.632 -3.743 -3.638 c 0 -0.553 0.447 -1 1 -1 s 1 0.447 1 1 c 0 0.903 0.782 1.638 1.743 1.638 h 1.259 c 1.041 0 1.888 -0.797 1.888 -1.777 v -1.233 c 0 -0.98 -0.847 -1.777 -1.888 -1.777 h -1.113 c -2.145 0 -3.889 -1.694 -3.889 -3.777 v -1.233 c 0 -2.083 1.744 -3.777 3.889 -3.777 h 1.259 c 2.063 0 3.742 1.632 3.742 3.637 c 0 0.553 -0.447 1 -1 1 s -1 -0.447 -1 -1 c 0 -0.902 -0.781 -1.637 -1.742 -1.637 h -1.259 c -1.041 0 -1.889 0.797 -1.889 1.777 v 1.233 c 0 0.98 0.848 1.777 1.889 1.777 h 1.113 c 2.144 0 3.888 1.694 3.888 3.777 v 1.233 C 55.603 60.021 53.858 61.715 51.715 61.715 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 37.739 82.928 c -0.552 0 -1 -0.447 -1 -1 V 71.279 c 0 -1.063 -0.865 -1.928 -1.927 -1.928 h -2.572 c -1.063 0 -1.927 0.865 -1.927 1.928 v 10.648 c 0 0.553 -0.448 1 -1 1 s -1 -0.447 -1 -1 V 71.279 c 0 -2.166 1.762 -3.928 3.927 -3.928 h 2.572 c 2.166 0 3.927 1.762 3.927 3.928 v 10.648 C 38.739 82.48 38.291 82.928 37.739 82.928 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 37.739 76.14 h -8.427 c -0.552 0 -1 -0.447 -1 -1 s 0.448 -1 1 -1 h 8.427 c 0.552 0 1 0.447 1 1 S 38.291 76.14 37.739 76.14 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 58.991 82.928 c -0.553 0 -1 -0.447 -1 -1 V 68.352 c 0 -0.553 0.447 -1 1 -1 s 1 0.447 1 1 v 13.576 C 59.991 82.48 59.544 82.928 58.991 82.928 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 49.896 76.967 h -4.97 c -0.552 0 -1 -0.447 -1 -1 v -7.615 c 0 -0.553 0.448 -1 1 -1 h 4.97 c 2.01 0 3.645 1.636 3.645 3.646 v 2.324 C 53.54 75.331 51.905 76.967 49.896 76.967 z M 45.925 74.967 h 3.97 c 0.907 0 1.645 -0.738 1.645 -1.646 v -2.324 c 0 -0.907 -0.737 -1.646 -1.645 -1.646 h -3.97 V 74.967 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 44.925 82.928 c -0.552 0 -1 -0.447 -1 -1 v -5.961 c 0 -0.553 0.448 -1 1 -1 s 1 0.447 1 1 v 5.961 C 45.925 82.48 45.478 82.928 44.925 82.928 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 69.401 75.401 c -0.553 0 -1 -0.447 -1 -1 s 0.447 -1 1 -1 C 79.656 73.401 88 65.059 88 54.804 c 0 -7.14 -3.983 -13.537 -10.396 -16.694 c -0.312 -0.153 -0.521 -0.457 -0.554 -0.802 c -0.251 -2.616 -0.887 -5.168 -1.892 -7.587 c -0.212 -0.51 0.03 -1.095 0.54 -1.307 c 0.513 -0.212 1.096 0.03 1.308 0.54 c 1.01 2.433 1.674 4.991 1.977 7.614 C 85.793 40.145 90 47.081 90 54.803 C 90 66.161 80.76 75.401 69.401 75.401 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 20.599 75.401 C 9.241 75.401 0 66.161 0 54.804 c 0 -11.358 9.241 -20.599 20.599 -20.599 h 2.296 c 1.539 -7.625 6.174 -14.323 12.818 -18.475 c 0.468 -0.292 1.085 -0.149 1.378 0.318 c 0.292 0.468 0.15 1.085 -0.318 1.378 c -6.4 4 -10.796 10.542 -12.061 17.947 c -0.082 0.48 -0.499 0.832 -0.986 0.832 h -3.127 C 10.343 36.205 2 44.548 2 54.803 s 8.343 18.599 18.599 18.599 c 0.552 0 1 0.447 1 1 S 21.151 75.401 20.599 75.401 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 15.978 10.784 c -0.105 0 -0.208 -0.021 -0.305 -0.061 c -0.197 -0.081 -0.35 -0.235 -0.431 -0.431 c -0.043 -0.105 -0.127 -0.127 -0.189 -0.127 c -0.063 0 -0.146 0.022 -0.189 0.127 c -0.168 0.405 -0.635 0.599 -1.041 0.431 l -0.85 -0.352 c -0.406 -0.168 -0.599 -0.636 -0.431 -1.041 c 0.046 -0.11 -0.008 -0.187 -0.044 -0.223 c -0.045 -0.045 -0.12 -0.088 -0.224 -0.045 c -0.406 0.167 -0.873 -0.026 -1.042 -0.431 l -0.352 -0.849 c -0.168 -0.406 0.025 -0.873 0.431 -1.041 h 0 c 0.105 -0.043 0.127 -0.127 0.127 -0.189 c 0 -0.063 -0.022 -0.146 -0.126 -0.189 c -0.197 -0.081 -0.35 -0.235 -0.431 -0.431 c -0.082 -0.197 -0.082 -0.413 0 -0.61 l 0.352 -0.849 c 0.169 -0.406 0.636 -0.599 1.042 -0.431 c 0.105 0.043 0.179 0 0.223 -0.044 c 0.045 -0.045 0.088 -0.119 0.045 -0.224 c -0.081 -0.197 -0.081 -0.413 0 -0.61 c 0.082 -0.197 0.235 -0.35 0.431 -0.431 l 0.849 -0.352 c 0.406 -0.168 0.873 0.026 1.042 0.431 c 0.043 0.104 0.127 0.126 0.189 0.126 c 0.063 0 0.146 -0.022 0.189 -0.126 c 0.082 -0.197 0.235 -0.35 0.432 -0.432 c 0.197 -0.082 0.413 -0.081 0.61 0 l 0.849 0.352 c 0.197 0.082 0.35 0.235 0.432 0.431 c 0.082 0.197 0.082 0.414 0 0.61 c -0.043 0.104 0 0.179 0.044 0.223 c 0.045 0.045 0.119 0.088 0.223 0.045 c 0.197 -0.081 0.414 -0.081 0.61 0 c 0.197 0.082 0.35 0.235 0.432 0.432 l 0.351 0.849 c 0.082 0.197 0.082 0.413 0 0.61 c -0.082 0.197 -0.235 0.35 -0.432 0.432 c -0.104 0.043 -0.126 0.127 -0.126 0.189 c 0 0.062 0.022 0.146 0.127 0.189 c 0.197 0.081 0.35 0.235 0.431 0.432 c 0.082 0.197 0.082 0.413 0 0.61 l -0.352 0.849 c -0.081 0.197 -0.234 0.35 -0.431 0.431 c -0.197 0.081 -0.414 0.081 -0.61 0 c -0.105 -0.044 -0.179 0 -0.223 0.044 c -0.044 0.044 -0.088 0.119 -0.044 0.223 c 0.168 0.406 -0.025 0.873 -0.431 1.041 l -0.849 0.352 C 16.186 10.764 16.083 10.784 15.978 10.784 z M 15.053 9.651 c 0.232 0 0.529 0.117 0.664 0.444 c 0.029 0.07 0.083 0.124 0.153 0.153 c 0.07 0.029 0.147 0.029 0.217 0 l 0.849 -0.352 c 0.144 -0.06 0.213 -0.226 0.153 -0.37 c -0.136 -0.328 -0.008 -0.62 0.156 -0.784 c 0.164 -0.164 0.456 -0.291 0.783 -0.156 c 0.071 0.029 0.146 0.029 0.217 0 c 0.07 -0.029 0.124 -0.083 0.153 -0.153 l 0.352 -0.849 c 0.029 -0.07 0.029 -0.146 0 -0.216 c -0.029 -0.07 -0.083 -0.124 -0.153 -0.153 c -0.327 -0.136 -0.444 -0.432 -0.444 -0.664 c 0 -0.232 0.116 -0.529 0.444 -0.664 c 0.07 -0.029 0.124 -0.083 0.153 -0.153 c 0.029 -0.07 0.029 -0.147 0 -0.217 l -0.352 -0.849 c -0.029 -0.07 -0.083 -0.124 -0.153 -0.153 c -0.07 -0.029 -0.147 -0.029 -0.217 0 c -0.326 0.136 -0.619 0.009 -0.784 -0.156 c -0.164 -0.163 -0.291 -0.456 -0.155 -0.783 c 0.029 -0.07 0.029 -0.147 0 -0.217 c -0.029 -0.07 -0.083 -0.124 -0.153 -0.153 l -0.849 -0.352 c -0.071 -0.029 -0.146 -0.029 -0.217 0 c -0.07 0.029 -0.125 0.083 -0.153 0.153 c -0.135 0.327 -0.432 0.444 -0.664 0.444 s -0.529 -0.116 -0.664 -0.443 c -0.06 -0.144 -0.226 -0.213 -0.37 -0.153 L 13.17 3.206 c -0.07 0.029 -0.124 0.083 -0.153 0.153 c -0.029 0.07 -0.029 0.147 0 0.217 c 0.136 0.328 0.008 0.62 -0.157 0.784 c -0.163 0.164 -0.455 0.291 -0.783 0.155 c -0.144 -0.06 -0.31 0.009 -0.37 0.153 l -0.352 0.849 c -0.029 0.07 -0.029 0.147 0 0.216 c 0.029 0.07 0.083 0.125 0.153 0.153 c 0.328 0.136 0.444 0.432 0.444 0.665 c 0 0.232 -0.117 0.528 -0.444 0.664 L 11.41 6.978 l 0.098 0.237 c -0.144 0.06 -0.213 0.226 -0.153 0.37 l 0.352 0.849 c 0.06 0.144 0.227 0.213 0.37 0.153 c 0.327 -0.135 0.619 -0.008 0.783 0.156 c 0.164 0.163 0.292 0.455 0.156 0.783 c -0.06 0.144 0.009 0.31 0.153 0.37 l 0.849 0.352 c 0.144 0.06 0.31 -0.009 0.37 -0.153 C 14.524 9.768 14.82 9.651 15.053 9.651 z M 15.053 8.299 c -0.964 0 -1.748 -0.784 -1.748 -1.748 s 0.784 -1.748 1.748 -1.748 c 0.964 0 1.748 0.784 1.748 1.748 S 16.017 8.299 15.053 8.299 z M 15.053 5.317 c -0.681 0 -1.234 0.554 -1.234 1.234 s 0.554 1.234 1.234 1.234 c 0.68 0 1.234 -0.554 1.234 -1.234 S 15.733 5.317 15.053 5.317 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(3.89 0 0 3.89 -1.9444444444444287 -1.9444444444444287) " stroke-linecap="round" />
</g>
</svg>API RESTful - Plataforma de Gestión de Eventos

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
    "username": "nombredeusuario",
    "password": "contraseña"
}
```
- Respuestas:
  - `200 OK`: Usuario autenticado exitosamente. #Devuelve un token JWT#.
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
    "title": "string",
    "description": "string",
    "start_time": "2024-04-21T20:10:43.252Z",
    "end_time": "2024-04-21T20:10:43.252Z",
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
    "title": "string",
    "description": "string",
    "start_time": "2024-04-21T20:10:17.000Z",
    "end_time": "2024-04-21T20:10:17.000Z",
    "location": "string",
    "organizer_id": 0
}
```
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

## Esquemas de Datos
Para obtener información detallada sobre los esquemas de datos utilizados, consulta el archivo /src/config/swagger.yaml.
