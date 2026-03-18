# Deploy Monica Personal CRM on Railway

Deploy an instance of Monica, a personal CRM for keeping track of things.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/monica-personal-crm)

## About

Deploy https://github.com/monicahq/monica as your personal CRM

One-click deploy of a small POC instance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| db | `mariadb:11` | Database |
| app | [Antvirf/monica-on-railway](https://github.com/Antvirf/monica-on-railway) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MYSQL_USER` | db | (secret) |
| `MYSQL_DATABASE` | db | monica |
| `MYSQL_PASSWORD` | db | (secret) |
| `MYSQL_RANDOM_ROOT_PASSWORD` | db | (secret) |
| `APP_ENV` | app | production |
| `DB_HOST` | app | db |
| `DB_DATABASE` | app | monica |
| `DB_PASSWORD` | app | (secret) |
| `DB_USERNAME` | app | (secret) |
| `FORCE_HTTPS` | app | false |
| `LOG_CHANNEL` | app | stderr |
| `CACHE_DRIVER` | app | database |
| `QUEUE_DRIVER` | app | sync |
| `SESSION_DRIVER` | app | database |
| `APP_FORCE_HTTPS` | app | false |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/monica-personal-crm)
