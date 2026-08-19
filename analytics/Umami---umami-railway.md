# Deploy Umami on Railway

Privacy-First Web Analytics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/umami-railway)

## About

Umami is an open source, privacy-first web analytics platform that reports what Google Analytics reports — visitors, page views, referrers, campaigns, conversions — without cookies, without fingerprinting, and without handing visitor behaviour to an advertising company. It stores no personal data, so it needs no consent banner under GDPR, CCPA or PECR, and its tracking script is around 2 KB.

Deploy Umami on Railway and the whole stack arrives pre-wired: the application, a PostgreSQL database holding every website, session and event, and a Redis instance for server-side login sessions and caching. Traffic from your sites hits the collector over HTTPS, is resolved into a session and written to Postgres; the dashboard reads back from Postgres while Redis keeps auth tokens and hot lookups off it. Self-hosting Umami this way needs no volume and no object storage — all state is in Postgres, and the GeoIP city database ships inside the image.

![Umami Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1787074978/468c7a02-fb8d-4c29-8d4b-e8291abc58ef.png)

Umami answers where your traffic comes from and what it does, while collecting the minimum needed to answer it. Visitors are identified by a rotating salted hash rather than a cookie or device ID, so a person is recognised within a session but cannot be followed across sites or months. Self-hosting goes further: the raw data never leaves infrastructure you control, which is often decisive for healthcare, finance and EU teams whose legal review rules out third-party analytics.

- Real-time visitors, page views, referrers, UTM campaigns and city-level geography
- Custom events and goals for sign-ups, purchases and any other conversion
- Funnels, journeys, retention and cohort reports for behavioural analysis
- Session replays and heatmaps showing how a visitor used a page
- Unlimited websites and users, team workspaces and shareable public dashboards
- A REST API and a `umami.track()` JavaScript API for server-side and SPA tracking

The deployment has three parts. **Umami** is a Next.js app serving the dashboard, the collector and the tracking script on port 3000. **PostgreSQL** stores everything durable, and Umami migrates its own schema on every boot, so upgrades need no manual step. **Redis** is optional but enabled here because it changes authentication: login tokens are stored server-side rather than as self-contained JWTs, so signing out genuinely revokes a token and replicas share one session pool.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| umami | [gridalpha/umami-railway](https://github.com/gridalpha/umami-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | umami | 3000 | HTTP server listening port |
| `REDIS_URL` | umami | - | Server-side sessions and caching |
| `APP_SECRET` | umami | (secret) | Signs tokens, salts visitor hashes |
| `DATABASE_URL` | umami | - | Postgres connection string |
| `ADMIN_PASSWORD` | umami | (secret) | First administrator password |
| `ADMIN_USERNAME` | umami | (secret) | First administrator username |
| `CLIENT_IP_HEADER` | umami | x-forwarded-for | Trusted visitor IP header |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the image |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Analytics · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/umami-railway)
