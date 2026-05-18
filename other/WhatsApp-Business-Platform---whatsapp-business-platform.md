# Deploy WhatsApp Business Platform on Railway

Self-hosted WhatsApp messaging platform with campaign management

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whatsapp-business-platform)

## About

A self-hosted WhatsApp messaging platform built on Twilio's WhatsApp API. Send bulk campaigns, manage contacts, create message templates, and track delivery — all from a clean React dashboard. Includes an in-app setup wizard so non-technical users can connect Twilio without touching config files.

Hosting WhatsApp Business Platform requires a Node.js backend (Express + Prisma), a React dashboard served via Nginx, a PostgreSQL database for contacts/campaigns/templates, and a Redis instance for job queues and session management. The backend exposes a REST API and handles Twilio webhooks for message status callbacks. The dashboard is a single-page app that communicates with the backend API. All Twilio credentials (Account SID, Auth Token, WhatsApp number) are stored in the database and configurable through the UI — no environment variable editing needed after initial deploy. File uploads are persisted on the backend container's volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| whatsapp-business-deploy-7i7a | [Ankitgelda8/whatsapp-business-deploy](https://github.com/Ankitgelda8/whatsapp-business-deploy) (root: dashboard) | Worker |
| whatsapp-business-deploy | [Ankitgelda8/whatsapp-business-deploy](https://github.com/Ankitgelda8/whatsapp-business-deploy) (root: backend) | Worker |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `JWT_SECRET` | whatsapp-business-deploy-7i7a | (secret) | - |
| `ADMIN_EMAIL` | whatsapp-business-deploy-7i7a | admin@watsapp.local.com | - |
| `ADMIN_PASSWORD` | whatsapp-business-deploy-7i7a | (secret) | - |
| `JWT_SECRET` | whatsapp-business-deploy | (secret) | - |
| `ADMIN_EMAIL` | whatsapp-business-deploy | admin@wastapp.local.com | - |
| `ADMIN_PASSWORD` | whatsapp-business-deploy | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/whatsapp-business-platform)
