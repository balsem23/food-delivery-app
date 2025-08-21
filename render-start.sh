#!/usr/bin/env bash
set -e

# Ensure .env exists
if [ ! -f .env ]; then
  cp .env.example .env || true
fi

# Generate APP_KEY if missing
if ! grep -q "^APP_KEY=base64" .env; then
  php artisan key:generate --force
fi

# Clear & prepare caches / links
php artisan config:clear || true
php artisan storage:link || true

# Run migrations (safe to ignore if none)
php artisan migrate --force || true

# Cache for production
php artisan config:cache
php artisan route:cache || true

# Start PHP built-in server (ok for free demo)
php -d variables_order=EGPCS -S 0.0.0.0:${PORT:-8080} -t public
