# Deploy n8n on Railway

n8n on Postgres, your owner account created at deploy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-9)

## About

[n8n](https://github.com/n8n-io/n8n) is a workflow automation tool: visual flows with hundreds of integrations, webhooks, schedules, code steps and AI agent nodes.

This template runs the official image (2.40.7) on Postgres, with n8n's folder on a volume for community nodes and binary data.

A fresh n8n asks whoever opens it first to create the owner account. On a public URL that can be anyone, and most templates leave it open until you get there. This one sets the owner up for you: the deploy form asks for your email, a password is generated into `N8N_OWNER_PASSWORD`, and a start step creates the owner once n8n is ready, then signs in to confirm it. Open `N8N_URL` and sign in with that email and password.

My first version of that step fired as soon as `/healthz` answered, which is while the database migrations are still running, and in my test the owner it created didn't stick: a second setup request from another address then succeeded. The step now waits for `/healthz/readiness` and retries until signing in works.

Before publishing I tested the final version on a fresh deploy. The start step reported the owner as set up, a setup request from another address was refused with "Instance owner already setup", and the owner signed in with the owner role. A workflow with a webhook trigger, created and activated through the API, ran with status success when I called the webhook. After a restart the workflow was still active and its webhook still answered.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| n8n | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /n8n) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | n8n | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password (generated) |
| `PORT` | n8n | 5678 | Port Railway routes to |
| `DB_TYPE` | n8n | postgresdb | Use Postgres |
| `N8N_URL` | n8n | - | Open this and sign in with N8N_OWNER_EMAIL and N8N_OWNER_PASSWORD |
| `N8N_HOST` | n8n | - | Public host name |
| `N8N_PORT` | n8n | 5678 | n8n port |
| `WEBHOOK_URL` | n8n | - | Base URL for webhooks. Change it when you add a custom domain |
| `N8N_PROTOCOL` | n8n | https | Railway serves HTTPS |
| `N8N_PROXY_HOPS` | n8n | 1 | Behind Railway's proxy |
| `N8N_OWNER_EMAIL` | n8n | - | Email of the owner account, set up on first start. Sign in with it and N8N_OWNER_PASSWORD |
| `GENERIC_TIMEZONE` | n8n | UTC | Time zone for schedules |
| `DB_POSTGRESDB_HOST` | n8n | - | Postgres over the private network |
| `DB_POSTGRESDB_PORT` | n8n | 5432 | Postgres port |
| `DB_POSTGRESDB_USER` | n8n | (secret) | Database user |
| `N8N_ENCRYPTION_KEY` | n8n | - | Encrypts stored credentials (generated). Keep it |
| `N8N_OWNER_PASSWORD` | n8n | (secret) | Password of the owner account (generated) |
| `N8N_RUNNERS_ENABLED` | n8n | true | Run Code nodes in task runners |
| `DB_POSTGRESDB_DATABASE` | n8n | - | Database name |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | Database password |
| `N8N_DIAGNOSTICS_ENABLED` | n8n | false | No telemetry |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.n8n`

**Category:** Automation · **Tags:** n8n, automation, workflows, zapier-alternative, postgres, ai-agents · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/n8n-9)
