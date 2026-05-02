# Deploy Umami on Railway (Production) | Track Website Traffic on Railway

[May '26] Open-Source Google Analytics Alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/umami-analytics-on-railway-production-se)

## About

**Umami** is a lightweight, privacy-focused, open-source web analytics platform that lets you track website traffic without cookies or invasive data collection. It provides real-time insights, custom event tracking, and a clean dashboard — all while giving you full ownership of your analytics data.

![Umami Tracking Homepage](https://umami.is/images/app.jpg)


### Adding Umami Tracking to Your Website

After deployment:

1. Log into Umami dashboard - username: **admin** & password: **umami**. It is recommended to change the default pwd later.
2. Create a new Website entry.
3. Copy the generated tracking script.



Add this inside your website’s `head` tag.
![Umami Tracking Script Panel](https://res.cloudinary.com/asset-cloudinary/image/upload/v1771098207/website_ad_cekswv.png)

Verify installation by checking for `/api/send` requests in browser DevTools.

---

Hosting Umami involves running the Node.js application alongside a PostgreSQL database for persistent analytics storage. On **Railway**, deployment is simplified through managed infrastructure, automatic builds, environment variable management, and secure internal networking between services. You provision a PostgreSQL instance, configure required environment variables, optionally add Redis (Valkey) for caching, and deploy. Railway handles HTTPS, networking, scaling, and logs, making it ideal for self-hosting Umami in production without managing servers manually.

📸 *[Image Placeholder: Railway Project with Umami + Postgres Services]*

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| umami | `umamisoftware/umami:postgresql-latest` | Database |
| Valkey | `valkey/valkey:latest` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOSTNAME` | umami | :: | Network interface Umami binds to (:: = all IPv4/IPv6). |
| `HOST_URL` | umami | - | Public URL of your Umami instance (used for links & callbacks). |
| `HASH_SALT` | umami | - | Salt used for hashing sensitive values (e.g., passwords). |
| `REDIS_URL` | umami | - | Connection string for Redis/Valkey caching. |
| `APP_SECRET` | umami | (secret) | Secret used to sign sessions |
| `DATABASE_URL` | umami | - | Connection string Umami uses to talk to Postgres. |
| `DATABASE_TYPE` | umami | postgres | Defines which DB driver Umami uses (postgres). |
| `PRISMA_SCHEMA_DISABLE_ADVISORY_LOCK` | umami | 1 | Disables Prisma DB locking |
| `VALKEY_URL` | Valkey | - | Internal Redis connection string (used by Umami). |
| `VALKEY_HOST` | Valkey | - | Internal hostname of the Valkey service |
| `VALKEY_PORT` | Valkey | 6379 | Port Valkey listens on (6379 default). |
| `VALKEY_USER` | Valkey | (secret) | Redis ACL username (default user). |
| `VALKEY_PASSWORD` | Valkey | (secret) | Password for Redis authentication. |
| `VALKEY_PUBLIC_URL` | Valkey | - | External Redis connection string. |
| `VALKEY_PUBLIC_HOST` | Valkey | - | External hostname for public Redis access. |
| `VALKEY_PUBLIC_PORT` | Valkey | - | External port for public Redis access. |
| `POSTGRES_DB` | Postgres | railway | Default database created at initialization |
| `DATABASE_URL` | Postgres | - | Internal DB connection |
| `POSTGRES_USER` | Postgres | (secret) | Default superuser created at initialization. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password assigned to the Postgres user |
| `DATABASE_PUBLIC_URL` | Postgres | - | External DB connection |

## Configuration

- **Healthcheck:** `/api/heartbeat`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "exec docker-entrypoint.sh valkey-server --port ${VALKEY_PORT} --requirepass ${VALKEY_PASSWORD}"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/umami-analytics-on-railway-production-se)
