# Deploy Langflow | (Just Updated) Visual AI Agent Builder That Actually Boots on Railway

Boots first try: admin seeded, files kept, DB private, version pinned.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langflow-or-just-updated-visual-ai-agent)

## About

Langflow is a visual builder for AI agents and LLM workflows: drag components onto a canvas, wire them together, test the flow in a playground, and publish it as an API endpoint. This template runs Langflow 1.11.4 with Postgres, a persistent volume, and an administrator account that is created for you at deploy time.

Langflow ships with browser authentication switched on, which means it refuses to start unless an administrator username and password are supplied before the first boot — the process raises `ValueError: Username and password must be set` and the worker exits. It also keeps uploaded files, its MCP configuration and its cache under `/app/data`, and stores flows, credentials and users in Postgres. This template supplies the credentials, mounts a volume at `/app/data`, connects to Postgres over Railway's private network rather than a public TCP proxy, and pins the image by digest because Langflow migrates its schema forward on every boot. The administrator password is re-applied on each boot, so redeploying the service is a working password reset — Langflow itself offers no other way to change it once the account exists.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| langflow | `ghcr.io/bon5co/langflow-railway:1.11.4` | Web service |
| postgres | `postgres:17.10-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `LANGFLOW_SECRET_KEY` | langflow | (secret) |
| `LANGFLOW_SUPERUSER_PASSWORD` | langflow | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Healthcheck:** `/health_check`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Volume:** `/var/lib/postgresql`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/langflow-or-just-updated-visual-ai-agent)
