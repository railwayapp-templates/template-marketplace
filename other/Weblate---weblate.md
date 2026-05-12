# Deploy Weblate on Railway

Self-hosted translation platform with Git integration.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/weblate)

## About

Weblate is a free, open source web-based localisation platform with tight version control integration. It lets your community translate your project directly in the browser, with changes committed back to your repository automatically.

Hosting Weblate requires three services running together: the Weblate application itself, a PostgreSQL database, and a Redis instance for caching and background task queuing. The application is distributed as a Docker image and is configured entirely through environment variables. A persistent volume is needed to store repository data and uploaded files across deployments. This template provisions all three services and wires them together, so you can get a production-ready localisation platform running in minutes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Weblate | `ghcr.io/eggsleggs/weblate-railway` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Weblate | 8080 | Port Weblate listens on — Railway uses this to route traffic |
| `REDIS_HOST` | Weblate | - | Hostname of the Redis instance |
| `REDIS_PORT` | Weblate | - | Port the Redis instance is listening on |
| `POSTGRES_HOST` | Weblate | - | Hostname of the Postgres instance |
| `POSTGRES_PORT` | Weblate | - | Port the Postgres instance is listening on |
| `POSTGRES_USER` | Weblate | (secret) | Postgres user Weblate will authenticate as |
| `REDIS_PASSWORD` | Weblate | (secret) | Password for the Redis instance |
| `POSTGRES_DATABASE` | Weblate | - | Name of the database Weblate will use |
| `POSTGRES_PASSWORD` | Weblate | (secret) | Password for the Postgres user |
| `WEBLATE_ADMIN_NAME` | Weblate | - | Display name for the auto-created admin account |
| `WEBLATE_EMAIL_HOST` | Weblate | - | SMTP hostname for outbound email |
| `WEBLATE_SECRET_KEY` | Weblate | (secret) | Django secret key used to sign cookies and sessions — generate with: python3 -c "import secrets; print(secrets.token_urlsafe(50))" |
| `WEBLATE_ADMIN_EMAIL` | Weblate | - | Email address for the auto-created admin account |
| `WEBLATE_SITE_DOMAIN` | Weblate | - | Public hostname used to generate links in emails and the UI |
| `WEBLATE_SERVER_EMAIL` | Weblate | - | From address for system emails |
| `WEBLATE_ALLOWED_HOSTS` | Weblate | - | Hostnames Django will accept requests from |
| `WEBLATE_EMAIL_USE_TLS` | Weblate | 1 | Enables TLS for SMTP connections |
| `WEBLATE_ADMIN_PASSWORD` | Weblate | (secret) | Password for the auto-created admin account |
| `WEBLATE_EMAIL_HOST_USER` | Weblate | (secret) | SMTP username or API key identifier |
| `WEBLATE_DEFAULT_FROM_EMAIL` | Weblate | - | From address for notification emails sent to users |
| `WEBLATE_EMAIL_HOST_PASSWORD` | Weblate | (secret) | SMTP password or API key |
| `WEBLATE_IP_BEHIND_REVERSE_PROXY` | Weblate | 1 | Enables correct client IP detection behind Railway's proxy layer |
| `WEBLATE_SECURE_PROXY_SSL_HEADER` | Weblate | HTTP_X_FORWARDED_PROTO,https | Tells Weblate it's behind an HTTPS reverse proxy — prevents redirect loops on Railway |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Healthcheck:** `/healthz/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/weblate)
