# Deploy Symfony on Railway

A simple Symfony app that is connected to a Postgres database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/4tnH_D)

## About

# Symfony Starter App

This is a [Symfony](https://symfony.com) starter app that connects to a Postgres database.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/4tnH_D)

## ✨ Features

- PHP
- Symfony
- Postgres

This setup deploys your Symfony app on Railway, ensuring that your database, scheduled tasks (crons), and queue workers are all fully operational.

The deployment structure follows a "majestic monolith" architecture, where the entire Symfony app is managed as a single codebase but split into four separate services on Railway:
- **App Service**: Handles HTTP requests and user interactions.
- **Cron Service**: Manages scheduled tasks (e.g., sending emails or running reports).
- **Worker Service**: Processes background jobs from the queue.
- **Database Service**: Stores and retrieves your application's data.

![Symfony architecture](https://res.cloudinary.com/railway/image/upload/f_auto,q_auto/v1731432227/docs/quick-start/symfony_architecture.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Worker Service | [railwayapp-templates/symfony](https://github.com/railwayapp-templates/symfony) | Worker |
| Cron Service | [railwayapp-templates/symfony](https://github.com/railwayapp-templates/symfony) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| App Service | [railwayapp-templates/symfony](https://github.com/railwayapp-templates/symfony) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_ENV` | Worker Service | prod | - |
| `APP_DEBUG` | Worker Service | false | - |
| `APP_SECRET` | Worker Service | (secret) | - |
| `COMPOSER_ALLOW_SUPERUSER` | Worker Service | 1 | - |
| `APP_ENV` | Cron Service | prod | - |
| `APP_DEBUG` | Cron Service | false | - |
| `APP_SECRET` | Cron Service | (secret) | - |
| `COMPOSER_ALLOW_SUPERUSER` | Cron Service | 1 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `APP_ENV` | App Service | prod | - |
| `APP_DEBUG` | App Service | true | - |
| `APP_SECRET` | App Service | (secret) | - |
| `COMPOSER_ALLOW_SUPERUSER` | App Service | 1 | - |

## Configuration

- **Start command:** `sh ./run-worker.sh`
- **Start command:** `sh ./run-cron.sh`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh ./run-app.sh`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** PHP, Shell, JavaScript, Twig, CSS

[View on Railway →](https://railway.com/template/4tnH_D)
