# Deploy Postiz [Updated May ’26] (Open-Source Social Media Scheduling & Automation Platform) on Railway

Postiz [May ’26] (Social Media Scheduler & AI Content Planner) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postiz)

## About

Postiz is a powerful, open-source social media automation and scheduling platform available on GitHub. It allows individuals, marketers, and businesses to manage multiple social media accounts, schedule posts, and analyze engagement - all from one intuitive dashboard.

Hosting Postiz on Railway gives you complete control over your content scheduling and social media management workflows. Instead of depending on third-party services that can restrict your data or require expensive subscriptions, self-hosting Postiz allows you to manage your automation on your own terms.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postiz | `ghcr.io/gitroomhq/postiz-app` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Postiz | 3000 | - |
| `MAIN_URL` | Postiz | https://${RAILWAY_PUBLIC_DOMAIN} | - |
| `REDIS_URL` | Postiz | ${Redis.REDIS_PUBLIC_URL} | - |
| `IS_GENERAL` | Postiz | true | - |
| `JWT_SECRET` | Postiz | (secret) | - |
| `BACKEND_URL` | Postiz | https://${RAILWAY_PUBLIC_DOMAIN}/api | - |
| `DATABASE_URL` | Postiz | ${Postgres.DATABASE_PUBLIC_URL} | - |
| `FRONTEND_URL` | Postiz | https://${RAILWAY_PUBLIC_DOMAIN} | - |
| `BACK_END_PORT` | Postiz | 3000 | - |
| `STORAGE_PROVIDER` | Postiz | local | - |
| `UPLOAD_DIRECTORY` | Postiz | /uploads | - |
| `BACKEND_INTERNAL_URL` | Postiz | http://localhost:3000 | - |
| `NEXT_PUBLIC_BACKEND_URL` | Postiz | https://${RAILWAY_PUBLIC_DOMAIN}/api | - |
| `NEXT_PUBLIC_UPLOAD_DIRECTORY` | Postiz | /uploads | - |
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

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/uploads`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/postiz)
