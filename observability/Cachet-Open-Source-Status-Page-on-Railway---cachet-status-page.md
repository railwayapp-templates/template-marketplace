# Deploy Cachet | Open-Source Status Page on Railway on Railway

Self-host Cachet. Incident communication w/ components, incidents & metrics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cachet-status-page)

## About

Deploy Cachet on Railway to run a beautiful, open-source status page system that keeps your users informed during outages, incidents, and scheduled maintenance. Self-host Cachet with full control over your branding, components, and incident communication — backed by 15k+ GitHub stars and trusted by organizations from startups to Fortune 500 companies.

Run Cachet on Railway with a pre-configured PostgreSQL database, automated TLS, and a public HTTPS URL ready for your team. The first visit launches a setup wizard where you name your status page, create an admin account, and start adding components — no CLI access or config files required.

Cachet is an open-source status page system built with PHP (Laravel). It provides a clean public-facing page where users check service health, and a dashboard where your team manages incidents, components, and metrics.

- **Component management** — group services by category, set statuses (Operational, Performance Issues, Partial Outage, Major Outage)
- **Incident reporting** — create, update, and resolve incidents with timestamped messages visible on the public page
- **Scheduled maintenance** — announce upcoming maintenance windows so users know what to expect
- **Custom metrics** — display graphs of response time, uptime percentage, or any custom data via the API
- **Subscriber notifications** — users subscribe by email and receive automatic updates when incidents are created or updated
- **JSON API** — programmatic access to components, incidents, metrics, and subscribers for automation and monitoring integrations
- **Multi-language support** — translated into 30+ languages with full i18n

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Cachet | `cachethq/docker:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/cachet-status-page)
