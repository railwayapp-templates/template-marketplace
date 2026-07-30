# Deploy Dub: Self-Hosted Link Management on Railway

Self-host Dub link management, analytics, and QR codes

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dub-railway)

## About

Dub is an open-source link management and attribution platform for creating branded short links, managing custom domains, generating QR codes, tracking clicks and conversions, and running partner programs.

This community template adapts Dub for Railway by deploying the application with Railway MySQL and a PlanetScale-compatible HTTP proxy. The database services, internal networking, application domain, and core secrets are wired automatically.

> Community-maintained template. Not affiliated with or endorsed by Dub. Dub is licensed under AGPL-3.0.

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
