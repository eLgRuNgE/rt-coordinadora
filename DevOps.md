# Implementación de CI/CD con Jenkins

## Descripción

A continuación se describe la configuración de Jenkins para implementar un flujo de integración y despliegue continuo para la aplicación de gestión de eventos, utilizando contenedores Docker.

## Requisitos

- Servidor Jenkins operativo.
- Acceso al repositorio de código fuente.
- Acceso a servidores de staging y producción.
- Docker instalado en los servidores de staging (preproducción o entorno de pruebas) y producción.

## Configuración de Jenkins

### Instalación de Plugins

Se deben instalar los siguientes plugins en Jenkins:
- Docker Pipeline Plugin: para construir y desplegar contenedores Docker.
- Pipeline: para definir los pasos del flujo de CI/CD.

### Configuración del Repositorio

1. Se debe configurar un nuevo proyecto en Jenkins para la aplicación.
2. Conecte el proyecto al repositorio de código fuente.
3. Luego se especifica la ubicación del Dockerfile y el docker-compose en el repositorio.
    - Dockerfile (./Dockerfile): El archivo Dockerfile define la configuración necesaria para construir la imagen Docker de la aplicación. Este esta ubicado en la raíz del repositorio.
    - Docker-compose (./docjer-compose.yml): El archivo docker-compose describe los servicios necesarios para ejecutar la aplicación, como la configuración de contenedores, redes y volúmenes. Este esta ubicado en la raíz del repositorio.

### Pipelines

Cree un `Jenkinsfile` en el repositorio que defina los pasos del pipeline:

```groovy
pipeline {
    agent any
    stages {
        stage('Clonar Repositorio') {
            steps {
                git 'https://ruta-al-repositorio.git'
            }
        }
        stage('Construir Imagen Docker') {
            steps {
                script {
                    docker.build("dt-coordinadora:${env.BUILD_ID}")
                }
            }
        }
        stage('Desplegar a Staging') {
            steps {
                script {
                    docker.withRegistry('https://registry-url', 'credentials-id') {
                        docker.image("dt-coordinadora:${env.BUILD_ID}").push("latest")
                    }
                }
            }
        }
        stage('Desplegar a Producción') {
            steps {
                script {
                    docker.withRegistry('https://registry-url', 'credentials-id') {
                        docker.image("dt-coordinadora:${env.BUILD_ID}").push("production")
                    }
                }
            }
        }
    }
}
```

Posteriormente se configuran triggers para ejecutar el pipeline automáticamente con cada push al repositorio o de manera programada.

## Triggers

Los triggers en Jenkins son eventos que inician la ejecución de un pipeline. Para garantizar una integración continua, configuraremos Jenkins para que ejecute automáticamente el pipeline cada vez que haya un cambio en el repositorio de código o de manera programada.

### Configuración para Triggers con Push al Repositorio

1. En la configuración del proyecto Jenkins, vaya a la sección de "Configuración del Pipeline".
2. Seleccione "Pipeline script from SCM" como la definición del pipeline.
3. Elija el sistema de control de versiones utilizado (por ejemplo, Git).
4. Proporcione la URL del repositorio y configure las credenciales si es necesario.
5. En la sección de "Branches to build", seleccione la opción adecuada (por ejemplo, "All branches").
6. Guarde la configuración.

Con esta configuración, Jenkins ejecutará automáticamente el pipeline cada vez que se realice un push al repositorio de código.

### Configuración para Triggers Programados

1. En la configuración del proyecto Jenkins, vaya a la sección de "Configuración del Pipeline".
2. Seleccione "Pipeline script" como la definición del pipeline.
3. Agregue un cronograma en el campo de "Pipeline Triggers" utilizando la sintaxis cron. Por ejemplo, para ejecutar el pipeline todos los días a las 3 a.m., puede usar `0 3 * * *`.
4. Guarde la configuración.

Con esta configuración, Jenkins ejecutará automáticamente el pipeline según el cronograma especificado.

Luego se realizan despliegues en dos fases: primero a staging y después a producción con aprobación manual. Utilice el docker-compose para gestionar los despliegues en los servidores.

## Despliegues

Los despliegues en dos fases, primero a staging y luego a producción con aprobación manual, se pueden lograr utilizando Docker Compose para gestionar los despliegues en los servidores.

### Despliegue a Staging

1. Después de que el pipeline haya pasado las pruebas de integración y de unidad, se iniciará el despliegue a staging.
2. Utilizaremos Docker Compose para crear y levantar los contenedores necesarios en el entorno de staging.
3. Jenkins ejecutará un script que utilice Docker Compose para desplegar la aplicación en el entorno de staging.

### Despliegue a Producción con Aprobación Manual

1. Después de que la versión desplegada en staging haya sido probada y aprobada, se iniciará el despliegue a producción.
2. Jenkins ejecutará un script que solicitará la aprobación manual para iniciar el despliegue a producción.
3. Una vez aprobado, se utilizará Docker Compose para actualizar los contenedores en el entorno de producción con la nueva versión.

En caso de fallo, se debe implementar un proceso de rollback a la última versión segura utilizando la gestión de versiones de Docker:

## Rollback

En caso de fallo durante el despliegue o después de que se haya desplegado una nueva versión, es crucial implementar un proceso de rollback a la última versión segura utilizando la gestión de versiones de Docker.

### Proceso de Rollback

1. Identificar el fallo: Jenkins monitorea el estado del despliegue y detecta el fallo.
2. Revertir el despliegue: Jenkins ejecuta un script que utiliza Docker para revertir el despliegue a la última versión estable.
3. Notificación: Jenkins notifica al equipo de desarrollo y operaciones sobre el fallo y la acción de rollback.
4. Análisis del fallo: El equipo realiza un análisis de la causa raíz del fallo y toma medidas correctivas para evitar fallos similares en el futuro.

Con este proceso de rollback, se garantiza que cualquier fallo durante el despliegue pueda ser rápidamente corregido y que la aplicación pueda volver a un estado estable sin interrupción del servicio.


