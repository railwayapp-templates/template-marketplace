# Deploy Trug on Railway

Trug is a self-hosted shared shopping list for one household.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/trug)

## About

Trug is a self-hosted shared shopping list for one household. Everyone gets the
list on their phone as an installable PWA that works with no signal in the shop
and syncs when it's back. Sign-in is passkeys only — no passwords, no accounts to
manage. Assistants like Claude can read and edit the list over MCP. Open source,
MIT-licensed, and small enough to understand end to end.

Trug is a single container: a FastAPI server, a SQLite database, and the compiled
web app in one image, with no external services to wire up. Railway attaches a
volume at `/data` where the database lives, so your list survives redeploys and
restarts. Deploying from this template generates all three access tokens for you
and pins them into the service's Variables tab — there are no logs to grep — and
resolves the passkey settings automatically from your generated domain, which is
the one piece of configuration that is fiddly to get right by hand. It runs
comfortably inside the Hobby plan's included $5 of monthly usage. The volume is
your data: Railway's volume backups cover it, and there's a restore guide in the
repo.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| trug | `ghcr.io/maxdraki/trug:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LLM_MODEL` | - | Optional. Model name for your LLM provider. |
| `TRUG_RP_ID` | - | Passkey relying-party ID — resolved automatically from your generated domain. Only change it if you attach a custom domain (set it to the bare hostname). |
| `LLM_API_KEY` | (secret) | Optional. Bring your own LLM key for smarter item icons and aisles. Trug works fully without it. |
| `TRUG_ORIGIN` | - | Full origin for passkeys — resolved automatically. With a custom domain, set it to `https://<your-domain>`. |
| `LLM_BASE_URL` | - | Optional. OpenAI-compatible base URL (for example Ollama or a proxy). |
| `TRUG_TOKEN_MCP` | (secret) | Machine token for token-based MCP clients. The MCP connector's OAuth flow does not need it. Ignore it unless you use token auth. |
| `TRUG_TOKEN_RING` | (secret) | Machine token for the webhook capture endpoint (`POST /api/capture`) — smart rings, Home Assistant, and similar. Ignore it unless you use those. |
| `TRUG_BOOTSTRAP_TOKEN` | (secret) | One-time token to claim the FIRST account. Copy it, open your Trug URL, and paste it at the gate. After that it is inert — everyone else joins via invite links. |
| `TRUG_TRUSTED_PROXY_HOPS` | 1 | Railway terminates TLS in front of the app, so this tells the rate limiter to key on the real client IP instead of the shared proxy address. Leave it at 1. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/trug)
