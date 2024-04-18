# Dockerfile

# Utiliza una imagen base de Node.js v lts-alpine3.19
FROM node:20.12.2-alpine3.18

# Crea el directorio de trabajo para la aplicación
WORKDIR /Users/fabiancallejas/DevelopmentLocal-MBP_XVII/PruebasTécnicas/Coordinadora/rt-coordinadora

# Instala las dependencias de la aplicación
COPY package*.json ./

# Instala las dependencias de Node.js
RUN npm install

# Bundle app source
COPY . .

# Expone el puerto que tu app utiliza
EXPOSE 3000

# Define el comando para correr la app
CMD [ "node", "app.js" ]
