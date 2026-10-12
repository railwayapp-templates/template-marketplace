# Deploy AFFiNE 0.27 Docs and Whiteboards on Railway

Docs, whiteboards and databases in one workspace you own.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/affine-027-docs-and-whiteboards)

## About

AFFiNE is an open-source workspace that combines docs, whiteboards and databases on one canvas. This community template runs the AFFiNE 0.27 self-hosted server on Railway with PostgreSQL (pgvector), Redis, a Manticore search indexer and a Railway Bucket for files, and creates your administrator account on first start.

AFFiNE's server is a Node.js application that stores documents in PostgreSQL, uses Redis for real-time sync and background jobs, and keeps uploaded images and attachments in a file store. Since version 0.27 most settings live in a `config.json` file; this template generates it from Railway variables on every start, so files go to a Railway Bucket and no manual configuration is needed. Database migrations run in Railway's pre-deploy step. A stable server key is derived from a generated secret, so sessions and stored secrets survive redeploys. The Manticore indexer adds server-side full-text search, and AI features work with your own provider key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AFFiNE | [baranberkay96/affine-railway](https://github.com/baranberkay96/affine-railway) (branch: main) (root: /services/affine) | Web service |
| Redis | `redis:8.2` | Database |
| Postgres | `pgvector/pgvector:0.8.7-pg16` | Database |
| Indexer | `manticoresearch/manticore:10.1.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | AFFiNE | 3010 | Port the AFFiNE server listens on (domain and healthcheck). |
| `BUCKET_NAME` | AFFiNE | - | Railway Bucket name. |
| `LISTEN_ADDR` | AFFiNE | :: | Listen on IPv4 and IPv6. |
| `DATABASE_URL` | AFFiNE | - | Postgres with pgvector (private network). |
| `BUCKET_REGION` | AFFiNE | - | Railway Bucket region. |
| `AFFINE_STORAGE` | AFFiNE | bucket | 'bucket' = workspace files in the Railway Bucket, 'fs' = everything on the service volume. |
| `BUCKET_ENDPOINT` | AFFiNE | - | Railway Bucket S3 endpoint. |
| `REDIS_SERVER_HOST` | AFFiNE | - | Redis host (cache, job queues, sync). |
| `REDIS_SERVER_PORT` | AFFiNE | 6379 | Redis port. |
| `AFFINE_ADMIN_EMAIL` | AFFiNE | - | Email of the first administrator, created automatically on first start. Used to sign in. |
| `AFFINE_SERVER_HOST` | AFFiNE | - | Public host name. Change for a custom domain. |
| `AFFINE_SERVER_NAME` | AFFiNE | AFFiNE | Server name shown when connecting from the desktop and mobile apps. |
| `AFFINE_SERVER_PORT` | AFFiNE | 3010 | Same port, AFFiNE's own setting. |
| `AFFINE_ALLOW_SIGNUP` | AFFiNE | false | Default for open registration. Admins can change it later in Admin > Settings. |
| `AFFINE_SERVER_HTTPS` | AFFiNE | true | Railway serves the domain over HTTPS. |
| `BUCKET_CORS_ENABLED` | AFFiNE | true | Set the Bucket CORS rule in the pre-deploy step (browsers fetch files from presigned Bucket URLs). |
| `BUCKET_CORS_ORIGINS` | AFFiNE | * | Allowed origins for GET/HEAD on presigned URLs (space-separated). '*' covers web, desktop and mobile apps. |
| `BUCKET_ACCESS_KEY_ID` | AFFiNE | - | Railway Bucket access key. |
| `AFFINE_ADMIN_PASSWORD` | AFFiNE | (secret) | Password of the first administrator (generated). Change it after the first login. |
| `REDIS_SERVER_PASSWORD` | AFFiNE | (secret) | Redis password. |
| `AFFINE_COPILOT_ENABLED` | AFFiNE | true | Enable AFFiNE AI; workspace owners add their own provider keys (BYOK). |
| `AFFINE_INDEXER_ENABLED` | AFFiNE | true | Server-side full-text search through the Indexer service (Manticore). |
| `AFFINE_PRIVATE_KEY_SEED` | AFFiNE | - | Seed for the server's signing/encryption key (derived on every start). Never change it. |
| `BUCKET_FORCE_PATH_STYLE` | AFFiNE | false | Railway Buckets use virtual-hosted URLs; true only if the Bucket's Credentials tab says path-style. |
| `BUCKET_SECRET_ACCESS_KEY` | AFFiNE | (secret) | Railway Bucket secret key. |
| `AFFINE_SERVER_EXTERNAL_URL` | AFFiNE | - | Public base URL used in links and emails. Change for a custom domain. |
| `AFFINE_INDEXER_SEARCH_ENDPOINT` | AFFiNE | - | Manticore HTTP endpoint (private network). |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres (private network). |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | Indexer | 9308 | Manticore HTTP port (healthcheck and AFFiNE). |
| `searchd_threads` | Indexer | 4 | Search worker threads (default would follow the host's CPU count). |

## Configuration

- **Healthcheck:** `/info`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.affine/storage`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Volume:** `/var/lib/manticore`

**Category:** Other · **Tags:** affine, notion-alternative, miro-alternative, knowledge-base, whiteboard · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/affine-027-docs-and-whiteboards)
