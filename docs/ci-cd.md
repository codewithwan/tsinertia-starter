# CI/CD

This repository ships with a complete GitHub Actions setup for Laravel, Inertia, React, and TypeScript.

## Workflows

- `linter`: PHP style, frontend formatting, ESLint, and TypeScript checks.
- `tests`: installs PHP and Node dependencies, builds assets, and runs the Laravel test suite.
- `security`: Composer validation, Composer audit, npm audit, and Gitleaks secret scanning.
- `dependency review`: blocks risky dependency changes in pull requests.
- `codeql`: GitHub code scanning for PHP and JavaScript/TypeScript.
- `deploy`: manual deployment over SSH.

## Required Deploy Secrets

Add these in GitHub under `Settings > Secrets and variables > Actions`.

- `SSH_HOST`: server hostname or IP.
- `SSH_PORT`: SSH port. Optional; defaults to `22`.
- `SSH_USER`: SSH user.
- `SSH_PRIVATE_KEY`: private key allowed to SSH into the server.
- `DEPLOY_PATH`: absolute path to the app on the server, for example `/var/www/tsinertia-starter`.

## Server Requirements

The server deploy path should already be a working clone of this repository and should have:

- PHP 8.4 or compatible PHP runtime.
- Composer.
- Node.js 22 and npm.
- Writable Laravel paths: `storage`, `bootstrap/cache`, and any upload directories.
- A valid production `.env` file.

## Manual Deploy Command

Use GitHub CLI from your local machine:

```bash
gh workflow run deploy.yml \
  --ref main \
  -f environment=production \
  -f branch=main \
  -f run_migrations=true \
  -f build_assets=true \
  -f maintenance_mode=false \
  -f restart_command="sudo systemctl reload php8.4-fpm"
```

For staging:

```bash
gh workflow run deploy.yml \
  --ref main \
  -f environment=staging \
  -f branch=develop \
  -f run_migrations=true \
  -f build_assets=true \
  -f maintenance_mode=true
```

## Remote Deploy Steps

The deploy workflow runs these commands on the server:

```bash
cd "$DEPLOY_PATH"
git fetch --prune origin "$DEPLOY_BRANCH"
git checkout "$DEPLOY_BRANCH"
git reset --hard "origin/$DEPLOY_BRANCH"
composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader
npm ci
npm run build
php artisan storage:link || true
php artisan optimize:clear
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
php artisan queue:restart || true
```

If `restart_command` is provided, it runs at the end.
