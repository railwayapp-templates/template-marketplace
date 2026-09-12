# Deploy Soulacy Personal on Railway

Private AI agent gateway with generated secrets and secure iPhone pairing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/soulacy-personal)

## About

Soulacy Personal is a self-hosted agent gateway for building, running, monitoring, and repairing AI agents. It includes the web workspace, APIs, durable agent data, mobile delivery, approvals, schedules, knowledge, and secure iPhone pairing.

This template builds the official public repository, creates a persistent volume at /home/soulacy/.soulacy, exposes the gateway through Railway networking, and configures health monitoring. A unique gateway API key and a separate JWT signing secret are generated for every deployment. The owner can reveal the gateway key in the service Variables page, sign in to Soulacy, then create a short-lived single-use QR code under Mobile to pair the iOS app.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| soulacy-personal | [vmodekurti/soulacy-personal](https://github.com/vmodekurti/soulacy-personal) (root: .) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SOULACY_AUTH_MODE` | apikey | Keeps the gateway in single-operator API-key authentication mode. |
| `SOULACY_SERVER_HOST` | 0.0.0.0 | Binds Soulacy to Railway networking inside the container. |
| `SOULACY_SERVER_API_KEY` | (secret) | Generated login key. After deployment, reveal and copy this value to sign in once, then use Mobile pairing for iPhone. |
| `SOULACY_AUTH_JWT_SECRET` | (secret) | Generated internal JWT signing secret. Do not use this value as the gateway login key. |
| `SOULACY_DEPLOYMENT_PROFILE` | personal | Enables secure defaults for a personal self-hosted Soulacy workspace. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/soulacy/.soulacy`

**Category:** AI/ML · **Languages:** Go, Svelte, JavaScript, Shell, CSS, Python, HTML, Makefile, Dockerfile, Ruby

[View on Railway →](https://railway.com/deploy/soulacy-personal)
