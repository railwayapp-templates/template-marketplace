# Deploy theblackonion on Railway

Deploy and Host theblackonion chat with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/theblackonion)

## About

A secure, real-time chat application with advanced features and elite cybersecurity standards.

 Video Guide: https://pub-43cda9e3bc1549aabbf03636b3384795.r2.dev/chatui_deployment_guide.mp4

Deploy your own instance to Railway with a single click:

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gJ90Bm?referralCode=NVp-pJ)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| chat-blackonion | `ghcr.io/hasanshahriar32/chat-blackonion:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `SESSION_SECRET` | chat-blackonion | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/theblackonion)
