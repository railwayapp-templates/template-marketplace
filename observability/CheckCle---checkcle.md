# Deploy CheckCle on Railway

Deploy and host a CheckCle instance.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/checkcle)

## About

CheckCle is an Open Source Full-Stack Monitoring System Platform, delivered with precision for uptime monitoring, server metrics, and smart alerts.

Hosting CheckCle involves running its official Docker image to spin up a full-featured monitoring stack. It includes uptime checks, system resource tracking, SSL/domain monitors, and multi-channel alerting. Railway makes it easy to deploy CheckCle with built-in persistent volumes and environment configuration, requiring little manual setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| CheckCle | `operacle/checkcle:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ADMIN_EMAIL` | - | Email the admin account should be using. |
| `ADMIN_PASSWORD` | (secret) | Admin password for the checkcle service. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/mnt/pb_data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/checkcle)
