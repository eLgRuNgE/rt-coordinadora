# Dockerfile

# Utiliza una imagen base de Node.js v lts-alpine3.19
FROM node:20.12.2-alpine3.19

# Crea el directorio de trabajo para la aplicación
WORKDIR /usr/src/app

# Copia los archivos de definición de dependencias primero para aprovechar la cache de Docker
COPY package*.json ./

# Instala las dependencias de Node.js
RUN npm install

# Copia el resto del código fuente de la aplicación
COPY . .

# Se expone el puerto que tu app utiliza
EXPOSE 3000

# Ejecuto el comando para correr la app
CMD [ "node", "app.js" ]
