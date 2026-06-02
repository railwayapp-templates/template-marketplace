# Deploy n8n – Minimal Instance on Railway

Self-hosted, lightweight and cost-efficient workflow automation 🚀

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-minimal-instance)

## About

n8n – Minimal Instance is a lightweight, single-node deployment of n8n designed for simple and efficient workflow automation. It runs without external dependencies like Redis or PostgreSQL, using persistent storage instead. This setup is ideal for users who want a fast, low-cost, and self-contained automation environment.

Hosting n8n – Minimal Instance involves deploying a single container that runs the n8n workflow automation engine without additional infrastructure components such as Redis or PostgreSQL. Instead, it relies on built-in storage with persistent volumes to retain workflows, credentials, and execution data. This approach simplifies deployment and reduces operational overhead while still providing reliable automation capabilities. It is especially suitable for users who already have external services or those who prioritize simplicity, cost efficiency, and quick setup over horizontal scalability.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | `ghcr.io/n8n-io/n8n` | Web service |

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

[View on Railway →](https://railway.com/deploy/n8n-minimal-instance)
