# Deploy CISO Assistant on Railway

The one-stop-shop GRC platform. (Community Edition)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ciso-assistant)

## About

__CISO Assistant__ is an open-source GRC platform by __Intuitem__ that unifies Risk Management, AppSec, Compliance & Audit, Third-Party Risk, Business Impact Analysis, Privacy, and Reporting. It ships with 150+ global frameworks and automatic control mapping, including ISO 27001, NIST CSF, SOC 2, CIS, PCI DSS, NIS2, DORA, GDPR, HIPAA, and CMMC.

CISO Assistant is a multi-service application. It runs a Django REST API backend, a Huey background worker for asynchronous jobs (emails, scheduled tasks, computations), a SvelteKit frontend served by a Node adapter, a PostgreSQL database, and a Qdrant vector database that powers the AI/semantic-search features. A Caddy reverse proxy fronts the stack and terminates traffic. Hosting involves wiring these services together over a private network, providing a persistent volume for uploaded attachments and the Huey queue, keeping the Django secret key stable across redeploys, and setting a handful of URL/origin environment variables so the frontend, backend, and browser all agree on the public address.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| CISO Assistant Backend | `ghcr.io/intuitem/ciso-assistant-community/backend:latest` | Database |
| CISO Assistant Frontend | `ghcr.io/intuitem/ciso-assistant-community/frontend:latest` | Worker |
| Qdrant | `qdrant/qdrant:v1.14.0` | Database |
| Caddy | `caddy:2.11.4` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `HOME` | CISO Assistant Backend | /tmp | - |
| `PORT` | CISO Assistant Backend | 8000 | - |
| `ALLOWED_HOSTS` | CISO Assistant Backend | * | - |
| `POSTGRES_USER` | CISO Assistant Backend | (secret) | - |
| `XDG_DATA_HOME` | CISO Assistant Backend | /tmp/.local/share | - |
| `AUTH_TOKEN_TTL` | CISO Assistant Backend | (secret) | - |
| `HUEY_FILE_PATH` | CISO Assistant Backend | /code/db/huey.db | - |
| `XDG_CACHE_HOME` | CISO Assistant Backend | /tmp/.cache | - |
| `XDG_CONFIG_HOME` | CISO Assistant Backend | /tmp/.config | - |
| `DJANGO_SECRET_KEY` | CISO Assistant Backend | (secret) | - |
| `POSTGRES_PASSWORD` | CISO Assistant Backend | (secret) | - |
| `DJANGO_SUPERUSER_EMAIL` | CISO Assistant Backend | - | Default admin email (used for login) |
| `LOCAL_STORAGE_DIRECTORY` | CISO Assistant Backend | /code/db/attachments | - |
| `DJANGO_SUPERUSER_PASSWORD` | CISO Assistant Backend | (secret) | Default admin password (used for login) |
| `PORT` | CISO Assistant Frontend | 3000 | - |
| `HOST_HEADER` | CISO Assistant Frontend | x-forwarded-host | - |
| `PROTOCOL_HEADER` | CISO Assistant Frontend | x-forwarded-proto | - |
| `PORT` | Qdrant | 6333 | - |
| `PORT` | Caddy | 8080 | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "python manage.py run_huey -w 2 --scheduler-interval 60 & exec uv run bash startup.sh"`
- **Healthcheck:** `/api/health/`
- **Volume:** `/code/db`
- **Healthcheck:** `/`
- **Volume:** `/qdrant/storage`
- **Start command:** `sh -c 'printf "{\n  auto_https off\n}\n\n:{\$PORT:8080} {\n  reverse_proxy /api/* %s\n  reverse_proxy /* %s\n}\n" "$BACKEND_URL" "$FRONTEND_URL" > Caddyfile && caddy run'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/caddy`

**Category:** Other

[View on Railway →](https://railway.com/deploy/ciso-assistant)
