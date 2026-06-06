# Deploy Fable on Railway

Developer-led localisation platform with AI translation and QA.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fable)

## About

Fable is an open source localisation platform for developer led teams and open source projects. It helps you manage translation keys, import and export i18n files, collaborate with translators, and ship multilingual software. AI assisted translation, GitHub sync, and billing are available when you configure the optional integrations.

Hosting Fable requires PostgreSQL for all application data and Redis for background job queues. The main web service is a Next.js application that serves the UI, tRPC API, and authentication. A separate worker service is recommended to process machine translation, QA checks, repository sync, and webhook delivery jobs. Database schema is applied via a one off Drizzle migration service before or alongside your web deploy. OpenAI, Stripe, and GitHub App credentials are optional; those features stay disabled until you add them. Railway simplifies deployment by provisioning Postgres and Redis, wiring environment variables between services, and running health checks against `/api/health`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Web | [EggsLeggs/fable](https://github.com/EggsLeggs/fable) | Web service |
| Migrate | [EggsLeggs/fable](https://github.com/EggsLeggs/fable) | Worker |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_URL` | Web | - | Redis connection URL for BullMQ worker queues (MT, QA, VCS sync, webhooks) |
| `DIRECT_URL` | Web | - | Direct Postgres connection string for migrations and db:push (non-pooled) |
| `DATABASE_URL` | Web | - | Pooled Postgres connection string used by the app at runtime |
| `GITHUB_APP_ID` | Web | - | Numeric ID of your GitHub App |
| `OPENAI_API_KEY` | Web | (secret) | OpenAI API key for AI-powered machine translation |
| `GITHUB_APP_SLUG` | Web | - | URL slug of your GitHub App (used in install links) |
| `TRUSTED_ORIGINS` | Web | - | Comma-separated allowed origins for Better Auth CORS |
| `STRIPE_SECRET_KEY` | Web | (secret) | Stripe secret API key from the Stripe dashboard |
| `BETTER_AUTH_SECRET` | Web | (secret) | Secret for signing Better Auth sessions; use a long random string |
| `GITHUB_PRIVATE_KEY` | Web | - | PEM private key for the GitHub App (escape newlines as \n) |
| `NEXT_PUBLIC_APP_URL` | Web | - | Public base URL of the web app (auth callbacks, Stripe redirects) |
| `GITHUB_WEBHOOK_SECRET` | Web | (secret) | Webhook secret from your GitHub App settings |
| `STRIPE_WEBHOOK_SECRET` | Web | (secret) | Signing secret for the /api/stripe/webhook endpoint |
| `STRIPE_MT_METERED_PRICE_ID` | Web | - | Price ID for metered MT character usage billing |
| `STRIPE_PRO_ANNUAL_PRICE_ID` | Web | - | Price ID for Fable Pro annual subscription ($313.20) |
| `STRIPE_PRO_MONTHLY_PRICE_ID` | Web | - | Price ID for Fable Pro monthly subscription ($29) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Web | - | Stripe publishable key (client-side; optional) |
| `DIRECT_URL` | Migrate | - | Postgres connection string for migrations |
| `DATABASE_URL` | Migrate | - | Postgres connection string for migrations |
| `REDISHOST` | Redis | - | Internal hostname for Redis on the Railway private network |
| `REDISPORT` | Redis | 6379 | Internal Redis port (default 6379) |
| `REDISUSER` | Redis | default | Redis username (default user) |
| `REDIS_URL` | Redis | - | Internal connection URL; this is what Fable uses for BullMQ queues |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD used by Railway templates |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated 32-character Redis password |
| `REDIS_PUBLIC_URL` | Redis | - | Public TCP proxy URL for external access; Fable does not use this in production |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Internal connection URL; Fable uses this for the app and migrations on Railway |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created when the Postgres service is provisioned |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated 32-character Postgres password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public TCP proxy URL for external access (local dev tools, Drizzle Studio); Fable does not use this in production |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, CSS, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/fable)
