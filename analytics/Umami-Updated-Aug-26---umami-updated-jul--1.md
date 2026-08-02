# Deploy Umami [Updated Aug '26] on Railway

Umami [Aug '26] (Privacy-First Google Analytics Alternative) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/umami-updated-jul--1)

## About

Umami is an open-source analytics platform that respects user privacy. It replaces Google Analytics without cookies, trackers, or storing data on third-party servers. Deploy it on Railway in under five minutes with PostgreSQL and caching included.

Google Analytics is free, but "free" means you're the product - every visitor to your site gets tracked, fingerprinted, and fed into Google's ad-targeting machine, whether you want that or not. Umami flips the arrangement: your visitor data stays on your own Postgres database, full stop. Nobody else sees it, nobody else monetizes it, and you don't need a cookie consent banner because there are no cookies to consent to.

That privacy angle isn't just ethics - it's also compliance. GDPR, CCPA, and similar regulations exist specifically because third-party tracking became the default. Umami sidesteps the whole category of problem by never sending data anywhere except your own database in the first place. Legal teams tend to like "the data never leaves our infrastructure" a lot more than "we have a cookie banner and a privacy policy about what Google does with it."

Self-hosting on Railway means you're not trading Google's servers for a different vendor's servers. Railway handles the infrastructure complexity - SSL certificates, container orchestration, private networking between services - while you keep full ownership of the database itself. No monthly per-site subscription, no per-event billing that scales against you as your traffic grows, no surprise bill because a post went viral.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| valkey | `valkey/valkey:9.1.1-alpine3.24` | Database |
| umami-railway | [shruti060701/umami-railway](https://github.com/shruti060701/umami-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_URL` | umami-railway | - | Optional session/caching layer. Umami automatically falls back to direct database queries if this is unreachable, so it's safe even if Valkey has issues — confirmed via Umami's own official docs, not assumed. |
| `APP_SECRET` | umami-railway | (secret) | Session encryption and cookie signing key. Auto-generated per deployment. |
| `DATABASE_URL` | umami-railway | - | PostgreSQL connection string. Auto-set from the Postgres service. **Do not set this variable directly on the Postgres service itself** — doing so overwrites Postgres's real auto-injected connection string with a broken self-reference and breaks every service that depends on it. This happened during development and took real debugging to trace back — worth calling out explicitly here. |
| `POSTGRES_DB` | Postgres | railway | Default database name created on startup. |
| `DATABASE_URL` | Postgres | - | Primary connection string, used by `umami-railway`. |
| `POSTGRES_USER` | Postgres | (secret) | Username for the Postgres superuser account. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated superuser password for the Postgres database. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public/external connection string for reaching this database from outside Railway's network — e.g. a local GUI client like TablePlus or pgAdmin. Not used by umami-railway itself, which connects internally via DATABASE_URL instead. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/umami-updated-jul--1)
