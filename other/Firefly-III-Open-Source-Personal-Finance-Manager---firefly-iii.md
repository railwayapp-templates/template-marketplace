# Deploy Firefly III | Open-Source Personal Finance Manager on Railway

Self Host Firefly III. Personal finance, budgets, multi-currency & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/firefly-iii)

## About

Deploy Firefly III on Railway to run your own private, open-source personal finance manager with full double-entry bookkeeping, budgets, categories, and multi-currency support. Self-host Firefly III with complete data ownership — no ads, no tracking, no third-party access to your financial data.

This Railway template pre-configures **Firefly III** (`fireflyiii/core:latest`) with a **PostgreSQL** database, persistent upload storage, and production-ready environment variables including secure encryption keys and trusted proxy settings behind Railway's TLS-terminating edge.

Firefly III is a free, open-source (AGPLv3) personal finance manager created by James Cole. It uses double-entry bookkeeping — every transaction has both a source and a destination — giving you an accurate picture of where money flows. Unlike cloud-based tools like YNAB or Mint, Firefly III runs entirely on your own infrastructure and never contacts external servers unless you explicitly configure it to.

Key features of self-hosted Firefly III include:

- **Double-entry bookkeeping** with support for withdrawals, deposits, and transfers
- **Multi-currency support** — track accounts and transactions in any currency
- **Budgets, categories, and tags** for organizing spending
- **Advanced rule engine** that auto-categorizes transactions based on conditions
- **Data Importer** for CSV, OFX, and bank-connected imports via Spectre/Nordigen
- **JSON REST API** with full CRUD access and optional webhooks
- **Recurring transactions** for automated entries on schedules
- **Reports and charts** showing spending per week, month, year, or custom range

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Firefly III | `fireflyiii/core:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | Firefly III | UTC | Application timezone |
| `PORT` | Firefly III | 8080 | HTTP server listening port |
| `APP_ENV` | Firefly III | production | Application environment mode |
| `APP_KEY` | Firefly III | - | 32-char encryption key for sessions |
| `APP_URL` | Firefly III | - | Public-facing application URL |
| `DB_HOST` | Firefly III | - | PostgreSQL hostname via Railway ref |
| `DB_PORT` | Firefly III | - | PostgreSQL port via Railway ref |
| `APP_DEBUG` | Firefly III | false | Disable debug output in production |
| `SITE_OWNER` | Firefly III | mail@example.com | Admin contact email address |
| `DB_DATABASE` | Firefly III | - | Database name via Railway ref |
| `DB_PASSWORD` | Firefly III | (secret) | Database password via Railway ref |
| `DB_USERNAME` | Firefly III | (secret) | Database user via Railway ref |
| `LOG_CHANNEL` | Firefly III | stack | Laravel log output destination |
| `MAIL_MAILER` | Firefly III | log | Mail driver (log = no email) |
| `CACHE_DRIVER` | Firefly III | file | Cache backend driver |
| `APP_LOG_LEVEL` | Firefly III | notice | Minimum log severity level |
| `COOKIE_SECURE` | Firefly III | true | Enforce HTTPS-only cookies |
| `DB_CONNECTION` | Firefly III | pgsql | Database driver type |
| `SESSION_DRIVER` | Firefly III | file | Session storage driver |
| `COOKIE_SAMESITE` | Firefly III | lax | Cookie SameSite attribute |
| `TRUSTED_PROXIES` | Firefly III | * | Trust Railway's TLS-terminating proxy |
| `DEFAULT_LANGUAGE` | Firefly III | en_US | Default UI language for users |
| `STATIC_CRON_TOKEN` | Firefly III | (secret) | Token for cron endpoint auth |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |

## Configuration

- **Start command:** `/bin/sh -c 'mkdir -p /var/www/html/storage/framework/views/twig /var/www/html/storage/framework/cache/data /var/www/html/storage/framework/sessions /var/www/html/storage/logs && chmod -R 777 /var/www/html/storage && (sleep 90; chmod -R 777 /var/www/html/storage) & exec docker-php-serversideup-entrypoint /init'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage/upload`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/firefly-iii)
