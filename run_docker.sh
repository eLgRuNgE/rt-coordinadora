#!/bin/bash

# Detener todos los servicios primero (opcional)
echo "Deteniendo servicios existentes..."
docker-compose down

# Construir la imagen de Docker
echo "Construyendo la imagen de Docker..."
docker build -t rt-coordinadora .

# Iniciar los servicios con Docker Compose
echo "Iniciando servicios..."
docker-compose up -d

# Listar los contenedores en ejecución
echo "Contenedores en ejecución:"
docker-compose ps
