# Deploy Plausible on Railway

Google analytics alternative. Privacy-first web analytics, custom events

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plausible-community-edition)

## About

Plausible is open source, privacy-friendly web analytics: a lightweight script that tells you how many people visited your site, where they came from and which pages they read — without cookies, cross-site tracking or personal data. It suits teams dropping Google Analytics who still need real numbers, and anyone answering a GDPR, CCPA or PECR question about their analytics.

Deploy Plausible Community Edition and self-host Plausible on Railway with its data layer already wired together: the app (`ghcr.io/plausible/community-edition`), PostgreSQL for accounts and settings, ClickHouse for the events, and Mailpit as the mail service that makes invitations and password resets work on day one. ClickHouse carries the configuration Plausible's own compose file recommends, baked into a source image at [gridalpha/plausible-clickhouse-railway](https://github.com/gridalpha/plausible-clickhouse-railway). The app is the only service on the public internet; both databases and SMTP stay private.

![Plausible Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786974927/4076efde-c5ed-47f1-bc85-f885a412050f.png)

Plausible is an Elixir application that ingests page views over HTTP and answers dashboard queries from ClickHouse, a columnar database built for this workload. Self-host it when analytics data must stay on infrastructure you control, or for unlimited page views with no per-event bill.

- Cookieless tracking, so no consent banner is required in most jurisdictions
- A ~1 KB script, roughly 75× smaller than Google Analytics' tag
- Goals and custom events with conversion rates on the same screen
- UTM campaign tracking, referrer and channel attribution
- Country, region and city geolocation from a bundled DB-IP database
- A public Stats API, shareable dashboards, email reports

PostgreSQL holds users, teams, sites, goals and settings. ClickHouse holds every event and session, which is what makes a query over millions of rows return instantly. Mailpit accepts mail over the private network and gives you a web inbox — since new accounts arrive by invitation, that mail path is what lets you add colleagues.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |
| ClickHouse | [gridalpha/plausible-clickhouse-railway](https://github.com/gridalpha/plausible-clickhouse-railway) | Database |
| plausible | `ghcr.io/plausible/community-edition:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `TZ` | mailpit | UTC | Timestamps shown in the inbox |
| `PORT` | mailpit | 8025 | Web inbox port |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the web inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_SMTP_MAX_RECIPIENTS` | mailpit | 100 | Recipient cap per message |
| `MP_SMTP_AUTH_ALLOW_INSECURE` | mailpit | false | No plaintext auth on the SMTP listener |
| `PORT` | ClickHouse | 8123 | HTTP interface, health-checked on /ping |
| `CLICKHOUSE_DB` | ClickHouse | plausible_events | Database created on first boot |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | Replaces the stock default account |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | Password for that account |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | ClickHouse | 0 | No SQL-level user management |
| `PORT` | plausible | 8000 | HTTP listen port, also health-checked |
| `TMPDIR` | plausible | /var/lib/plausible/tmp | Scratch directory on the volume |
| `BASE_URL` | plausible | - | Public URL used in generated links |
| `MAILER_NAME` | plausible | Plausible Analytics | Sender display name |
| `DATABASE_URL` | plausible | - | Postgres connection string |
| `MAILER_EMAIL` | plausible | - | From address on outgoing mail |
| `MAILER_ADAPTER` | plausible | Bamboo.Mua | SMTP mailer with optional relay |
| `SMTP_HOST_ADDR` | plausible | - | SMTP relay host, private network |
| `SMTP_HOST_PORT` | plausible | 1025 | SMTP relay port |
| `SECRET_KEY_BASE` | plausible | (secret) | Session signing key, min 64 chars |
| `DISABLE_REGISTRATION` | plausible | invite_only | First account exempt, then invite-only |
| `SMTP_HOST_SSL_ENABLED` | plausible | false | Relay listener is plaintext |
| `CLICKHOUSE_DATABASE_URL` | plausible | - | ClickHouse connection string |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `/bin/sh -c 'set -e; mkdir -p /var/lib/plausible/tmp; chown -R 999:nogroup /var/lib/plausible; exec su -s /bin/sh -p -c "export HOME=/var/lib/plausible; id; /entrypoint.sh db createdb && /entrypoint.sh db migrate && exec /entrypoint.sh run" plausible'`
- **Healthcheck:** `/api/health`
- **Volume:** `/var/lib/plausible`

**Category:** Analytics · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/plausible-community-edition)
