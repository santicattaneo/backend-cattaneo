# Definir la imagen base
FROM node:16.17.1-alpine3.16

# Configuracion interna del contenedor
# Directorio de trabajo
WORKDIR /app

# Copiar package.json al contenedor
COPY package*.json ./

# Intalar las dependencias en el contenedor
RUN npm install

# Copiar el resto de archivos
COPY . .

# Desde el contenedor exponer el puerto para conectarme desde mi pc local
EXPOSE 3030

# Levantar la aplicacion
CMD ["npm","start"]