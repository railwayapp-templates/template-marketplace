# Deploy ZWS - Zero Width Shortener on Railway

Shorten URLs using invisible spaces

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zws-zero-width-shortener)

## About

ZWS (Zero Width Shortener) is an open-source URL shortener that replaces traditional alphanumeric codes with invisible zero-width characters. When rendered, these characters appear invisible in text but still securely encode the destination URL. This provides a unique, highly discreet way to shorten and share links.

Deploying ZWS on Railway provides a streamlined, cloud-native hosting solution for this Node.js application. Railway automatically handles the Turborepo monorepo build, executes the Drizzle ORM database migrations, and serves the application. This continuous deployment setup ensures your ZWS instance is always up to date and scales effortlessly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| api | [iqbalexperience/zws](https://github.com/iqbalexperience/zws) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| web | [iqbalexperience/zws](https://github.com/iqbalexperience/zws) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | api | 8080 | - |
| `SENTRY_DSN` | api | https://example-url@o0.ingest.sentry.io/0 | - |
| `GOOGLE_API_KEY` | api | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | web | 8080 | - |
| `SENTRY_DSN` | web | https://example-sentry-url@o0.ingest.sentry.io/0 | - |
| `GOOGLE_API_KEY` | web | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `bun run start:api`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `bun run start:web`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS, Procfile

[View on Railway →](https://railway.com/deploy/zws-zero-width-shortener)
