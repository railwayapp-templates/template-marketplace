# Deploy PicoClaw | Lightweight Alternative of OpenClaw | Self Host on Railway

[May '26] One-click deploy PicoClaw. Any LLM. Any messaging platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/picoclaw-or-lightweight-alternative-of-o)

## About

**Picoclaw** is a lightweight, open-source AI agent backend. Think of it as a simpler, more minimal alternative to OpenClaw. You host it yourself, connect a model provider, plug in a messaging channel, and your AI agent is live.

No heavy UI. No complex setup. Just a clean backend that does the job.

Hosting Picoclaw on Railway is straightforward.

You deploy the repo.
Add a provider API key.
Connect at least one messaging channel.

Railway builds the project automatically and gives you a public URL. It handles uptime and infrastructure. You don’t need to manage servers or Docker manually.

The only real work is configuring your provider and channel correctly. Once that’s done, the agent runs continuously in the background.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PicoClaw | [praveen-ks-2001/picoclaw-railway-template](https://github.com/praveen-ks-2001/picoclaw-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ADMIN_PASSWORD` | (secret) | Auto generated password to login to setup page |
| `ADMIN_USERNAME` | (secret) | Username to login to setup page |
| `PICOCLAW_VERSION` | main | Branch to fetch from picoclaw git |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** HTML, Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/picoclaw-or-lightweight-alternative-of-o)
