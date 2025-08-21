# Lightweight PHP
FROM php:8.2-cli-alpine

# System deps
RUN apk add --no-cache git unzip libzip-dev icu-dev bash oniguruma-dev libpq-dev

# PHP extensions
RUN docker-php-ext-install pdo pdo_pgsql bcmath intl

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Install PHP deps first (cache-friendly)
COPY composer.json composer.lock* ./
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --no-scripts

# Bring code
COPY . .

# Start script
RUN chmod +x render-start.sh

# Render sets $PORT; default fallback
ENV PORT=8080
EXPOSE 8080

CMD ["bash", "render-start.sh"]
