# Deploy Vendure on Railway

Headless e-commerce backend with a GraphQL API and admin UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vendure-ecommerce)

## About

Vendure is an open-source headless commerce platform built with TypeScript, NestJS and GraphQL. It gives you a complete commerce backend — catalog, variants, collections, channels, promotions, tax and shipping zones, order state machines, payments and fulfilment — behind a Shop API for your storefront and an Admin API for your team. Everything is extensible in ordinary TypeScript, so teams fighting a hosted platform's data model can add custom fields, entities and business rules to the commerce core. It ships a React admin dashboard, so you have a back office on day one and only build the storefront.

This template runs Vendure the way its own scaling guide recommends. Self-host Vendure on Railway and you get a **server** exposing the Shop API, Admin API, dashboard and assets; a separate **worker** draining the job queue and running scheduled tasks; **PostgreSQL** as the system of record; **Redis** carrying the queue and the shared cache, which is what makes the two processes safe to run apart and to scale; an **object storage bucket** for product images; and **Mailpit** as a private SMTP endpoint, so email works before you wire up a relay. Both build from one repository, [gridalpha/vendure-railway](https://github.com/gridalpha/vendure-railway).

![Diagram of the Vendure server, worker, Postgres, Redis and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787729206/vendure-architecture.png)

Vendure sits between a hosted SaaS platform and a from-scratch build: you own the data and the deployment, but you do not write order state machines, tax calculation or promotion logic yourself. Teams self-host it when a hosted platform's data model is the constraint — B2B pricing tiers, per-customer catalogues — or when order history should not live on someone else's infrastructure.

Key features:

- Shop and Admin GraphQL APIs, with a React dashboard on the same origin
- Multi-channel, multi-currency selling with per-channel pricing
- Custom fields and entities on core types, with the schema regenerated to match
- Plugins for payments, shipping, search, assets and scheduled work
- Role-based permissions, API keys, and a full order state machine

On Railway the server handles every HTTP request and streams assets out of the bucket. Anything slow — indexing, collection recalculation, email — goes to Redis as a job and is picked up by the worker, so an import never blocks a storefront request. Media lives in the bucket rather than on a disk, which is what lets the server run more than one replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |
| vendure-server | [gridalpha/vendure-railway](https://github.com/gridalpha/vendure-railway) | Web service |
| vendure-worker | [gridalpha/vendure-railway](https://github.com/gridalpha/vendure-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the image |
| `TZ` | mailpit | UTC | Timestamps in the inbox |
| `PORT` | mailpit | 8025 | Web inbox port, publicly routed |
| `MP_UI_AUTH` | mailpit | - | Basic auth on the web inbox |
| `MP_WEBROOT` | mailpit | / | Serve the inbox at the domain root |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_SMTP_AUTH` | mailpit | - | SMTP credentials Vendure uses |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Ring-buffer size for captured mail |
| `MP_SMTP_MAX_RECIPIENTS` | mailpit | 100 | Recipient ceiling per message |
| `MP_SMTP_AUTH_ALLOW_INSECURE` | mailpit | true | Allow AUTH on the plain private listener |
| `PORT` | vendure-server | 3000 | HTTP port for the Shop API, Admin API and dashboard |
| `APP_ENV` | vendure-server | prod | Production mode; "dev" enables API debug output |
| `DB_HOST` | vendure-server | - | Postgres private hostname |
| `DB_NAME` | vendure-server | - | Postgres database name |
| `DB_PORT` | vendure-server | - | Postgres port |
| `REDIS_URL` | vendure-server | - | Job queue and shared cache |
| `S3_BUCKET` | vendure-server | - | Bucket holding product media |
| `S3_REGION` | vendure-server | - | Object storage region |
| `SMTP_HOST` | vendure-server | - | SMTP host for outgoing email |
| `SMTP_PORT` | vendure-server | 1025 | Mailpit plain SMTP listener |
| `SMTP_USER` | vendure-server | (secret) | SMTP username, matches Mailpit |
| `EMAIL_FROM` | vendure-server | "Vendure" <noreply@example.com> | From address on transactional email |
| `HARDEN_API` | vendure-server | true | Disables introspection, caps query complexity |
| `PUBLIC_URL` | vendure-server | - | Public origin of this server |
| `DB_PASSWORD` | vendure-server | (secret) | Postgres password |
| `DB_POOL_MAX` | vendure-server | 10 | Connection pool ceiling per replica |
| `DB_USERNAME` | vendure-server | (secret) | Postgres user |
| `S3_ENDPOINT` | vendure-server | - | Object storage endpoint |
| `SMTP_SECURE` | vendure-server | false | No implicit TLS on port 1025 |
| `VENDURE_ROLE` | vendure-server | server | Runs the API, dashboard and asset server |
| `COOKIE_SECRET` | vendure-server | (secret) | Session signing key, shared with the worker |
| `SMTP_PASSWORD` | vendure-server | (secret) | SMTP password, matches Mailpit |
| `STOREFRONT_URL` | vendure-server | - | Base URL for customer email links |
| `SMTP_IGNORE_TLS` | vendure-server | true | Skip STARTTLS on the private listener |
| `S3_ACCESS_KEY_ID` | vendure-server | - | Object storage access key |
| `S3_FORCE_PATH_STYLE` | vendure-server | true | Path-style addressing for the bucket |
| `SUPERADMIN_PASSWORD` | vendure-server | (secret) | First administrator password |
| `SUPERADMIN_USERNAME` | vendure-server | (secret) | First administrator, seeded on first boot |
| `S3_SECRET_ACCESS_KEY` | vendure-server | (secret) | Object storage secret |
| `POPULATE_DEMO_PRODUCTS` | vendure-server | true | Seed 54 demo products on first boot |
| `PORT` | vendure-worker | 3020 | Worker health-check port, not public |
| `APP_ENV` | vendure-worker | prod | Production mode |
| `DB_HOST` | vendure-worker | - | Postgres private hostname |
| `DB_NAME` | vendure-worker | - | Postgres database name |
| `DB_PORT` | vendure-worker | - | Postgres port |
| `REDIS_URL` | vendure-worker | - | Job queue and shared cache |
| `S3_BUCKET` | vendure-worker | - | Bucket holding product media |
| `S3_REGION` | vendure-worker | - | Object storage region |
| `SMTP_HOST` | vendure-worker | - | SMTP host for outgoing email |
| `SMTP_PORT` | vendure-worker | 1025 | Mailpit plain SMTP listener |
| `SMTP_USER` | vendure-worker | (secret) | SMTP username, matches Mailpit |
| `EMAIL_FROM` | vendure-worker | - | From address on transactional email |
| `HARDEN_API` | vendure-worker | true | Keeps plugin config identical to the server |
| `PUBLIC_URL` | vendure-worker | - | Public origin of the API |
| `DB_PASSWORD` | vendure-worker | (secret) | Postgres password |
| `DB_POOL_MAX` | vendure-worker | 10 | Connection pool ceiling per replica |
| `DB_USERNAME` | vendure-worker | (secret) | Postgres user |
| `S3_ENDPOINT` | vendure-worker | - | Object storage endpoint |
| `SMTP_SECURE` | vendure-worker | false | No implicit TLS on port 1025 |
| `VENDURE_ROLE` | vendure-worker | worker | Runs the job queue and scheduler |
| `COOKIE_SECRET` | vendure-worker | (secret) | Must match the server exactly |
| `SMTP_PASSWORD` | vendure-worker | (secret) | Must match the server |
| `STOREFRONT_URL` | vendure-worker | - | Base URL for email links |
| `SMTP_IGNORE_TLS` | vendure-worker | true | Skip STARTTLS on the private listener |
| `S3_ACCESS_KEY_ID` | vendure-worker | - | Object storage access key |
| `S3_FORCE_PATH_STYLE` | vendure-worker | true | Path-style addressing for the bucket |
| `SUPERADMIN_PASSWORD` | vendure-worker | (secret) | Shared with the server |
| `SUPERADMIN_USERNAME` | vendure-worker | (secret) | Shared with the server |
| `S3_SECRET_ACCESS_KEY` | vendure-worker | (secret) | Object storage secret |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/vendure-ecommerce)
