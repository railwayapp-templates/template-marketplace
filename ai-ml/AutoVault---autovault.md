# Deploy AutoVault on Railway

A local-first vault for validated, signed, scoped skills used by AI agents.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/autovault)

## About

This template runs AutoVault in **remote MCP mode** from the published GHCR image (`ghcr.io/autoworks-ai/autovault`). Railway provisions a 1 GB persistent volume mounted at `/data/autovault` for the SQLite database, signing key, and installed skills, then exposes the service over HTTPS on a `*.up.railway.app` domain. The server speaks Streamable HTTP MCP at `/mcp`, gated by OAuth 2.1 with PKCE — including dynamic client registration and refresh-token rotation, so any MCP-compatible agent can connect without a shared secret. On first boot, AutoVault seeds the owner account from the email and password you provide; on every subsequent boot it verifies the integrity of every stored skill against the on-disk signing key before serving it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| autovault | `ghcr.io/autoworks-ai/autovault:v0.2.1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AUTOVAULT_MODE` | remote | must be remote; image default is local (stdio-only) |
| `AUTOVAULT_LOG_LEVEL` | info | debug | info | warn | error |
| `AUTOVAULT_PUBLIC_URL` | - | OAuth issuer + /.well-known metadata |
| `AUTOVAULT_ADMIN_EMAIL` | - | first-boot owner email |
| `AUTOVAULT_STORAGE_PATH` | /data/autovault | must match the volume mount path |
| `AUTOVAULT_ADMIN_PASSWORD` | (secret) | min 12 chars; hashed at rest |
| `AUTOVAULT_SECURITY_STRICT` | true | block writes on security flags; leave true in prod |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/autovault`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/autovault)
