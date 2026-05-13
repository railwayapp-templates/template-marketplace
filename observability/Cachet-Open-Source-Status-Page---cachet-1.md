# Deploy Cachet – Open Source Status Page on Railway

Open source status page. Communicate downtime & build user trust.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cachet-1)

## About

Cachet is the leading open-source status page system trusted by 15,000+ GitHub stars and used by organizations like Boeing, Siemens, Ubuntu, and Michelin. Deploy your own self-hosted, branded status page in one click on Railway — no DevOps expertise required.

**Own your incident communication. No SaaS fees. No vendor lock-in.**

When something goes wrong, your users shouldn't find out from Twitter. Cachet gives you a public-facing status page where visitors check service health in real time, and a secure admin dashboard where your team manages incidents, components, and metrics. Built on Laravel and Vue 3 — fast, maintainable, and production-ready out of the box.

This Railway template deploys Cachet with a pre-configured PostgreSQL database, automated TLS, and a public HTTPS URL ready the moment deployment completes. The first visit launches Cachet's built-in setup wizard — name your status page, set your timezone, create your admin account. No CLI access, no config files, no DevOps knowledge required.

Your data stays on your own Railway infrastructure. You pay for compute and database usage only — a typical Cachet deployment runs under $5/month on Railway. Commercial alternatives like Atlassian Statuspage start at $29/month and scale to $1,499/month for enterprise plans.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Cachet | `cachethq/docker` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Cachet | 8000 | HTTP listening port |
| `APP_ENV` | Cachet | production | Application environment |
| `APP_KEY` | Cachet | - | Laravel encryption key — auto-generated, do not rotate after first boot |
| `APP_LOG` | Cachet | errorlog | Log to stderr for Railway log viewer |
| `APP_URL` | Cachet | - | Public status page URL |
| `DB_HOST` | Cachet | - | PostgreSQL hostname |
| `DB_PORT` | Cachet | - | PostgreSQL port |
| `APP_DEBUG` | Cachet | false | Disable debug mode in production |
| `DB_DRIVER` | Cachet | pgsql | Database driver |
| `DB_PREFIX` | Cachet | chq_ | Database table prefix |
| `MAIL_HOST` | Cachet | - | SMTP server hostname |
| `MAIL_NAME` | Cachet | Cachet | Sender display name |
| `MAIL_PORT` | Cachet | 587 | SMTP server port |
| `DB_DATABASE` | Cachet | - | PostgreSQL database name |
| `DB_PASSWORD` | Cachet | (secret) | PostgreSQL password |
| `DB_USERNAME` | Cachet | (secret) | PostgreSQL username |
| `MAIL_DRIVER` | Cachet | smtp | Email transport for subscriber notifications |
| `CACHET_EMOJI` | Cachet | false | Disable emoji in incident names |
| `CACHE_DRIVER` | Cachet | apc | Cache backend (no Redis needed) |
| `MAIL_ADDRESS` | Cachet | - | Sender email address |
| `QUEUE_DRIVER` | Cachet | database | Queue backend |
| `CACHET_BEACON` | Cachet | false | Disable anonymous usage reporting |
| `MAIL_PASSWORD` | Cachet | (secret) | SMTP authentication password |
| `MAIL_USERNAME` | Cachet | (secret) | SMTP authentication username |
| `SESSION_DRIVER` | Cachet | apc | Session backend |
| `MAIL_ENCRYPTION` | Cachet | tls | SMTP encryption method |
| `TRUSTED_PROXIES` | Cachet | * | Trust all proxies (Railway load balancer) |
| `PHP_MAX_CHILDREN` | Cachet | 5 | PHP-FPM max worker processes |
| `SESSION_SECURE_COOKIE` | Cachet | true | HTTPS-only session cookies |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/cachet-1)
