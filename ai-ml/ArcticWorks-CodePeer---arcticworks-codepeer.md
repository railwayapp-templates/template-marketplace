# Deploy ArcticWorks CodePeer on Railway

Self-hosted AI code reviewer for GitHub pull requests.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/arcticworks-codepeer)

## About

ArcticWorks CodePeer is a self-hosted AI code reviewer for GitHub. Install it as your own GitHub App and it watches every repository you give it access to: on each pull request it fetches the diff, runs a team of specialist LLM agents over it, and posts a review with a summary, severity-tagged inline comments, and one-click fix suggestions.

CodePeer is a headless Go server with no web UI. It needs two things to run: a Postgres database, which stores installations, reviews, learning signals, and the job queue, and a public HTTPS endpoint that GitHub can deliver webhooks to. This template provisions both, wires `DATABASE_URL` between them, and exposes the bot on a Railway domain. Database migrations run automatically on startup, and health endpoints at `/healthz` and `/readyz` report liveness and database reachability. You supply your own GitHub App credentials and DeepSeek API key at deploy time, so your code and your secrets stay in infrastructure you control.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| arcticworks-codepeer | [ArcticWorks-Software-Company/arcticworks-codepeer](https://github.com/ArcticWorks-Software-Company/arcticworks-codepeer) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | arcticworks-codepeer | 8080 | HTTP port the bot listens on. Leave this at 8080. |
| `BOT_LOGIN` | arcticworks-codepeer | (secret) | The bot's GitHub login, used to ignore its own events. Optional: resolved automatically when left empty. |
| `LLM_MODEL` | arcticworks-codepeer | deepseek-v4-flash | Review model served by LLM_BASE_URL, for example deepseek-v4-flash. |
| `LOG_LEVEL` | arcticworks-codepeer | info | Log verbosity: debug, info, warn, or error. |
| `LLM_API_KEY` | arcticworks-codepeer | (secret) | DeepSeek API key. Every pull request review is run through this key. |
| `LLM_TIMEOUT` | arcticworks-codepeer | 300s | Timeout for a single model call, as a Go duration such as 300s. |
| `DATABASE_URL` | arcticworks-codepeer | - | Postgres connection string, referenced from the Postgres service. Leave this as it is. |
| `LLM_BASE_URL` | arcticworks-codepeer | https://api.deepseek.com | Base URL of the OpenAI-compatible API serving the review model. Defaults to DeepSeek. |
| `GITHUB_APP_ID` | arcticworks-codepeer | - | App ID from your GitHub App's settings page. |
| `QUEUE_WORKERS` | arcticworks-codepeer | 2 | How many workers pull review jobs from the queue at once. |
| `QUEUE_LEASE_TTL` | arcticworks-codepeer | 15m | How long a worker holds a review job before it returns to the queue. |
| `QUEUE_MAX_ATTEMPTS` | arcticworks-codepeer | 5 | How many times a failed review job is retried before it is dropped. |
| `QUEUE_POLL_INTERVAL` | arcticworks-codepeer | 2s | How often a worker polls the queue for new jobs, as a Go duration. |
| `GITHUB_APP_CLIENT_ID` | arcticworks-codepeer | - | Client ID from your GitHub App. Optional: used as the JWT issuer when set. |
| `LLM_REASONING_EFFORT` | arcticworks-codepeer | high | Thinking effort for the review model: low, high, or max. |
| `GITHUB_WEBHOOK_SECRET` | arcticworks-codepeer | (secret) | Webhook secret. Generated for you: copy this value into your GitHub App's webhook settings after deploying. |
| `GITHUB_APP_PRIVATE_KEY` | arcticworks-codepeer | - | Your GitHub App's private key. Paste the PEM contents, or the PEM base64-encoded to keep it on one line. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Go, PowerShell, Dockerfile

[View on Railway →](https://railway.com/deploy/arcticworks-codepeer)
