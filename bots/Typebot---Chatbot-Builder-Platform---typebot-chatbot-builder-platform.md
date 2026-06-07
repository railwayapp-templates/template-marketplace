# Deploy Typebot - Chatbot Builder Platform on Railway

Self-hosted advanced chatbot with Postgres, Redis & S3 Bucket.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typebot-chatbot-builder-platform)

## About

Typebot is an open-source chatbot and conversational experience builder that enables teams to create interactive forms, AI agents, customer support flows, lead generation funnels, and automated workflows through a visual drag-and-drop interface. It supports integrations with APIs, databases, LLMs, webhooks, and third-party services while providing full control through self-hosting.

Hosting Typebot on Railway provides a fully managed environment for running both the Typebot Builder and Viewer applications. This template deploys the official Typebot Docker images alongside PostgreSQL, Redis, and Railway Object Storage (Buckets) to create a production-ready conversational platform.

The Builder application is used to create and manage chatbots, while the Viewer application serves chatbot experiences to end users. PostgreSQL stores application data, Redis handles caching and background processes, and Railway Buckets provide object storage for uploads and media assets. Railway manages networking, environment variables, deployments, and scaling, allowing teams to focus on building chatbot experiences instead of maintaining infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| Builder | `baptistearno/typebot-builder:latest` | Web service |
| Viewer | `baptistearno/typebot-viewer:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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
| `PORT` | Builder | 3000 | - |
| `SCOPE` | Builder | builder | - |
| `S3_PORT` | Builder | 443 | - |
| `HOSTNAME` | Builder | 0.0.0.0 | - |
| `SMTP_HOST` | Builder | smtp.gmail.com | - |
| `SMTP_PORT` | Builder | 587 | - |
| `SMTP_SECURE` | Builder | true | - |
| `S3_SECRET_KEY` | Builder | (secret) | - |
| `SMTP_PASSWORD` | Builder | (secret) | - |
| `SMTP_USERNAME` | Builder | (secret) | - |
| `DISABLE_SIGNUP` | Builder | false | - |
| `ENCRYPTION_SECRET` | Builder | (secret) | - |
| `SMTP_AUTH_DISABLED` | Builder | false | - |
| `DEFAULT_WORKSPACE_PLAN` | Builder | UNLIMITED | - |
| `NEXT_PUBLIC_BOT_FILE_UPLOAD_MAX_SIZE` | Builder | 10 | - |
| `PORT` | Viewer | 3000 | - |
| `SCOPE` | Viewer | viewer | - |
| `S3_PORT` | Viewer | 443 | - |
| `HOSTNAME` | Viewer | 0.0.0.0 | - |
| `S3_SECRET_KEY` | Viewer | (secret) | - |
| `SMTP_PASSWORD` | Viewer | (secret) | - |
| `SMTP_USERNAME` | Viewer | (secret) | - |
| `ENCRYPTION_SECRET` | Viewer | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots

[View on Railway →](https://railway.com/deploy/typebot-chatbot-builder-platform)
