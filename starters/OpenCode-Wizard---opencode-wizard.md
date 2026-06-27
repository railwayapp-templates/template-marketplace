# Deploy OpenCode Wizard on Railway

opencode on Railway — persistent AI coding server with first-run web wizard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencode-wizard)

## About

The OpenCode Wizard is a first-run web UI that configures a persistent opencode AI coding server on Railway. It validates your LLM provider API key live against the provider's API, populates available models, optionally clones a GitHub repo, and auto-generates a basic-auth password — turning a zero-variable deploy into a working AI pair-programmer in a single page.

Hosting the OpenCode Wizard means running [opencode](https://opencode.ai) as a long-lived server inside a Railway container. The Dockerfile installs opencode on Debian bookworm-slim; `entrypoint.sh` boots the wizard when no provider key is detected, then switches to `opencode web` once configuration is saved. State — chat sessions, auth tokens, the cloned repo, and `.setup.env` — lives on a Railway persistent volume mounted at `/data`, so everything survives redeploys and laptop shutdowns. You reconnect from a browser (HTTP basic auth, user `opencode`) or `opencode attach` from the terminal. Railway handles public networking, the `$PORT`, and restart policy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Agent & Setup Wizard | [wra-sol/opencode-railway](https://github.com/wra-sol/opencode-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OPENCODE_SERVER_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Starters · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/opencode-wizard)
