# Deploy money-matter on Railway

MoneyMatter – track balances, transactions, and expenses with ease

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/money-matter)

## About

MoneyMatter is an open-source personal finance app. Track balances and transactions with bank connections or manual entry, categorize expenses with AI, manage investments and portfolios, analyze spending patterns, set payment reminders, and monitor budgets. Self-hostable with full control over your financial data.

MoneyMatter is a monorepo application consisting of a Node.js/Express backend API, a Vue 3 frontend SPA with an Astro landing page served via nginx, PostgreSQL for data storage, and Redis for background job queues. It also includes two self-hosted exchange rate microservices for currency conversion. The backend runs database migrations automatically on startup. Most external API keys (AI providers, OAuth, email) are optional — the core budgeting functionality works without them. The template configures all six services with proper internal networking and cross-service variable references.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| frontend | [letehaha/budget-tracker](https://github.com/letehaha/budget-tracker) | Web service |
| letehaha/currency-rates-api:latest | `letehaha/currency-rates-api:latest` | Worker |
| Redis | `redis:8.2.1` | Database |
| lineofflight/frankfurter | `lineofflight/frankfurter` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| backend | [letehaha/budget-tracker](https://github.com/letehaha/budget-tracker) (root: /docker/prod/backend) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `VITE_APP_API_VER` | frontend | /api/v1 | - |
| `VITE_LOGO_DEV_TOKEN` | frontend | (secret) | LogoDev token to be able to fetch companies logos |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `NODE_ENV` | backend | production | - |
| `ADMIN_USERS` | backend | - | Comma-separated usernames with admin access. Adds a few extra brute-force buttons |
| `FMP_API_KEY` | backend | (secret) | Investment securities data |
| `AUTH_RP_NAME` | backend | MoneyMatter | - |
| `GROQ_API_KEY` | backend | (secret) | AI transaction categorization (any ONE is enough) |
| `GEMINI_API_KEY` | backend | (secret) | AI transaction categorization (any ONE is enough) |
| `OPENAI_API_KEY` | backend | (secret) | AI transaction categorization (any ONE is enough) |
| `RESEND_API_KEY` | backend | (secret) | Email notifications (verification, payment reminders) |
| `POLYGON_API_KEY` | backend | (secret) | Investment securities data |
| `APPLICATION_PORT` | backend | 8081 | - |
| `GITHUB_CLIENT_ID` | backend | - | GitHub OAuth login |
| `GOOGLE_CLIENT_ID` | backend | - | Google OAuth login |
| `ANTHROPIC_API_KEY` | backend | (secret) | AI transaction categorization (any ONE is enough) |
| `RESEND_FROM_EMAIL` | backend | - | Email address from which emails will come. Required if wanna use Resend |
| `BETTER_AUTH_SECRET` | backend | (secret) | - |
| `GITHUB_CLIENT_SECRET` | backend | (secret) | GitHub OAuth login |
| `GOOGLE_CLIENT_SECRET` | backend | (secret) | Google OAuth login |
| `ALPHA_VANTAGE_API_KEY` | backend | (secret) | Investment securities data |
| `APP_SESSION_ID_SECRET` | backend | (secret) | - |
| `APPLICATION_DB_DIALECT` | backend | postgres | - |
| `APPLICATION_JWT_SECRET` | backend | (secret) | - |
| `APPLICATION_DB_PASSWORD` | backend | (secret) | - |
| `APPLICATION_DB_USERNAME` | backend | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, Vue, JavaScript, Astro, CSS, Shell, Dockerfile, Python, HTML

[View on Railway →](https://railway.com/deploy/money-matter)
