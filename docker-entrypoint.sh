#!/bin/sh
set -e

# Copy .env.example to .env if .env doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
fi

# Update environment variables in .env
update_env() {
    KEY=$1
    VALUE=$2
    if [ ! -z "$VALUE" ]; then
        echo "Setting $KEY to $VALUE..."
        # If key exists, update it
        if grep -q "^$KEY=" .env; then
            sed -i "s|^$KEY=.*|$KEY=$VALUE|" .env
        else
            # If key doesn't exist, add it
            echo "$KEY=$VALUE" >> .env
        fi
    fi
}

# Update common environment variables
update_env "APP_NAME" "$APP_NAME"
update_env "APP_ENV" "$APP_ENV"

# Normalize APP_URL
NORMALIZED_APP_URL="$APP_URL"

# Untuk production, convert HTTP ke HTTPS jika domain idcloudlabs.com
if [[ "$APP_ENV" != "local" ]] && [[ "$APP_ENV" != "development" ]] && [[ "$APP_URL" == http://idcloudlabs.com* ]]; then
    echo "Production: converting HTTP to HTTPS for idcloudlabs.com..."
    NORMALIZED_APP_URL=$(echo "$APP_URL" | sed 's|^http://|https://|')
fi

# Remove port dari HTTPS (nginx tidak perlu port)
if [[ "$NORMALIZED_APP_URL" == https://* ]]; then
    # Remove port dari HTTPS URL (e.g., https://domain.com:8080 -> https://domain.com)
    NORMALIZED_APP_URL=$(echo "$NORMALIZED_APP_URL" | sed -E 's|:([0-9]+)||')
    # Remove duplicate port jika ada
    NORMALIZED_APP_URL=$(echo "$NORMALIZED_APP_URL" | sed -E 's|(:[0-9]+):[0-9]+|\1|g')
fi

# Untuk development, convert HTTPS ke HTTP jika perlu
if [[ "$NORMALIZED_APP_URL" == https://* ]] && ([ "$APP_ENV" = "local" ] || [ "$APP_ENV" = "development" ]); then
    echo "Development: converting HTTPS to HTTP..."
    NORMALIZED_APP_URL=$(echo "$NORMALIZED_APP_URL" | sed 's|^https://|http://|')
fi

update_env "APP_URL" "$NORMALIZED_APP_URL"

update_env "DB_HOST" "$DB_HOST"
update_env "DB_PORT" "$DB_PORT"
update_env "DB_DATABASE" "$DB_DATABASE"
update_env "DB_USERNAME" "$DB_USERNAME"
update_env "DB_PASSWORD" "$DB_PASSWORD"

# Set maintenance mode
if [ ! -z "$MAINTENANCE" ]; then
    update_env "MAINTENANCE" "$MAINTENANCE"
fi

# Set ASSET_URL untuk HTTPS (wajib untuk mixed content)
if [[ "$NORMALIZED_APP_URL" == https://* ]]; then
    update_env "FORCE_HTTPS" "true"
    update_env "ASSET_URL" "$NORMALIZED_APP_URL"
fi

# Generate application key if not set
if ! grep -q "^APP_KEY=..*" .env; then
    echo "Generating application key..."
    php artisan key:generate --no-interaction --force
fi

# Create storage symlink if it doesn't exist
if [ ! -L public/storage ]; then
    echo "Creating storage symlink..."
    php artisan storage:link --force
fi

# Wait for database connection
echo "Waiting for database to be ready..."
max_tries=30
count=0
while [ $count -lt $max_tries ]; do
    if php artisan db:monitor > /dev/null 2>&1; then
        echo "Database connection successful!"
        break
    fi
    count=$((count + 1))
    echo "Waiting for database (attempt $count/$max_tries)..."
    sleep 3
done

if [ $count -eq $max_tries ]; then
    echo "Could not connect to database after $max_tries attempts."
    echo "Continuing with startup anyway..."
fi

# Run migrations
echo "Running database migrations..."
php artisan migrate --no-interaction --force

# Run seeders if in local environment
if [ "$APP_ENV" = "local" ]; then
    echo "Running database seeders..."
    php artisan db:seed --no-interaction --force
fi

# Clear cache to apply new environment settings
php artisan optimize:clear

# Start FrankenPHP
exec frankenphp run --config /etc/caddy/Caddyfile 