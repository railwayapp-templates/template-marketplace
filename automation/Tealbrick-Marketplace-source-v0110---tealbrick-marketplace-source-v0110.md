# Deploy Tealbrick Marketplace — source v0.1.10 on Railway

Governed agent integrations, built from public source on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tealbrick-marketplace-source-v0110)

## About

Build Marketplace v0.1.10 from its public source inside your own Railway project. The protected release-marketplace-v0.1.10 branch resolves to 12ecfea4b8baa96684f09326983f44da509d7163. No Tealbrick GHCR credentials are required. The repository license governs use; public source is not a license purchase.

One service listens on port 5314 with one persistent /data volume. The tracked entrypoint prepares private state directories as root and then runs as uid 1000. Do not override the entrypoint. Instance-specific secrets are generated for each install; preserve the handoff encryption key across restart, upgrade and restore. Protect database and provider-settings backups separately from that key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| marketplace | [Tealbrick/marketplace](https://github.com/Tealbrick/marketplace) (branch: release-marketplace-v0.1.10) (root: /release/railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 5314 |
| `NODE_ENV` | production |
| `MARKETPLACE_HOST` | 0.0.0.0 |
| `MARKETPLACE_PORT` | 5314 |
| `MARKETPLACE_DATA_DIR` | /data/state |
| `MARKETPLACE_DATABASE_PATH` | /data/state/marketplace.sqlite |
| `RULES_INTERNAL_AUTH_TOKEN` | (secret) |
| `MARKETPLACE_PORTAL_ISSUER_URL` | https://portal.tealbrick.com |
| `MARKETPLACE_INTERNAL_AUTH_TOKEN` | (secret) |
| `MARKETPLACE_OPERATOR_ACCESS_TOKEN` | (secret) |
| `MARKETPLACE_PORTAL_ATTACHMENT_AUDIENCE` | marketplace |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** TypeScript, CSS, JavaScript, Python, Shell, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/tealbrick-marketplace-source-v0110)
