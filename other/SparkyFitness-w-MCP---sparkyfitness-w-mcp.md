# Deploy SparkyFitness (w/ MCP) on Railway

MyFitnessPal style tracker: calories, workouts, water, weight, AI and MCP

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sparkyfitness-w-mcp)

## About

SparkyFitness is a self-hosted fitness and nutrition tracker in the spirit of
MyFitnessPal. Log food with barcode and photo recognition, track workouts,
water intake, body measurements and progress photos, set goals, and chat with
Sparky, its built-in AI assistant. Version 1.6 also ships an MCP endpoint, so
AI assistants like Claude can read and write your fitness data with your
permission.

This template deploys the current SparkyFitness release (v1.6.1) as three
services: a Postgres 18 database, the API server, and the web app served by
nginx. Both the database and the server get persistent volumes, so your data,
uploaded photos and in-app backups survive redeploys. All secrets (database
passwords, session signing key, data encryption key) are generated for you at
deploy time, including the 64 character hex encryption key the server
requires. The web app proxies API traffic to the server over Railway's edge,
which keeps the app reachable across server redeploys with zero configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sparkyfitness-db | `postgres:18.3-alpine` | Database |
| sparkyfitness | `codewithcj/sparkyfitness:v1.6.1` | Web service |
| sparkyfitness-server | `codewithcj/sparkyfitness_server:v1.6.1` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | sparkyfitness-db | sparkyfitness_db | - |
| `POSTGRES_USER` | sparkyfitness-db | (secret) | - |
| `POSTGRES_PASSWORD` | sparkyfitness-db | (secret) | - |
| `PORT` | sparkyfitness | 80 | - |
| `NGINX_LISTEN_PORT` | sparkyfitness | 80; listen [::]:80 | - |
| `SPARKY_FITNESS_SERVER_PORT` | sparkyfitness | 443 | - |
| `TZ` | sparkyfitness-server | Etc/UTC | - |
| `PORT` | sparkyfitness-server | 3010 | - |
| `NODE_ENV` | sparkyfitness-server | production | - |
| `BETTER_AUTH_SECRET` | sparkyfitness-server | (secret) | Signs sessions and encrypts 2FA. Never change after users enable 2FA. |
| `SPARKY_FITNESS_DB_PORT` | sparkyfitness-server | 5432 | - |
| `SPARKY_FITNESS_DB_USER` | sparkyfitness-server | (secret) | - |
| `SPARKY_FITNESS_LOG_LEVEL` | sparkyfitness-server | INFO | - |
| `SPARKY_FITNESS_ADMIN_EMAIL` | sparkyfitness-server | - | Optional. Sign up with this email and that account becomes admin on next server start. |
| `SPARKY_FITNESS_APP_DB_USER` | sparkyfitness-server | (secret) | - |
| `SPARKY_FITNESS_DB_PASSWORD` | sparkyfitness-server | (secret) | - |
| `SPARKY_FITNESS_SERVER_PORT` | sparkyfitness-server | 3010 | - |
| `SPARKY_FITNESS_APP_DB_PASSWORD` | sparkyfitness-server | (secret) | - |
| `SPARKY_FITNESS_FORCE_EMAIL_LOGIN` | sparkyfitness-server | (secret) | - |
| `SPARKY_FITNESS_API_ENCRYPTION_KEY` | sparkyfitness-server | - | 64 hex chars. Encrypts stored third-party API credentials. |
| `SPARKY_FITNESS_CUSTOM_BACKUP_DIRECTORY` | sparkyfitness-server | /data/backup | - |
| `SPARKY_FITNESS_CUSTOM_UPLOADS_DIRECTORY` | sparkyfitness-server | /data/uploads | - |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Start command:** `sh -c 'sed -i "s#proxy_pass http://\${SPARKY_FITNESS_SERVER_HOST}:\${SPARKY_FITNESS_SERVER_PORT}#proxy_ssl_server_name on; proxy_ssl_name \${SPARKY_FITNESS_SERVER_HOST}; proxy_pass https://\${SPARKY_FITNESS_SERVER_HOST}:\${SPARKY_FITNESS_SERVER_PORT}#g; s#proxy_set_header Host \$host;#proxy_set_header Host \${SPARKY_FITNESS_SERVER_HOST}; proxy_set_header X-Forwarded-Host \$host;#g; s#proxy_set_header X-Forwarded-Proto \$scheme;#proxy_set_header X-Forwarded-Proto https;#g" /etc/nginx/templates/default.conf.template && exec /docker-entrypoint.sh'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/api/health`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/sparkyfitness-w-mcp)
