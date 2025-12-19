#!/bin/sh
set -e

# ============================================================================
# Helper Functions
# ============================================================================

update_env() {
    local key=$1
    local value=$2
    
    if [ -z "$value" ]; then
        return
    fi
    
    if grep -q "^$key=" .env 2>/dev/null; then
        sed -i "s|^$key=.*|$key=$value|" .env
    else
        echo "$key=$value" >> .env
    fi
}

normalize_app_url() {
    local url="$1"
    local env="$2"
    
    # Convert HTTP to HTTPS for production
    if [ "$env" != "local" ] && [ "$env" != "development" ]; then
        if echo "$url" | grep -q "^http://"; then
            url=$(echo "$url" | sed 's|^http://|https://|')
        fi
    fi
    
    # Remove port from HTTPS URLs
    if echo "$url" | grep -q "^https://"; then
        url=$(echo "$url" | sed -E 's|:([0-9]+)||')
    fi
    
    # Convert HTTPS to HTTP for development
    if [ "$env" = "local" ] || [ "$env" = "development" ]; then
        if echo "$url" | grep -q "^https://"; then
            url=$(echo "$url" | sed 's|^https://|http://|')
        fi
    fi
    
    echo "$url"
}

wait_for_database() {
    local max_tries=30
    local count=0
    
    echo "Waiting for database to be ready..."
    
    while [ $count -lt $max_tries ]; do
        if php artisan db:monitor > /dev/null 2>&1; then
            echo "✓ Database connection successful!"
            return 0
        fi
        
        count=$((count + 1))
        echo "  Attempt $count/$max_tries..."
        sleep 2
    done
    
    echo "⚠ Could not connect to database after $max_tries attempts."
    echo "  Continuing with startup anyway..."
    return 1
}

# ============================================================================
# Environment Setup
# ============================================================================

if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
fi

# Only update APP_URL if provided (important for HTTPS normalization)
# Other values should be set directly in .env file
if [ -n "$APP_URL" ]; then
    APP_ENV_VALUE=$(grep "^APP_ENV=" .env 2>/dev/null | cut -d '=' -f2 || echo "production")
    NORMALIZED_URL=$(normalize_app_url "$APP_URL" "$APP_ENV_VALUE")
    update_env "APP_URL" "$NORMALIZED_URL"
    
    # Set HTTPS-related configs if using HTTPS
    if echo "$NORMALIZED_URL" | grep -q "^https://"; then
        update_env "FORCE_HTTPS" "true"
        update_env "ASSET_URL" "$NORMALIZED_URL"
    fi
fi

# ============================================================================
# Laravel Setup
# ============================================================================

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

# ============================================================================
# Database Setup
# ============================================================================

wait_for_database

echo "Running database migrations..."
php artisan migrate --no-interaction --force

# Run seeders only in local environment
if [ "$APP_ENV" = "local" ]; then
    echo "Running database seeders..."
    php artisan db:seed --no-interaction --force
fi

# ============================================================================
# Cache Optimization
# ============================================================================

echo "Clearing application cache..."
php artisan optimize:clear

# ============================================================================
# Start Application
# ============================================================================

echo "Starting FrankenPHP..."
exec frankenphp run --config /etc/caddy/Caddyfile
