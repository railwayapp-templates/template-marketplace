# Deploy SimpleHub on Railway

API monitor & proxy manager for OpenAI, NewAPI & multi-model LLMs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/simplehub)

## About

SimpleHub is an open-source AI API management and monitoring platform that helps you manage multiple AI providers from a single dashboard. It supports balance monitoring, automatic check-ins, model synchronization, notifications, and centralized management for providers like NewAPI, Velora, VOAPI, DoneHub, and many others.

Deploying SimpleHub on Railway provides a fast and reliable way to manage your AI API providers without maintaining servers or infrastructure. Railway automatically provisions networking, HTTPS, and persistent storage while SimpleHub offers a modern web interface for monitoring API balances, tracking model availability, performing automatic check-ins, and receiving notifications. The Railway template is production-ready and uses SQLite with persistent storage by default, so no external database is required. After deployment, simply open the dashboard, configure your API providers, and begin monitoring all of your AI services from one centralized location.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jwy87/simplehub:latest | `ghcr.io/jwy87/simplehub:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SMTP_USER` | (secret) | - |
| `ADMIN_EMAIL` | "admin@example.com" | Add any sample email |
| `ADMIN_PASSWORD` | (secret) | Passward can be changed |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/simplehub)
