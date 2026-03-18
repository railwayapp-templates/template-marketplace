# Deploy rundown on Railway

AI-powered RSS reader that helps you read less and learn more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/rundown-1)

## About

**rundown** is an AI-powered RSS reader that monitors your subscribed feeds, automatically summarizes new or updated articles using OpenAI, and sends notifications to Discord. Each user can customize the summary language and length, enabling efficient information consumption without reading every article in full.

Hosting **rundown** on Railway involves deploying multiple services working together: a Next.js frontend with BFF, a BullMQ worker for background jobs, Redis for queue management, PostgreSQL for persistent storage, and a Bootstrap service for post-deployment tasks like running migrations and registering cron jobs. With Railway’s template feature, you can spin up the entire stack in minutes—just provide your OpenAI API key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Crawl | [howyi/rundown](https://github.com/howyi/rundown) | Worker |
| App | [howyi/rundown](https://github.com/howyi/rundown) | Web service |
| Boostrap | [howyi/rundown](https://github.com/howyi/rundown) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `OPENAI_API_KEY` | Crawl | (secret) | - |
| `OPENAI_API_KEY` | App | (secret) | - |
| `BETTER_AUTH_SECRET` | App | (secret) | - |
| `OPENAI_API_KEY` | Boostrap | (secret) | OpenAI API Key |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/template/rundown-1)
