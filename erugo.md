# Deploy erugo on Railway

Self-hosted file-sharing platform with Laravel & Vue.js for file transfers.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/erugo)

## About

Erugo is a self-hosted file-sharing platform built with Laravel (PHP) and Vue.js. It provides a secure, private alternative to commercial file-sharing services, giving users full control over their data. The platform supports Docker deployment, making it ideal for Railway hosting.

### Tech Stack
- Backend: Laravel (PHP)
- Frontend: Vue.js
- Database: SQLite (default), MySQL, or PostgreSQL
- Authentication: JWT-based with optional OAuth
- Storage: Local filesystem or cloud (S3-compatible)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| erugo | `wardy784/erugo:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |
| `APP_ENV` | production |
| `APP_NAME` | Erugo |
| `APP_DEBUG` | false |
| `LOG_LEVEL` | warning |
| `CACHE_STORE` | database |
| `DB_DATABASE` | /var/www/html/storage/app/private/database.sqlite |
| `APP_TIMEZONE` | UTC |
| `DB_CONNECTION` | sqlite |
| `SESSION_DRIVER` | database |
| `QUEUE_CONNECTION` | database |
| `SESSION_SECURE_COOKIE` | true |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage`

**Category:** Storage

[View on Railway →](https://railway.com/template/erugo)
