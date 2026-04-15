# Deploy Rift on Railway

Rift Its a OSS AI Chat for teams

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
| Zero | `rocicorp/zero:1.3.0` | Web service |
| Redis | `redis:8.2.1` | Database |
| qdrant | `qdrant/qdrant:dev` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `REDIS_URL` | Rift | - | Redis URL for Rate Limiting |
| `S3_REGION` | Rift | - | S3 Bucket Region |
| `S3_ENDPOINT` | Rift | - | S3 Bucket Endpoint |
| `S3_BUCKET_NAME` | Rift | - | S3 Bucket Name |
| `ZERO_QUERY_URL` | Rift | - | URL for Zero Query Transactions |
| `BETTER_AUTH_URL` | Rift | - | Deployment URL used for Auth |
| `ZERO_MUTATE_URL` | Rift | - | URL for Zero Client Mutate Transactions |
| `S3_ACCESS_KEY_ID` | Rift | - | S3 Bucket Access Key |
| `ZERO_UPSTREAM_DB` | Rift | - | URL for the main Postgres DB |
| `AI_GATEWAY_API_KEY` | Rift | (secret) | Enter your personal Vercel AI Gateway Key for AI usage |
| `BETTER_AUTH_SECRET` | Rift | (secret) | Secret used for cookie security |
| `VITE_ZERO_CACHE_URL` | Rift | - | Zero Service Public URL |
| `S3_SECRET_ACCESS_KEY` | Rift | (secret) | S3 Bucket Secret Key for accessing the data |
| `VITE_BETTER_AUTH_URL` | Rift | - | Deployment URL used for Auth |
| `VITE_SELF_HOST_SOURCE` | Rift | Railway | Used to know the self-hosting setup process |
| `VITE_APP_INSTANCE_MODE` | Rift | self_hosted | Change the behavior the app to work with self hosting enviroments |
| `SELF_HOSTED_SETUP_TOKEN` | Rift | (secret) | Create a password; you will require it on sign-up. |
| `UPLOAD_STORAGE_PROVIDER` | Rift | s3_compatible | Changes the bucket service used |
| `ZERO_QUERY_FORWARD_COOKIES` | Rift | true | Allow Zero to foward the user cookies to the backend |
| `ZERO_MUTATE_FORWARD_COOKIES` | Rift | true | Allow Zero to foward the user cookies to the backend |
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

- **Start command:** `docker-entrypoint.sh postgres -c wal_level=logical`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `bun run start`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/zero-data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/qdrant/storage`

**Category:** AI/ML · **Languages:** TypeScript, MDX, PLpgSQL, CSS, Shell, JavaScript

[View on Railway →](https://railway.com/deploy/rift-1)
