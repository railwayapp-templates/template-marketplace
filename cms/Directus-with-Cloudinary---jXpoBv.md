# Deploy Directus with Cloudinary on Railway

Directus starter with postgres for the db and cloudinary for assets.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jXpoBv)

## About

This starter template will setup the latest version of Directus with Postgres and Cloudinary for the assets. Extensions included are the slug, m2m tags and editor.js.

To use, enter your admin email, password and Cloudinary details in the environment variables in the setup step.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| directus | [smokeyfro/directus](https://github.com/smokeyfro/directus) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `KEY` | directus | b3168d3c8802c9829795eadb2a5d40aa | Generate a key here: generate-secret.vercel.app/32 |
| `SECRET` | directus | (secret) | Generate a secret here: generate-secret.vercel.app/32 |
| `NODE_ENV` | directus | production | - |
| `REDIS_HOST` | directus | env.REDISHOST | - |
| `REDIS_PORT` | directus | env.CACHE_ENABLED | - |
| `CONFIG_PATH` | directus | directus.config.js | - |
| `CORS_ENABLED` | directus | true | - |
| `ADMIN_PASSWORD` | directus | (secret) | - |
| `REDIS_PASSWORD` | directus | (secret) | - |
| `REDIS_USERNAME` | directus | (secret) | - |
| `STORAGE_LOCATIONS` | directus | cloudinary | - |
| `WEBSOCKETS_ENABLED` | directus | false | - |
| `STORAGE_CLOUDINARY_API_KEY` | directus | (secret) | - |
| `STORAGE_CLOUDINARY_API_SECRET` | directus | (secret) | - |
| `STORAGE_CLOUDINARY_CLOUD_NAME` | directus | your-cloudinary-cloud | - |
| `STORAGE_CLOUDINARY_ACCESS_MODE` | directus | authenticated | - |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** TypeScript, Vue, JavaScript, SCSS, CSS, Liquid, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/jXpoBv)
