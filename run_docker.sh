#!/bin/bash

clear

# Detener y eliminar todos los contenedores y redes existentes
echo "Deteniendo y eliminando servicios existentes..."
docker-compose down

# Construir la imagen de Docker
echo "Construyendo la imagen de Docker..."
docker build -t rt-coordinadora .

# Crear y levantar los servicios con Docker Compose
echo "Creando y levantando servicios..."
docker-compose up -d

# Listar los contenedores en ejecución
echo "Contenedores en ejecución:"
docker-compose ps
