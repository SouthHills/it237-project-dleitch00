FROM php:8.2-apache
COPY WebApplication/ /var/www/html/
RUN apt-get update && apt-get install -y 
RUN docker-php-ext-install mysqli
RUN docker-php-ext-enable mysqli
EXPOSE 3000
