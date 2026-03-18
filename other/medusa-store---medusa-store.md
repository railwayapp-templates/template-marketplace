# Deploy medusa-store on Railway

Deploy Medusa Worker and Server with a private connection to Redis.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/medusa-store)

## About

Hosting medusa-store involves deploying a Node.js Medusa backend along with supporting infrastructure such as a PostgreSQL database, Redis for background jobs and caching, and object storage for media assets. In production setups, Medusa commonly runs as separate Server and Worker instances, both sharing the same database and Redis connection. Environment variables are used to configure integrations like Payload CMS for content management and S3-compatible storage providers such as Cloudflare R2. Railway simplifies this by managing services, private networking, and environment configuration in a single platform.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Medusa Server | [DrunkOldDog/ecommerce-medusa-payload-nextjs](https://github.com/DrunkOldDog/ecommerce-medusa-payload-nextjs) (root: /ecommerce-template) | Web service |
| Medusa Worker | [DrunkOldDog/ecommerce-medusa-payload-nextjs](https://github.com/DrunkOldDog/ecommerce-medusa-payload-nextjs) (root: /ecommerce-template) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `PORT` | Medusa Server | 9000 | - |
| `AUTH_CORS` | Medusa Server | http://localhost:5173,http://localhost:9000,http://localhost:8000 | - |
| `S3_BUCKET` | Medusa Server | - | Your bucket name |
| `S3_SECRET` | Medusa Server | (secret) | - |
| `ADMIN_CORS` | Medusa Server | http://localhost:5173,http://localhost:9000 | - |
| `JWT_SECRET` | Medusa Server | (secret) | - |
| `STORE_CORS` | Medusa Server | http://localhost:8000,https://docs.medusajs.com | - |
| `S3_ENDPOINT` | Medusa Server | - | https://<YOUR_CODE>.r2.cloudflarestorage.com |
| `S3_FILE_URL` | Medusa Server | - | Public Development URL or Custom Domains |
| `WORKER_MODE` | Medusa Server | server | - |
| `DATABASE_URL` | Medusa Server | - | postgresql://<YOUR_DB_URL> |
| `COOKIE_SECRET` | Medusa Server | (secret) | - |
| `PAYLOAD_API_KEY` | Medusa Server | (secret) | - |
| `PAYLOAD_SERVER_URL` | Medusa Server | - | Your deployed Payload URL (only needed for subs) |
| `PAYLOAD_USER_COLLECTION` | Medusa Server | users | - |
| `PORT` | Medusa Worker | 9000 | - |
| `S3_BUCKET` | Medusa Worker | - | Your bucket name |
| `S3_SECRET` | Medusa Worker | (secret) | - |
| `JWT_SECRET` | Medusa Worker | (secret) | - |
| `S3_ENDPOINT` | Medusa Worker | - | https://<YOUR_CODE>.r2.cloudflarestorage.com |
| `S3_FILE_URL` | Medusa Worker | - | Public Development URL or Custom Domains |
| `WORKER_MODE` | Medusa Worker | worker | - |
| `DATABASE_URL` | Medusa Worker | - | postgresql://<YOUR_DB_URL> |
| `COOKIE_SECRET` | Medusa Worker | (secret) | - |
| `DISABLE_ADMIN` | Medusa Worker | true | - |
| `PAYLOAD_API_KEY` | Medusa Worker | (secret) | Only needed for pub/subs to Payload |
| `PAYLOAD_SERVER_URL` | Medusa Worker | - | Your deployed Payload URL (only needed for subs) |
| `PAYLOAD_USER_COLLECTION` | Medusa Worker | users | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `cd .medusa/server && pnpm install && pnpm run predeploy && pnpm run start`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/medusa-store)
