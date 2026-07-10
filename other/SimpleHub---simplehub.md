# Deploy SimpleHub on Railway

API monitor & proxy manager for OpenAI, NewAPI & multi-model LLMs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/simplehub)

## About

SimpleHub is an API aggregation monitoring and management platform designed to centrally manage multiple AI API gateways and OpenAI-compatible platforms. It provides automated health checks, balance monitoring, model change detection, daily check-ins, notifications, and scheduling features through a modern web interface.

Hosting SimpleHub requires running a persistent web application together with durable storage for its internal database and application configuration. The application uses SQLite by default and stores all site configurations, monitoring history, authentication data, notification settings, and scheduling information locally.

Railway simplifies deployment by allowing SimpleHub to run as a single Docker service with an attached persistent volume. Railway manages networking, deployments, HTTPS, domains, monitoring, and automatic restarts, while the attached volume ensures that application data survives redeployments and upgrades.

This makes Railway an ideal hosting platform for both personal monitoring dashboards and production monitoring environments managing dozens or hundreds of API providers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jwy87/simplehub:latest | `ghcr.io/jwy87/simplehub:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `JWT_SECRET` | (secret) |
| `ADMIN_EMAIL` | admin@example.com |
| `ADMIN_PASSWORD` | (secret) |
| `ENCRYPTION_KEY` | 86d7286ccfc43a5e3af08eb9b34c6118d84c8dceef0b0e6efad3cc72bdfb6f94 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/simplehub)
