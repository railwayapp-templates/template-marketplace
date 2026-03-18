# Deploy Ascent Vue on Railway

A production-ready Vue SaaS app built on The Boring JavaScript Stack

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/ascent-vue)

## About

Ascent Vue is a full-stack Vue SaaS template built on The Boring JavaScript Stack. It combines Sails.js backend with Vue 3 frontend using Inertia.js for seamless server-side rendering without an API layer, featuring built-in authentication, team management, and PrimeReact UI components.

Ascent Vue is a modern monolith that requires a Node.js runtime and a database. 

The template uses Sails.js MVC framework with Waterline ORM (supporting PostgreSQL, MySQL, or SQLite) and serves React components via Inertia.js. 

Deployment involves building frontend assets with Rsbuild, running database migrations, and starting the Node.js server. 

The application includes session-based authentication with password, magic link, and OAuth strategies, making it ideal for rapid SaaS development. 

Railway handles the build process automatically, provisions the database, and manages environment configuration with zero additional setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |
| boring-stack | [sailscastshq/boring-stack](https://github.com/sailscastshq/boring-stack) (root: templates/ascent-vue) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `MAIL_PORT` | boring-stack | 2525 | - |
| `R2_BUCKET` | boring-stack | - | Cloudflare R2 bucket name where uploaded files will be stored |
| `REDIS_URL` | boring-stack | - | Connection string to the Redis instance to be used as a session store. |
| `MAIL_MAILER` | boring-stack | SMTP | - |
| `R2_ENDPOINT` | boring-stack | - | Cloudflare R2 endpoint URL |
| `DATABASE_URL` | boring-stack | - | Connection string to your database |
| `MAIL_PASSWORD` | boring-stack | (secret) | - |
| `MAIL_USERNAME` | boring-stack | (secret) | - |
| `R2_ACCESS_KEY` | boring-stack | - | Cloudflare R2 access key ID for file uploads and storage |
| `R2_SECRET_KEY` | boring-stack | (secret) | Cloudflare R2 secret access key for authentication |
| `SESSION_SECRET` | boring-stack | (secret) | A unique production session secret. |
| `LEMON_SQUEEZY_API_KEY` | boring-stack | (secret) | Lemon Squeezy API key for payment processing |
| `LEMON_SQUEEZY_STORE_ID` | boring-stack | - | Your Lemon Squeezy store ID number for payment processing |
| `LEMON_SQUEEZY_REDIRECT_URL` | boring-stack | - | URL to redirect after payment completion |
| `LEMON_SQUEEZY_SIGNING_SECRET` | boring-stack | (secret) | Webhook signing secret from Lemon Squeezy for secure webhook verification |
| `LEMON_SQUEEZY_PRO_YEARLY_VARIANT_ID` | boring-stack | - | Lemon Squeezy variant ID for Pro plan yearly subscription |
| `LEMON_SQUEEZY_PRO_MONTHLY_VARIANT_ID` | boring-stack | - | Lemon Squeezy variant ID for Pro plan monthly subscription |
| `LEMON_SQUEEZY_STARTER_YEARLY_VARIANT_ID` | boring-stack | - | Lemon Squeezy variant ID for Starter plan yearly subscription |
| `LEMON_SQUEEZY_STARTER_MONTHLY_VARIANT_ID` | boring-stack | - | Lemon Squeezy variant ID for Starter plan monthly subscription |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Starters · **Languages:** JavaScript, EJS, Vue, Svelte, CSS, Dockerfile, TypeScript, Shell

[View on Railway →](https://railway.com/template/ascent-vue)
