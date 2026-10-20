# Deploy Directus | Headless CMS and Instant REST/GraphQL API on Postgres on Railway

Directus 12 headless CMS + PostGIS + bucket, admin ready, no Redis bill

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/directus-production)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/directus-production?referralCode=sLjDXb&amp;utm_medium=integration&amp;utm_source=button&amp;utm_campaign=directus-production)

[Directus](https://github.com/directus/directus) turns a SQL database into a headless CMS and backend: instant REST and GraphQL APIs, a no-code admin app for editors, roles and permissions, file management, flows and realtime updates. This template runs Directus 12 on Postgres with PostGIS, and stores uploads in a Railway bucket.

Three pieces: the Directus service, a PostGIS database with a volume, and a Railway bucket.

- **Admin ready at first boot.** The admin account is created from `ADMIN_EMAIL` and `ADMIN_PASSWORD`, both in the Variables tab, so you don't need to dig the first password out of the logs.
- **Files in object storage.** Uploads and marketplace extensions go to a Railway bucket, so the Directus service keeps no state and redeploys never lose files.
- **Geodata included.** The database is Postgres 17 with PostGIS, so Directus's map and geometry fields work out of the box.
- **No idle extras.** A single Directus instance doesn't need Redis, so the template leaves it out: three pieces to pay for instead of four. Add Redis only when you run several Directus replicas.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Directus | `directus/directus:12.5.0` | Web service |
| PostGIS | `postgis/postgis:17-3.6-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Directus | 8055 | Port Railway routes to - leave as is |
| `SECRET` | Directus | (secret) | Signs access tokens and sessions |
| `DB_CLIENT` | Directus | pg | Database driver |
| `PUBLIC_URL` | Directus | - | Public URL of Directus |
| `ADMIN_EMAIL` | Directus | admin@example.com | Admin login, created on first boot (change it later in the user settings) |
| `ADMIN_PASSWORD` | Directus | (secret) | Admin password, created on first boot |
| `IP_TRUST_PROXY` | Directus | true | Trust Railway's proxy for client IPs |
| `STORAGE_S3_KEY` | Directus | - | Bucket access key |
| `STORAGE_LOCATIONS` | Directus | s3 | Uploads go to the Railway bucket |
| `STORAGE_S3_BUCKET` | Directus | - | Bucket name |
| `STORAGE_S3_DRIVER` | Directus | s3 | S3 storage driver |
| `STORAGE_S3_REGION` | Directus | - | Bucket region |
| `STORAGE_S3_SECRET` | Directus | (secret) | Bucket secret key |
| `WEBSOCKETS_ENABLED` | Directus | true | Realtime API over WebSockets |
| `EXTENSIONS_LOCATION` | Directus | s3 | Marketplace extensions are stored in the bucket, so they survive redeploys |
| `STORAGE_S3_ENDPOINT` | Directus | - | Bucket endpoint |
| `DB_CONNECTION_STRING` | Directus | - | Postgres over Railway's private network |
| `POSTGRES_DB` | PostGIS | directus | Database name |
| `POSTGRES_USER` | PostGIS | (secret) | Database user |
| `POSTGRES_PASSWORD` | PostGIS | (secret) | Auto-generated database password |

## Configuration

- **Healthcheck:** `/server/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/directus-production)
