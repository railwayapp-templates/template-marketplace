# Deploy n8n Single Node on Railway

Workflow automation platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/n8n-single-node)

## About

n8n is a fair-code licensed workflow automation platform that combines visual building with custom code. With 400+ integrations and native AI capabilities, it lets you automate everything from simple tasks to complex multi-step AI agent workflows. This single node template runs one n8n instance with the built-in SQLite database for a low-cost, minimal-dependency deployment.

This template deploys a single n8n instance using the default SQLite database for storage, making it the most cost-effective way to self-host n8n. Since it runs only one container with no external database or Redis dependency, resource usage and costs stay minimal. The instance handles the web UI, workflow execution, webhook triggers, and scheduling all in one process. The timezone is configured for Australia/Sydney. This single-instance setup is well-suited for individuals, small teams, or anyone getting started with self-hosted workflow automation without needing the horizontal scaling of queue mode.

> **Note:** This is a single instance deployment. It does not support queue mode or horizontal scaling with workers. For high-volume production workloads requiring distributed execution, consider a multi-node setup with PostgreSQL and Redis.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | `ghcr.io/n8n-io/n8n:latest` | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `TZ` | Server timezone |
| `WEBHOOK_URL` | Webhook endpoint |
| `GENERIC_TIMEZONE` | The n8n instance timezone |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/template/n8n-single-node)
