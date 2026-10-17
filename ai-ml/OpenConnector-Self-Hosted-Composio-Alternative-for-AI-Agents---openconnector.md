# Deploy OpenConnector | Self-Hosted Composio Alternative for AI Agents on Railway

Connect 1,600+ apps to your AI agents over MCP, SDK or HTTP. Self-hosted.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openconnector)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/openconnector?referralCode=sLjDXb&amp;utm_medium=integration&amp;utm_source=button&amp;utm_campaign=openconnector)

[OpenConnector](https://github.com/oomol-lab/open-connector) by OOMOL is a self-hosted connector gateway for AI agents, an open-source alternative to Composio and Pipedream Connect. You connect your app accounts (GitHub, Slack, Notion, Google, Linear, HubSpot and 1,600+ more) once. Your agents then get 19,000+ ready-made actions through one MCP endpoint, a TypeScript SDK, or plain HTTP. Credentials stay on your own server, encrypted. Every call goes through your tokens, scopes and allow/block rules, and shows up in a run log.

It's one service with a Railway volume. Connections, OAuth app settings, tokens and run logs live in SQLite on the volume.

- **Locked down from the first second.** The web console and admin API need an admin token, and the agent-facing `/v1` and `/mcp` endpoints need a runtime token. Both are generated at deploy, along with the key that encrypts every stored credential. Upstream, the agent endpoints start out open until you make a token.
- **OAuth callbacks that work.** `OOMOL_CONNECT_ORIGIN` is set to your Railway domain, so the redirect URLs you register with GitHub, Google, Slack and others point back to this service.
- **Pinned release.** The template runs the official image at a fixed version (`v1.9.0`). To upgrade, change the image tag in the service settings.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenConnector | `ghcr.io/oomol-lab/open-connector:v1.9.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Port the runtime listens on - leave as is. |
| `OOMOL_CONNECT_ORIGIN` | - | Public URL used for OAuth redirect URLs - switch it to your custom domain after adding one. |
| `OOMOL_CONNECT_ADMIN_TOKEN` | (secret) | Admin token: paste it into the web console to sign in. Also authorizes the admin API. |
| `OOMOL_CONNECT_RUNTIME_TOKEN` | (secret) | Bearer token for agents calling /v1 and /mcp. Without it those endpoints would be open to anyone. You can also mint scoped tokens in the console. |
| `OOMOL_CONNECT_ENCRYPTION_KEY` | - | Encrypts stored credentials and OAuth secrets on the volume. Never change or lose it - encrypted data can't be recovered without it. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/openconnector)
