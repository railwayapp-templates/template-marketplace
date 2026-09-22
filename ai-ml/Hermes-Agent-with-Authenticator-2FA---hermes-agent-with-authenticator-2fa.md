# Deploy Hermes Agent with Authenticator 2FA on Railway

Hermes Agent with persistent storage and password + authenticator 2FA.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-with-authenticator-2fa)

## About

Deploy your own single-owner [Hermes Agent](https://github.com/NousResearch/hermes-agent) with a persistent workspace and web dashboard. This community distribution adds mandatory username/password and authenticator-app two-factor authentication. It retains Hermes tools, messaging integrations, memories, and native agent delegation; its custom model-orchestration feature has been removed.

The template builds the public [source repository](https://github.com/SMKxx1/hermes-agent-railway), creates one service and a persistent volume mounted at `/opt/data`, and exposes the dashboard through HTTPS on port `9119`. It uses one replica, an always-on service, and the `/api/status` health check. Railway hosting is billed to your Railway account.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes | [SMKxx1/hermes-agent-railway](https://github.com/SMKxx1/hermes-agent-railway) (branch: main) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9119 | Dashboard HTTP port. Keep 9119 to match the template domain and image defaults. |
| `OPENROUTER_API_KEY` | (secret) | Your OpenRouter API key. Model usage is billed to your account; never share this key. |
| `HERMES_DASHBOARD_TOTP_AUTH_PASSWORD` | (secret) | Choose a unique dashboard password, 12–1024 characters. First login also requires authenticator-app enrollment. |
| `HERMES_DASHBOARD_TOTP_AUTH_USERNAME` | (secret) | Choose the username for this single-owner dashboard, 1–128 characters. |

## Configuration

- **Start command:** `/opt/hermes/docker/entrypoint-dispatch.sh gateway run`
- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** AI/ML · **Languages:** Python, TypeScript, JavaScript, TeX, Shell, PowerShell, Rust, CSS, BibTeX Style, Nix, HTML, MDX, C, Go Template, Batchfile, Makefile

[View on Railway →](https://railway.com/deploy/hermes-agent-with-authenticator-2fa)
