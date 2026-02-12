# Usamos una imagen ligera de Nginx
FROM nginx:alpine

# Copiamos el contenido de tu carpeta local al directorio de Nginx
# Si tus archivos están en una subcarpeta (ej. 'public'), cambia '.' por './public'
COPY . /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80
