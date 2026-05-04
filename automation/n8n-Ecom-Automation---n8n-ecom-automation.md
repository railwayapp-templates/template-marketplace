# Deploy n8n Ecom Automation on Railway

Self-hosted n8n with 7 pre-built Shopify automations

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-ecom-automation)

## About

n8n Ecom Automation is a self-hosted n8n instance pre-loaded with 7 ready-to-activate Shopify workflows — abandoned cart recovery, order notifications, low stock alerts, review requests, failed payment alerts, weekly sales reports, and VIP customer tagging. A self-hosted alternative to Zapier and Make with no per-task pricing, built specifically for ecom stores.

The core n8n platform is free and open-source under the Sustainable Use License, giving you complete flexibility without per-execution pricing. Hosting n8n Ecom Automation on Railway provisions the n8n app with all 7 ecom workflows automatically imported on first boot, plus a persistent volume for credentials and workflow data — so you get a fully working ecom automation suite in minutes. Railway gives every new user a $5 free trial when signing up with GitHub, enough to run n8n Ecom Automation free for about a month before committing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n-ecom | [Amritasha/n8n-ecom](https://github.com/Amritasha/n8n-ecom) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `WEBHOOK_URL` | - | Your Railway domain e.g. https://xyz.up.railway.app |
| `GENERIC_TIMEZONE` | America/New_York | Your timezone |
| `N8N_ENCRYPTION_KEY` | - | Run openssl rand -hex 16 to generate |
| `N8N_BASIC_AUTH_USER` | (secret) | admin |
| `N8N_BASIC_AUTH_PASSWORD` | (secret) | Your n8n login password |

## Configuration

- **Volume:** `/home/node/.n8n`

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/n8n-ecom-automation)
