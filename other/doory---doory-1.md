# Deploy doory on Railway

Open-source design editor with live collaboration and PostgreSQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/doory-1)

## About

Doory is an open-source browser-based design editor for creating, editing, and sharing visual designs. It combines a React single-page interface with a Django API, PostgreSQL-backed accounts and documents, and a dedicated WebSocket service for live co-editing. Railway runs the web gateway, application services, and database together with private service networking and persistent database storage.

Railway hosts Doory as Docker image services: nginx serves the browser UI, Django handles the API, a second Django process handles WebSockets, and PostgreSQL stores application data. The public web service is connected to the private backend services through Railway private networking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | `ghcr.io/shaongitbd/doory-frontend:sha-11fe071b0419ce604331a30fc5acbd2029b76ffc` | Web service |
| realtime | `ghcr.io/shaongitbd/doory-backend:sha-11fe071b0419ce604331a30fc5acbd2029b76ffc` | Worker |
| db | `postgres:16-alpine` | Database |
| api | `ghcr.io/shaongitbd/doory-backend:sha-11fe071b0419ce604331a30fc5acbd2029b76ffc` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `DJANGO_SECRET_KEY` | realtime | (secret) |
| `POSTGRES_USER` | db | (secret) |
| `POSTGRES_PASSWORD` | db | (secret) |
| `DJANGO_SECRET_KEY` | api | (secret) |

## Configuration

- **Start command:** `sh -c 'set -eu; mkdir -p /tmp/doory-nginx-templates; sed -e "s|doory-api:8000|$DOORY_API_HOST:8000|g" -e "s|doory-realtime:8001|$DOORY_REALTIME_HOST:8001|g" -e "s|doory-mcp:8002|127.0.0.1:8002|g" /etc/nginx/templates/default.conf.template > /tmp/doory-nginx-templates/default.conf.template; . /docker-entrypoint.d/05-dns-resolver.envsh; case "$NGINX_RESOLVER" in *:*) NGINX_RESOLVER="[$NGINX_RESOLVER]";; esac; export NGINX_RESOLVER; envsubst "\$NGINX_RESOLVER" < /tmp/doory-nginx-templates/default.conf.template > /etc/nginx/conf.d/default.conf; exec nginx -g "daemon off;"'`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `uvicorn doory.asgi:application --host 0.0.0.0 --port 8001 --workers 1 --ws auto --ws-max-size 2097152 --lifespan off --no-server-header --timeout-graceful-shutdown 20`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/doory-1)
