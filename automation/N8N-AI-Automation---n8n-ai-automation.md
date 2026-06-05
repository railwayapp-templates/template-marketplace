# Deploy N8N AI Automation on Railway

Free and open fair-code licensed node based Workflow Automation Tool.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-ai-automation)

## About

n8n is an open-source workflow automation platform that connects APIs, databases, AI models, and third-party services through a visual workflow builder. Create automations, AI agents, ETL pipelines, notifications, and integrations without managing complex infrastructure. This template deploys a self-hosted n8n instance with persistent storage for reliable workflow automation.

Hosting n8n requires a reliable runtime environment, persistent storage, and secure configuration for credentials and workflows. This template provides a streamlined deployment experience using the official n8n Docker image, allowing you to launch a self-hosted automation platform in minutes.

Once deployed, you can build workflows visually, connect to hundreds of services, create AI-powered automations, schedule jobs, process webhooks, and orchestrate business processes from a single interface. A persistent volume ensures your workflows, credentials, and execution data remain available across deployments and restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| N8N | `n8nio/n8n:latest` | Web service |

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
- **Volume:** `/n8n_data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-ai-automation)
