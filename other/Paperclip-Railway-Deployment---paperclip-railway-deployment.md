# Deploy Paperclip Railway Deployment on Railway

Deploy and Host Paperclip with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperclip-railway-deployment)

## About

Paperclip is an open-source orchestration control plane for AI agent companies. It gives your AI agents organizational structure — org charts, task assignments, budget tracking, and governance. Think of it as Linear or Jira, but your employees are AI agents. Paperclip coordinates who does what, tracks progress, and keeps agents accountable.

Deploying Paperclip on Railway takes about 15 minutes. Click the deploy button, wait for the build to complete, and generate a public domain. On first boot, Paperclip initializes an embedded PostgreSQL database, applies migrations, and generates an admin invite URL in the deploy logs. Open that URL to create your account and company. Paperclip runs as a single container with embedded storage — no external database or additional services required. The template handles authentication setup, secret generation, and exposure mode automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| paperclip-railway | [wwilson1017/paperclip-railway](https://github.com/wwilson1017/paperclip-railway) | Web service |

## Configuration

- **Start command:** `/usr/local/bin/railway-entrypoint.sh`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/paperclip-railway-deployment)
