# Deploy N8N - Railway Template on Railway

Self-hosted workflow automation tool, free and open-source.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-quick-start)

## About

N8N Starter is a self-hosted workflow automation platform that helps you connect APIs, databases, AI services, and business applications using a visual workflow editor. Build automations, integrations, AI-powered workflows, scheduled tasks, and webhook-based processes from a single interface. This template provides a simple way to deploy n8n on Railway with persistent storage included.

Running n8n requires a dependable environment for executing workflows, securely storing credentials, and preserving application data. This template simplifies the deployment process by using the official n8n Docker image together with persistent storage, allowing you to get started quickly without managing infrastructure manually.

After deployment, you can automate repetitive tasks, integrate external services, process incoming webhooks, synchronize data across platforms, and create AI-enhanced workflows. Persistent storage ensures that workflows, credentials, and execution history remain available through updates and restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | `n8nio/n8n:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `N8N_HOST` | 0.0.0.0 |
| `N8N_PORT` | 5678 |
| `N8N_PROTOCOL` | https |
| `GENERIC_TIMEZONE` | UTC |
| `N8N_LISTEN_ADDRESS` | :: |
| `N8N_DIAGNOSTICS_ENABLED` | false |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | true |
| `N8N_CONCURRENCY_PRODUCTION_LIMIT` | 5 |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-quick-start)
