# Deploy N8N (cheapest to run, just updated!) on Railway

Flexible AI workflow automation for technical teams.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-cheapest-to-run)

## About

n8n is a powerful workflow automation tool that allows you to connect various services and apps. This template uses SQLite as the database, making it the most cost-effective option for hosting n8n on Railway with minimal resource usage.

Hosting n8n with SQLite on Railway provides a budget-friendly solution for workflow automation. SQLite eliminates the need for a separate database service, reducing costs significantly. This setup is perfect for individual users or small teams who need reliable automation without high hosting expenses. The deployment includes persistent volume storage for SQLite data, ensuring your workflows and credentials are safely stored between deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | `n8nio/n8n:1.121.3` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 5678 |
| `N8N_PORT` | 5678 |
| `N8N_PROXY_HOPS` | 1 |
| `DB_SQLITE_POOL_SIZE` | 4 |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.n8n/`

**Category:** Other

[View on Railway →](https://railway.com/deploy/n8n-cheapest-to-run)
