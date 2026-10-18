# Deploy Hyperswitch vs Stripe on Railway

Route Stripe and other processors through one open API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-hyperswitch-vs-stripe-payments)

## About

This template deploys the Hyperswitch v1.128.0 router, Control Center, Postgres, and Redis on Railway. Hyperswitch is not a processor like Stripe; it routes Stripe and other processor calls through one open-source API.

This Railway template runs the open-source Hyperswitch router v1.128.0, the Control Center merchant dashboard, Postgres, and Redis as four connected services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| control-center | `juspaydotin/hyperswitch-control-center:v1.38.10@sha256:be7c128fb0e92a22d576c8ec15a8dffda047ceb5242ca1b4d48dc73d20498366` | Web service |
| Redis | `redis:8.2.10@sha256:47670742d7924adbcdb404d1288b6327815b23141969c0939b8e5d61f78c2634` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18@sha256:fcc6686a3f4f1962fe4ed77a15884553b7bd611ae1cea3204687968c5c09d517` | Database |
| hyperswitch-router | `ghcr.io/onepush-dev/hyperswitch-router:v1.128.0@sha256:71110fad0a471321fc2b1f3794f40f08235b441e64cae4c01dea4904b38fcae4` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | control-center | 9000 | Port the dashboard listens on (9000). |
| `default__features__totp` | control-center | true | Offer TOTP two-factor auth at login (skippable). |
| `default__features__email` | control-center | false | Email-based flows (verify, magic link); off because no SMTP. |
| `default__endpoints__api_url` | control-center | - | Public router URL the dashboard calls from the browser. |
| `REDISHOST` | Redis | - | Private host of Redis. |
| `REDISPORT` | Redis | 6379 | Redis port. |
| `REDISUSER` | Redis | default | Redis user. |
| `REDIS_URL` | Redis | - | Private connection URL. |
| `REDISPASSWORD` | Redis | (secret) | Redis password (alias). |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password, generated per deploy. |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot. |
| `DATABASE_URL` | Postgres | - | Private connection URL. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser name. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, generated per deploy. |
| `PORT` | hyperswitch-router | 8080 | Port Railway routes to; the router listens on 8080. |
| `ROUTER__REDIS__HOST` | hyperswitch-router | - | Redis private host (cache, locks, streams). |
| `ROUTER__REDIS__PORT` | hyperswitch-router | - | Redis port. |
| `ROUTER__USER__BASE_URL` | hyperswitch-router | - | Public dashboard URL used in user links and redirects. |
| `ROUTER__REDIS__PASSWORD` | hyperswitch-router | (secret) | Redis password from the Redis service. |
| `ROUTER__REDIS__USERNAME` | hyperswitch-router | (secret) | Redis ACL user. |
| `ROUTER__SERVER__WORKERS` | hyperswitch-router | 2 | HTTP worker threads; 2 keeps memory low. |
| `ROUTER__API_KEYS__HASH_KEY` | hyperswitch-router | (secret) | 64-hex key used to hash API keys; changing it invalidates all keys. |
| `ROUTER__LOG__CONSOLE__LEVEL` | hyperswitch-router | INFO | Log level printed to stdout (DEBUG, INFO, WARN, ERROR). |
| `ROUTER__SECRETS__JWT_SECRET` | hyperswitch-router | (secret) | Signs dashboard login tokens; changing it logs everyone out. |
| `ROUTER__SECRETS__ADMIN_API_KEY` | hyperswitch-router | (secret) | Admin API key for server-to-server admin calls (api-key header). Keep private. |
| `ROUTER__SECRETS__MASTER_ENC_KEY` | hyperswitch-router | (secret) | 64-hex master key encrypting merchant data. Never change after first use. |
| `ROUTER__PAYMENT_METHOD_AUTH__PM_AUTH_KEY` | hyperswitch-router | (secret) | Secret for payment-method auth (open banking) flows. |
| `ROUTER__USER_AUTH_METHODS__ENCRYPTION_KEY` | hyperswitch-router | - | 64-hex key encrypting SSO/auth-method settings. |
| `ROUTER__MULTITENANCY__TENANTS__PUBLIC__BASE_URL` | hyperswitch-router | - | Public URL of this router (default tenant). |
| `ROUTER__INTERNAL_MERCHANT_ID_PROFILE_ID_AUTH__INTERNAL_API_KEY` | hyperswitch-router | (secret) | Key for internal service-to-service auth (feature off by default). |
| `ROUTER__MULTITENANCY__TENANTS__PUBLIC__USER__CONTROL_CENTER_URL` | hyperswitch-router | - | Public dashboard URL for the default tenant. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/local/bin/files`

**Category:** Other

[View on Railway →](https://railway.com/deploy/deploy-hyperswitch-vs-stripe-payments)
