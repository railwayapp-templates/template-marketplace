# Deploy Kener on Railway

Stunning Status Pages, batteries included

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/spSvic)

## About

Kener is an open-source, modern status page application built with SvelteKit and Node.js. It provides real-time monitoring, uptime tracking, incident management, and beautiful customizable dashboards — perfect for teams needing reliable service status communication with minimal setup.

Kener runs as a single Node.js process in production that bundles a SvelteKit frontend, an Express API server, and a background cron scheduler for monitor checks. It requires a Redis instance for job queues (BullMQ) and supports SQLite (default), PostgreSQL, or MySQL as the database backend. Deploying Kener involves setting a few environment variables — a secret key, the public origin URL, and a Redis connection string — then starting the Docker container. Migrations and seeds run automatically on startup, so there is no manual database setup required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Kener | `rajnandan1/kener` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | Kener | UTC | Set the timezone for the server. Set it to UTC. |
| `ORIGIN` | Kener | - | Set this to the origin of your website(protocl + hostname + port if there). This is required for CORS. |
| `NODE_ENV` | Kener | production | - |
| `REDIS_URL` | Kener | - | Redis Server Full URL |
| `SMTP_USER` | Kener | (secret) | - |
| `SMTP_SECURE` | Kener | 0 | - |
| `DATABASE_URL` | Kener | - | Kener uses a database to store its data. By default, Kener uses sqlite. You can change the database by setting the DATABASE_URL environment variable. The connection string has to start with sqlite, postgresql, or mysql |
| `RESEND_API_KEY` | Kener | (secret) | [OPTIONAL] Kener uses resend.com to send emails. Please make sure to sign up in resend.com and get the API key. You will need to set the API key in the environment variable RESEND_API_KEY. |
| `KENER_SECRET_KEY` | Kener | (secret) | Please set a strong secret key for Kener to use for encrypting the data.  |
| `RESEND_SENDER_EMAIL` | Kener | - | [OPTIONAL] Set the sender email for the emails that are sent by Kener. This is required for sending emails. If you have not added a domain in resend, you can se something like Some Name <onboarding@resend.dev>. We recommend adding a domain in resend and using that email domain. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/spSvic)
