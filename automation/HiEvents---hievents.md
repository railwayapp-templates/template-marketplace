# Deploy Hi.Events on Railway

Open-source event management and ticket selling platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hievents)

## About

Hi.Events is an open-source, self-hosted event management and ticketing platform for creating events, selling tickets, managing attendees, and handling check-ins. It supports customizable event pages, Stripe payments, QR code check-ins, reporting, promo codes, refunds, multi-user access, webhooks, and a REST API.

Hosting Hi.Events involves deploying its application services alongside a PostgreSQL database and Redis instance. The application is built with Laravel, React, TypeScript, and server-side rendering, and can be deployed using Docker. For a production deployment, you'll need to configure application secrets and database/Redis connections through environment variables. Depending on your setup, you can also configure SMTP for transactional emails, Stripe for online ticket payments, and S3-compatible object storage for persistent event images and uploaded files. Railway can host these services together within a single project.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hi.Events | `daveearley/hi.events-all-in-one:v2.0.0-rc.1` | Web service |
| BucketProxy | `ghcr.io/railwayapp/function-bun:1.4.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Hi.Events | 80 | App Port |
| `APP_ENV` | Hi.Events | production | App env |
| `APP_KEY` | Hi.Events | - | Laravel Encryption Key (Base64) |
| `APP_NAME` | Hi.Events | Railway Hi.Events | Your Instance Name |
| `APP_DEBUG` | Hi.Events | false | Disable Debug |
| `REDIS_URL` | Hi.Events | - | Redis Connection String |
| `APP_LOCALE` | Hi.Events | en | Default locale |
| `JWT_SECRET` | Hi.Events | (secret) | JSON Web Token Secret |
| `APP_CDN_URL` | Hi.Events | - | Uploads |
| `LOG_CHANNEL` | Hi.Events | stderr | Railway Logs Channel |
| `MAIL_MAILER` | Hi.Events | log | CHANGE TO SMTP |
| `CACHE_DRIVER` | Hi.Events | redis | Redis Cache |
| `DATABASE_URL` | Hi.Events | - | Database Connection String |
| `DB_CONNECTION` | Hi.Events | pgsql | Postgres Driver |
| `SESSION_DRIVER` | Hi.Events | redis | Session Driver |
| `APP_FRONTEND_URL` | Hi.Events | - | Frontend URL |
| `AWS_ENDPOINT_URL` | Hi.Events | - | S3 Endpoint URL |
| `QUEUE_CONNECTION` | Hi.Events | redis | Queue Driver |
| `AWS_ACCESS_KEY_ID` | Hi.Events | - | S3 Access Key |
| `MAIL_FROM_ADDRESS` | Hi.Events | tickets@hi.events | Sender email address |
| `VITE_FRONTEND_URL` | Hi.Events | - | Frontend Public URL |
| `AWS_DEFAULT_REGION` | Hi.Events | - | S3 Region |
| `AWS_PRIVATE_BUCKET` | Hi.Events | - | S3 Bucket Name |
| `VITE_API_URL_CLIENT` | Hi.Events | - | API URL (AiO) |
| `VITE_API_URL_SERVER` | Hi.Events | - | API URL for SSR (internal) |
| `CORS_ALLOWED_ORIGINS` | Hi.Events | * | CHANGE |
| `APP_SAAS_MODE_ENABLED` | Hi.Events | false | Multi-tenant SaaS (Needs License) |
| `AWS_SECRET_ACCESS_KEY` | Hi.Events | (secret) | S3 Secret |
| `FILESYSTEM_PUBLIC_DISK` | Hi.Events | s3-private | Change to local if not using S3 |
| `FILESYSTEM_PRIVATE_DISK` | Hi.Events | s3-private | Change to local if not using S3 |
| `APP_DISABLE_REGISTRATION` | Hi.Events | false | Disable public sign-ups |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Hi.Events | - | Stripe publishable key |
| `S3_BUCKET` | BucketProxy | - | S3 Bucket Name |
| `S3_REGION` | BucketProxy | - | S3 Default Region |
| `S3_ENDPOINT` | BucketProxy | - | S3 Endpoint |
| `S3_ACCESS_KEY_ID` | BucketProxy | - | S3 Access Key |
| `S3_SECRET_ACCESS_KEY` | BucketProxy | (secret) | S3 Secret |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `REDISHOST` | Redis | - | Redis Host |
| `REDISPORT` | Redis | 6379 | Redis Port |
| `REDISUSER` | Redis | default | Redis User |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Redis Password |
| `REDIS_PASSWORD` | Redis | (secret) | Redis Password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `./run.sh Ly8gaW5kZXgudHN4IChCdW4gcnVudGltZSkKCmltcG9ydCB7IEhvbm8gfSBmcm9tICJob25vIjsKaW1wb3J0IHsgY29ycyB9IGZyb20gImhvbm8vY29ycyI7CmltcG9ydCB7IFMzQ2xpZW50IH0gZnJvbSAiYnVuIjsKaW1wb3J0IHsgc3RyZWFtIH0gZnJvbSAiaG9uby9zdHJlYW1pbmciOwoKY29uc3QgYXBwID0gbmV3IEhvbm8oKTsKCmNvbnN0IGNsaWVudCA9IG5ldyBTM0NsaWVudCh7CiAgYWNjZXNzS2V5SWQ6IEJ1bi5lbnYuUzNfQUNDRVNTX0tFWV9JRCwKICBzZWNyZXRBY2Nlc3NLZXk6IEJ1bi5lbnYuUzNfU0VDUkVUX0FDQ0VTU19LRVksCiAgYnVja2V0OiBCdW4uZW52LlMzX0JVQ0tFVCwKICBlbmRwb2ludDogQnVuLmVudi5TM19FTkRQT0lOVCwKfSk7CgphcHAudXNlKCIvKiIsIGNvcnMoKSk7CgphcHAuZ2V0KCIvKiIsIGFzeW5jIChjKSA9PiB7CiAgY29uc3QgcGF0aG5hbWUgPSBjLnJlcS5wYXRoOwoKICBpZiAocGF0aG5hbWUgPT09ICIvIikgewogICAgcmV0dXJuIGMubm90Rm91bmQoKTsKICB9CgogIGNvbnN0IHMzZmlsZSA9IGNsaWVudC5maWxlKHBhdGhuYW1lKTsKICBpZiAoIShhd2FpdCBzM2ZpbGUuZXhpc3RzKCkpKSB7CiAgICByZXR1cm4gYy5ub3RGb3VuZCgpOwogIH0KCiAgY29uc3QgbWV0YSA9IGF3YWl0IHMzZmlsZS5zdGF0KCk7CgogIGlmIChtZXRhLnR5cGUpIHsKICAgIGMuaGVhZGVyKCJDb250ZW50LVR5cGUiLCBtZXRhLnR5cGUpOwogIH0KICBpZiAobWV0YS5ldGFnKSB7CiAgICBjLmhlYWRlcigiRVRhZyIsIG1ldGEuZXRhZyk7CiAgfQogIGlmIChtZXRhLmxhc3RNb2RpZmllZCkgewogICAgYy5oZWFkZXIoIkxhc3QtTW9kaWZpZWQiLCBtZXRhLmxhc3RNb2RpZmllZC50b1N0cmluZygpKTsKICB9CgogIGMuaGVhZGVyKCJDYWNoZS1Db250cm9sIiwgInB1YmxpYywgbWF4LWFnZT0zNjAwIik7CgogIHJldHVybiBzdHJlYW0oYywgYXN5bmMgKHN0cmVhbSkgPT4gewogICAgYXdhaXQgc3RyZWFtLnBpcGUoczNmaWxlLnN0cmVhbSgpKTsKICB9KTsKfSk7CgpCdW4uc2VydmUoewogIHBvcnQ6IEJ1bi5lbnYuUE9SVCA/PyAzMDAwLAogIGZldGNoOiBhcHAuZmV0Y2gsCn0pOwo=`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/hievents)
