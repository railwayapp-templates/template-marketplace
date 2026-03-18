# Deploy Symfony 7.3 on Railway

An up-to-date Symfony installation. Includes app, worker and database.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/symfony-73)

## About

Symfony is a PHP framework for web and console applications and a set of reusable PHP components.

This template makes it very easy to deploy Symfony. It includes an app service, a worker service and a Postgres database.

After you deploy the template, you can open the public URL of your **railway-app** service and add /health in your browser. This endpoint should show that the status is up. Now you are free to add your own pages, API routes, scheduled tasks, commands and business logic. Happy coding!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| symfony-worker | [raphaelflash/symfony-railway](https://github.com/raphaelflash/symfony-railway) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17.6` | Database |
| symfony-app | [raphaelflash/symfony-railway](https://github.com/raphaelflash/symfony-railway) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `APP_ENV` | symfony-worker | prod |
| `RAILPACK_PHP_ROOT_DIR` | symfony-worker | /app/public |
| `RAILPACK_PHP_EXTENSIONS` | symfony-worker | intl,opcache,gd,pdo_pgsql,mbstring,redis |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `APP_ENV` | symfony-app | prod |
| `RAILPACK_PHP_ROOT_DIR` | symfony-app | /app/public |
| `RAILPACK_PHP_EXTENSIONS` | symfony-app | intl,opcache,gd,pdo_pgsql,mbstring,redis |

## Configuration

- **Start command:** `php bin/console messenger:consume`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** PHP

[View on Railway →](https://railway.com/template/symfony-73)
