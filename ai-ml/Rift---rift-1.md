# Deploy Rift on Railway

Rift Is the fastest OSS AI Chat

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rift-1)

## About

Rift is a AI Chat app for teams. It gives teams one place to chat with every AI model, work with files, organize conversations, and manage access inside a shared workspace. It supports major AI providers, native model tools, and Zero Data Retention controls for providers

Hosting Rift on Railway gives you a simple way to run the full Rift stack in one place. This template includes the main web app, database, Redis, Qdrant, storage bucket, and Zero, so the main infrastructure is already set up for you.
After deployment, you mainly need to provide a setup token so the first user can claim the instance and create the first admin account, plus an API key for model access. 

Self-hosting Rift on Railway is a good fit for teams that want more control over their data, privacy settings, provider configuration, and overall environment without having to hasle every service manually.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Rift | [Compound-inc/rift](https://github.com/Compound-inc/rift) | Web service |
| Zero | `rocicorp/zero:1.2.0` | Web service |
| Redis | `redis:8.2.1` | Database |
| qdrant | `qdrant/qdrant:dev` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `AI_GATEWAY_API_KEY` | Rift | (secret) | Enter your personal Vercel AI Gateway Key for AI usage |
| `BETTER_AUTH_SECRET` | Rift | (secret) | - |
| `S3_SECRET_ACCESS_KEY` | Rift | (secret) | - |
| `VITE_SELF_HOST_SOURCE` | Rift | Railway | - |
| `VITE_APP_INSTANCE_MODE` | Rift | self_hosted | - |
| `SELF_HOSTED_SETUP_TOKEN` | Rift | (secret) | Create a password; you will require it on sign-up. |
| `UPLOAD_STORAGE_PROVIDER` | Rift | s3_compatible | - |
| `ZERO_QUERY_FORWARD_COOKIES` | Rift | true | - |
| `ZERO_MUTATE_FORWARD_COOKIES` | Rift | true | - |
| `PORT` | Zero | 4848 | - |
| `ZERO_PORT` | Zero | 4848 | - |
| `ZERO_ADMIN_PASSWORD` | Zero | (secret) | - |
| `ZERO_QUERY_FORWARD_COOKIES` | Zero | true | - |
| `ZERO_MUTATE_FORWARD_COOKIES` | Zero | true | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `PORT` | qdrant | 6333 | - |
| `QDRANT__SERVICE__API_KEY
` | qdrant | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `bun run start`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/zero-data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/qdrant/storage`

**Category:** AI/ML · **Languages:** TypeScript, MDX, PLpgSQL, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/rift-1)
