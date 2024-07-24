FROM trafex/php-nginx:3.6.0

USER root

RUN apk update

RUN apk add php83-pdo_mysql

RUN mkdir /var/www/api

RUN chown -R nobody.nobody /var/www/api

COPY server.conf /etc/nginx/conf.d/default.conf

USER nobody

COPY src/ /var/www/api/
