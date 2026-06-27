# Deploy gotify on Railway

Self-hosted push notification server. Send messages from any app or script.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gotify)

## About

Deploy Gotify, a self-hosted push notification server, on Railway in minutes. Send messages to your devices from any application, script, or service using a simple REST API.

Gotify runs as a single Docker container on Railway. The template uses the official gotify/server:2.9.1 image, configured with sensible defaults. Health checks monitor the `/health` endpoint automatically. Data is stored via SQLite in an ephemeral volume — for production workloads, connect a Railway Postgres plugin for durable storage. Railway handles SSL/TLS certificates, domain management, and automatic restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gotify | [INAPP-Mobile/railway-gotify](https://github.com/INAPP-Mobile/railway-gotify) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/gotify)
