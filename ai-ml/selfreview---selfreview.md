# Deploy selfreview on Railway

Self-hosted AI code reviewer for GitHub PRs, using cheap open models

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/selfreview)

## About

Selfreview is a self-hosted AI code reviewer for GitHub. Open a pull request and it posts line-level comments on real bugs (security holes, broken logic, async mistakes, money math), each saying what breaks and how to fix it. By default it uses cheap open models through OpenRouter, so a review typically costs $0.002–0.007.

This template deploys one Docker image as three services, plus Postgres:

- **api** receives GitHub webhooks and serves the setup page and the dashboard. It has a public domain and a healthcheck on `/health`.
- **worker** reviews pull requests. When it's redeployed, it gets 120 seconds to finish the review it's working on.
- **cron** runs every 10 minutes. It resends webhooks GitHub failed to deliver and tracks which comments were acted on.
- **Postgres** is both the job queue and the database. It stores metadata only, never code.

Each service takes its role from its service name. `ADMIN_PASSWORD` and `ENCRYPTION_KEY` are generated for you, and the only value you provide is an OpenRouter API key.

After deploying:

1. Open the api service's URL and log in with `ADMIN_PASSWORD` from the api's Variables tab.
2. Click **Create GitHub App** and choose your personal account or an organization. GitHub creates the app with every setting filled in.
3. Install the app on the repositories you want reviewed, then open a pull request.

The project costs about $3 a month while idle.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cron | [hackertron/selfreview](https://github.com/hackertron/selfreview) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| worker | [hackertron/selfreview](https://github.com/hackertron/selfreview) | Worker |
| api | [hackertron/selfreview](https://github.com/hackertron/selfreview) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `OPENROUTER_API_KEY` | worker | (secret) | Your OpenRouter API key (openrouter.ai/keys). Reviews use cheap open models, about $0.002-0.007 each. |
| `ADMIN_PASSWORD` | api | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/selfreview)
