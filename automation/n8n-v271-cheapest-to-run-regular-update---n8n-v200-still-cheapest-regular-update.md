# Deploy n8n v2.7.1 (cheapest to run, regular update) on Railway

Flexible AI workflow automation for technical teams.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-v200-still-cheapest-regular-update)

## About

n8n is a powerful workflow automation tool that allows you to connect various services and apps. This template uses SQLite as the database, making it the most cost-effective option for hosting n8n on Railway with minimal resource usage.

Hosting n8n with SQLite on Railway provides a budget-friendly solution for workflow automation. SQLite eliminates the need for a separate database service, reducing costs significantly. This setup is perfect for individual users or small teams who need reliable automation without high hosting expenses. The deployment includes persistent volume storage for SQLite data, ensuring your workflows and credentials are safely stored between deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | `n8nio/n8n:2.7.1` | Web service |
| task-runners | `n8nio/runners:2.7.1` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | n8n | 5678 |
| `N8N_PORT` | n8n | 5678 |
| `N8N_PROXY_HOPS` | n8n | 1 |
| `N8N_USER_FOLDER` | n8n | /home/node |
| `N8N_RUNNERS_MODE` | n8n | external |
| `DB_SQLITE_POOL_SIZE` | n8n | 4 |
| `N8N_RUNNERS_ENABLED` | n8n | true |
| `N8N_RUNNERS_AUTH_TOKEN` | n8n | (secret) |
| `N8N_NATIVE_PYTHON_RUNNER` | n8n | true |
| `N8N_RUNNERS_BROKER_LISTEN_ADDRESS` | n8n | 0.0.0.0 |
| `N8N_RUNNERS_AUTH_TOKEN` | task-runners | (secret) |
| `N8N_RUNNERS_TASK_BROKER_URI` | task-runners | http://n8n:5679 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-v200-still-cheapest-regular-update)
