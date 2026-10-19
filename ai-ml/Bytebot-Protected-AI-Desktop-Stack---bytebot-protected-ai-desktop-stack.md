# Deploy Bytebot Protected AI Desktop Stack on Railway

AI desktop agent with Postgres and a generated-password access gateway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bytebot-protected-ai-desktop-stack)

## About

AI desktop agent with Postgres and a generated-password access gateway.

This deployment fork provisions bytebot-ui, bytebot-agent, Postgres, bytebot-desktop, Access Gateway. Application domains and any authored TCP endpoints are generated for each new deployment. Database and queue services are private by default.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl@sha256:34c3e49e7ed2aaef6c575fb23bb37b878007e97752d3bf27ccb550046f893ca7` | Database |
| bytebot-ui | `ghcr.io/bytebot-ai/bytebot-ui@sha256:492d57da67513582dd15cde892dc8b29b9a6deec62c9e2b4e2c86e168c22302f` | Worker |
| Access Gateway | `caddy@sha256:d8542f48d34a9cf4e4c11a478865229840e87e4c96ea3f439101f31a5d35f75f` | Web service |
| bytebot-agent | `ghcr.io/bytebot-ai/bytebot-agent@sha256:a36e65ce6db772a4c6fa340a68c50bca0a493bc16b6f86d566ac8fc11c122b29` | Worker |
| bytebot-desktop | `ghcr.io/bytebot-ai/bytebot-desktop@sha256:e974e7ac93c8f755e98b8a437e5497a63175c7096b51a348f5f1d9320598a1c9` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | bytebot-ui | 3000 | - |
| `HOSTNAME` | bytebot-ui | :: | - |
| `NODE_ENV` | bytebot-ui | production | - |
| `PORT` | Access Gateway | 8080 | - |
| `PROXY_PASSWORD` | Access Gateway | (secret) | Generated gateway password; browser username is operator. |
| `PORT` | bytebot-agent | 9991 | - |
| `GEMINI_API_KEY` | bytebot-agent | (secret) | - |
| `OPENAI_API_KEY` | bytebot-agent | (secret) | - |
| `ANTHROPIC_API_KEY` | bytebot-agent | (secret) | - |
| `PORT` | bytebot-desktop | 9990 | - |
| `DISPLAY` | bytebot-desktop | :0 | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'set -eu; hash=$(caddy hash-password --plaintext "$PROXY_PASSWORD"); printf "{\n admin off\n auto_https off\n}\n:8080 {\n basic_auth {\n operator %s\n }\n reverse_proxy %s\n}\n" "$hash" "$UPSTREAM" > /tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/bytebot-protected-ai-desktop-stack)
