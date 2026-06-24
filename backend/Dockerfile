# ─── Base : PHP 8.3 + FPM ──────────────────────────────────────────
FROM php:8.3-fpm-alpine

# Extensions PHP nécessaires pour Laravel
RUN apk add --no-cache \
        bash \
        curl \
        zip \
        unzip \
        git \
        libpng-dev \
        libzip-dev \
        oniguruma-dev \
    && docker-php-ext-install \
        pdo \
        pdo_mysql \
        mbstring \
        zip \
        gd \
        bcmath

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY composer*.json ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

COPY . .

RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage \
    && chmod -R 755 /var/www/bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
