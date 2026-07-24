# Deploy dub-railway on Railway

Deploy Dub, the open-source link management platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dub-railway)

## About

Dub is the open-source link management platform for modern marketing teams to create, share, and track short links. It offers branded custom domains, real-time click and conversion analytics, QR codes, and affiliate/partner program tracking. It is a self-hostable, developer-friendly alternative to Bitly, built on Next.js.

Dub is a Next.js monorepo (pnpm/Turborepo) that reads and writes through both Prisma (MySQL wire protocol) and the PlanetScale serverless HTTP driver, so it needs a MySQL database plus a small PlanetScale-compatible HTTP proxy in front of it. It also relies on Upstash Redis and QStash for caching and background jobs, Tinybird for click analytics, and S3-compatible object storage for image assets. This template provisions three Railway services (the Dub web app, MySQL, and the ps-http-sim proxy) already wired together, and generates the app secrets for you. You supply credentials for a few external services as environment variables, and the build compiles the monorepo, syncs the database schema, and starts the app.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Dub | [acewebs/dub-railway](https://github.com/acewebs/dub-railway) | Web service |
| MySQL | `mysql:9.4` | Database |
| PlanetScale Proxy | [acewebs/dub-railway](https://github.com/acewebs/dub-railway) (root: /railway/ps-http-sim) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `QSTASH_URL` | Dub | https://qstash.upstash.io | ---------------------------------------------------------------------------- |
| `CRON_SECRET` | Dub | (secret) | - |
| `DATABASE_URL` | Dub | - | private, used at runtime |
| `NEXTAUTH_URL` | Dub | - | ---------------------------------------------------------------------------- |
| `QSTASH_TOKEN` | Dub | (secret) | - |
| `ENCRYPTION_KEY` | Dub | - | must base64-decode to exactly 32 bytes (verify on a test deploy) |
| `NEXTAUTH_SECRET` | Dub | (secret) | - |
| `STORAGE_BASE_URL` | Dub | - | public bucket URL, e.g. https://pub-xxxx.r2.dev |
| `STORAGE_ENDPOINT` | Dub | - | e.g. https://<account-id>.r2.cloudflarestorage.com |
| `TINYBIRD_API_KEY` | Dub | (secret) | Object storage: Cloudflare R2 or AWS S3 (or a MinIO service on Railway) |
| `TINYBIRD_API_URL` | Dub | https://api.tinybird.co | - |
| `STRIPE_SECRET_KEY` | Dub | (secret) | - |
| `DATABASE_URL_BUILD` | Dub | - | public, used only during build |
| `GITHUB_CLIENT_SECRET` | Dub | (secret) | Optional alternatives (add these variables instead of, or alongside, GitHub): |
| `STRIPE_APP_SECRET_KEY` | Dub | (secret) | - |
| `STORAGE_PRIVATE_BUCKET` | Dub | - | Login: configure at least one method. OAuth needs no email service. |
| `QSTASH_NEXT_SIGNING_KEY` | Dub | - | Tinybird: tinybird.co -> workspace -> Tokens (admin token) |
| `UPSTASH_VECTOR_REST_URL` | Dub | https://dummy-vector.upstash.io | - |
| `UPSTASH_REDIS_REST_TOKEN` | Dub | (secret) | Upstash QStash: console.upstash.com -> QStash (QSTASH_URL default above) |
| `STORAGE_SECRET_ACCESS_KEY` | Dub | (secret) | - |
| `UPSTASH_VECTOR_REST_TOKEN` | Dub | (secret) | ---------------------------------------------------------------------------- |
| `STRIPE_APP_SECRET_KEY_TEST` | Dub | (secret) | - |
| `STRIPE_APP_SECRET_KEY_SANDBOX` | Dub | (secret) | - |
| `MYSQLPORT` | MySQL | 3306 | - |
| `MYSQLUSER` | MySQL | root | - |
| `MYSQLPASSWORD` | MySQL | (secret) | - |
| `MYSQL_DATABASE` | MySQL | railway | - |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Analytics · **Languages:** TypeScript, JavaScript, CSS, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/dub-railway)
