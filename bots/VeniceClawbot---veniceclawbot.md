# Deploy Venice_Clawbot on Railway

A Clawbot deployment script for Railway with Venice.ai integration

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/veniceclawbot)

## About

### Deploy and Host Venice_Clawbot on Railway

Venice_Clawbot is an AI coding agent powered by Venice.ai, a privacy-first AI provider, running on top of OpenClaw, an open-source Claude Code-compatible gateway.

#### About Hosting Venice_Clawbot

Venice_Clawbot runs on Railway, routing coding agent requests through Venice.ai's privacy-preserving infrastructure. A built-in web server handles authentication, setup, and proxying to the OpenClaw gateway. All state is stored on a Railway persistent volume so your configuration survives redeployments. Once set up, access the full Control UI from any browser or the Claude Code CLI via your Railway public domain.

  ### Common Use Cases

  - AI coding assistant with a privacy-first model provider
  - Claude Code-compatible workflows without sending data to Anthropic directly
  - Always-on coding agent accessible from any device

 ### Dependencies for Venice OpenClaw - Railway Template Hosting

  - A Venice.ai account and API key
  - A Railway persistent volume mounted at /data

### Deployment Dependencies 
- Railway Volumes (persistent storage): https://docs.railway.com/guides/volumes
- Public Networking (HTTP proxy): https://docs.railway.com/guides/public-networking
- Railway Variables (secrets/config): https://docs.railway.com/guides/variables
- OpenClaw (Clawdbot) docs (providers/channels): https://docs.molt.bot/providers

 ### Why Deploy Venice_Clawbot on Railway?

Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

By deploying Venice_Clawbot on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| VENICE_CLAW_RAILWAY | [Ashe-Oro/openclaw-railway-template](https://github.com/Ashe-Oro/openclaw-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `SETUP_PASSWORD` | (secret) |
| `OPENCLAW_STATE_DIR` | /data/.openclaw |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Bots · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/veniceclawbot)
