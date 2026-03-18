# Deploy Incident Response Agent on Railway

An agentic Incident response agent, powered by Tessera

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/incident-response)

## About

Incident Response Agent is an AI-powered incident response and log analysis service for Railway. It monitors your Railway services, detects issues from logs, analyzes them with LLMs, and posts actionable Slack alerts with recommended remediations. For more detailed setup guide, visit this [guide](https://github.com/tessera-ai/Incident Response Agent-template/blob/main/RAILWAY_TEMPLATE.md) for a section walkthrough.

This template deploys a Phoenix/Elixir service with an attached Postgres database on Railway. It streams Railway logs, processes incidents with OpenAI (optionally Anthropic), and integrates with Slack for alerts and remediation updates. Required env vars are limited to secrets (OpenAI, Slack, Railway API token, secret key base); Railway injects runtime metadata and database URL. Optional monitoring lists and tuning flags can be left unset—the code supplies sane defaults.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Incident Response Agent | [tessera-ai/incident-response-template](https://github.com/tessera-ai/incident-response-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `OPENAI_API_KEY` | Incident Response Agent | (secret) | Open AI API Key |
| `SECRET_KEY_BASE` | Incident Response Agent | (secret) | Unique encryption key for the Phoenix app |
| `SLACK_BOT_TOKEN` | Incident Response Agent | (secret) | Grab it from Slack |
| `SLACK_CHANNEL_ID` | Incident Response Agent | - | Grab it from Slack |
| `SLACK_SIGNING_SECRET` | Incident Response Agent | (secret) | Get from Slack |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** Elixir, HTML, CSS, JavaScript, Shell

[View on Railway →](https://railway.com/template/incident-response)
