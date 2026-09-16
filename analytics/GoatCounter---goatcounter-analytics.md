# Deploy GoatCounter on Railway

Web analytics that counts visits without cookies or personal data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/goatcounter-analytics)

## About

GoatCounter is an open-source web analytics platform that counts what happens on your site without tracking the people who visit it. It sets no cookies and stores no personal data, identifying unique visits through a rotating, non-identifiable hash, so it generally needs no consent banner. The snippet is about 3.5 KB, and there is a JavaScript-free pixel and a logfile importer too.

Deploy GoatCounter on Railway and you get the production shape, not the smallest thing that boots. Three services come up together: **goatcounter** runs the Go binary with a persistent volume, **Postgres** stores every pageview, and **gateway** is the public front door that normalises visitor IP addresses. Traffic arrives at the gateway and is forwarded privately to GoatCounter, which reads and writes Postgres over the private network — only the gateway is reachable from the internet. Your first site and administrator account are created during the first boot, so there is never a moment when a stranger can claim the instance.

![Diagram of the GoatCounter, gateway and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789459032/goatcounter-architecture.webp)

Most analytics tools answer questions you never asked and hide the two or three you did. GoatCounter shows pages, visitors, referrers, browsers, systems, screen sizes and countries, and stops there.

- Cookie-free unique-visit detection using a daily-rotating hash
- Tracking by script tag, pixel, backend API call or server logfile import
- Referrer, campaign, browser, system, screen-size and country breakdowns
- Path filtering, custom date ranges, CSV/JSON exports and a REST API
- Multiple sites from one installation, each on its own domain


The architecture splits three concerns. **goatcounter** is a statically compiled Go binary that runs its scheduled tasks in-process, so there is no separate worker; its volume holds exports and an optional MaxMind database. **Postgres** is the system of record — SQLite also works, but PostgreSQL is what upstream recommends once pageviews spread across many distinct URLs. **gateway** is a small Caddy service that strips client-supplied `CF-Connecting-IP`, `Fly-Client-IP`, `X-Azure-SocketIP` and `True-Client-IP` headers and substitutes the real connection address, because GoatCounter trusts those headers ahead of everything else with no way to reorder them.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| goatcounter | [gridalpha/goatcounter-railway](https://github.com/gridalpha/goatcounter-railway) | Database |
| gateway | [gridalpha/goatcounter-railway](https://github.com/gridalpha/goatcounter-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | goatcounter | 8080 | HTTP port the app listens on |
| `GC_VHOST` | goatcounter | - | Domain visitors use; selects the site |
| `GC_ADMIN_EMAIL` | goatcounter | admin@example.com | Login for the first superuser |
| `GOATCOUNTER_DB` | goatcounter | - | Database connection string |
| `GC_ADMIN_PASSWORD` | goatcounter | (secret) | That account's password, min 8 chars |
| `PORT` | gateway | 8080 | HTTP port Caddy listens on |
| `GOATCOUNTER_UPSTREAM` | gateway | goatcounter.railway.internal:8080 | Private backend address |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/status`
- **Volume:** `/home/goatcounter/goatcounter-data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/goatcounter-analytics)
