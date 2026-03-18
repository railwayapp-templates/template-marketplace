# Deploy Caardify on Railway

Add necessary secrets before deploying

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/caardify)

## About

Caardify is a digital profile and NFC business card platform that lets individuals and teams create public, shareable profiles. Users can instantly share contact details, social links, and business information through NFC taps or profile URLs—no mobile app required.

---

Hosting Caardify involves deploying a full-stack web application that includes a frontend for public profiles and dashboards, a backend API for user and card management, and a database for storing profile and analytics data. Railway simplifies this process by handling infrastructure provisioning, environment variables, scaling, and deployments. With Railway, Caardify can be deployed directly from a Git repository, automatically rebuilt on every push, and scaled as usage grows without managing servers manually.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| caardify | `ghcr.io/caardify/caardify:latest` | Web service |
| Redis | `redis:8.2.1` | Database |
| caardify-api | `ghcr.io/caardify/caardify-api:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | root | Default value |
| `DATABASE_URL` | Postgres | - | Default value |
| `POSTGRES_USER` | Postgres | (secret) | Default value |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Default value |
| `DATABASE_PUBLIC_URL` | Postgres | - | Default value |
| `API_BASE_URL` | caardify | - | Default value |
| `NEXT_PUBLIC_API_URL` | caardify | - | Default value |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | caardify | 1:88650334126:web:c622269b2133ec15f2123f | Default value |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | caardify | (secret) | Default value |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | caardify | caardify-api | Default value |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | caardify | caardify-api.firebaseapp.com | Default value |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | caardify | caardify-api.firebasestorage.app | Default value |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | caardify | 88650334126 | Default value |
| `REDISHOST` | Redis | - | Default value |
| `REDISPORT` | Redis | 6379 | Default value |
| `REDISUSER` | Redis | root | Default value |
| `REDIS_URL` | Redis | - | Default value |
| `REDISPASSWORD` | Redis | (secret) | Default value |
| `REDIS_PASSWORD` | Redis | (secret) | Default value |
| `REDIS_PUBLIC_URL` | Redis | - | Default value |
| `PORT` | caardify-api | - | Default value |
| `LOGGER` | caardify-api | console | Default value |
| `DB_HOST` | caardify-api | - | Default value |
| `DB_NAME` | caardify-api | - | Default value |
| `DB_PORT` | caardify-api | - | Default value |
| `NODE_ENV` | caardify-api | production | Default value |
| `R2_BUCKET` | caardify-api | - | Default value |
| `REDIS_URL` | caardify-api | - | Default value |
| `JWT_SECRET` | caardify-api | (secret) | Default value |
| `MINIO_PORT` | caardify-api | 9000 | Default value |
| `REDIS_HOST` | caardify-api | - | Default value |
| `REDIS_PORT` | caardify-api | - | Default value |
| `DB_PASSWORD` | caardify-api | (secret) | Default value |
| `DB_USERNAME` | caardify-api | (secret) | Default value |
| `R2_ENDPOINT` | caardify-api | - | Default value |
| `DATABASE_URL` | caardify-api | - | Default value |
| `FILE_STORAGE` | caardify-api | server | Default value |
| `FRONTEND_URL` | caardify-api | - | Default value |
| `BKASH_API_KEY` | caardify-api | (secret) | Default value |
| `MINIO_USE_SSL` | caardify-api | false | Default value |
| `BKASH_PASSWORD` | caardify-api | (secret) | Default value |
| `BKASH_USERNAME` | caardify-api | (secret) | Default value |
| `JWT_EXPIRES_IN` | caardify-api | 1d | Default value |
| `MINIO_ENDPOINT` | caardify-api | localhost | Default value |
| `BKASH_SECRET_KEY` | caardify-api | (secret) | Default value |
| `GOOGLE_CLIENT_ID` | caardify-api | - | Default value |
| `JWT_TOKEN_ISSUER` | caardify-api | (secret) | Default value |
| `MINIO_ACCESS_KEY` | caardify-api | minio-root-user | Default value |
| `MINIO_SECRET_KEY` | caardify-api | (secret) | Default value |
| `R2_ACCESS_KEY_ID` | caardify-api | - | Default value |
| `MINIO_BUCKET_NAME` | caardify-api | caardify | Default value |
| `BKASH_CALLBACK_URL` | caardify-api | - | Default value |
| `BKASH_CHECKOUT_URL` | caardify-api | - | Default value |
| `JWT_TOKEN_AUDIENCE` | caardify-api | (secret) | Default value |
| `GOOGLE_CLIENT_SECRET` | caardify-api | (secret) | Default value |
| `JWT_ACCESS_TOKEN_TTL` | caardify-api | (secret) | Default value |
| `R2_SECRET_ACCESS_KEY` | caardify-api | (secret) | Default value |
| `BKASH_GRANT_TOKEN_URL` | caardify-api | (secret) | Default value |
| `JWT_REFRESH_TOKEN_TTL` | caardify-api | (secret) | Default value |
| `BKASH_CREATE_PAYMENT_URL` | caardify-api | - | Default value |
| `BKASH_EXECUTE_PAYMENT_URL` | caardify-api | - | Default value |
| `BKASH_REFUND_TRANSACTION_URL` | caardify-api | - | Default value |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health`

**Category:** Other

[View on Railway →](https://railway.com/template/caardify)
