# Deploy Hermes - WhatsApp on Railway

Nous Research's Ai Agent Runtime WhatsApp Supervised Gateway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-whatsapp)

## About

Hermes Agent is an autonomous, self-improving AI agent from Nous Research. This flavor connects it to **WhatsApp** via the built-in Baileys bridge (WhatsApp Web–style session, not the official Business Cloud API). Persistent state lives under `/data`, and the image defaults to `nousresearch/hermes-agent:latest`.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/hermes-whatsapp)

This template runs a single container using `nousresearch/hermes-agent:latest`. A volume at `/data` keeps Hermes home, sessions, and the WhatsApp pairing session across redeploys.

WhatsApp is **not** a pure one-click platform like Telegram or Discord:

1. You set env vars and deploy.
2. You open **Railway SSH** and run `hermes whatsapp` to scan a QR code from your phone.
3. The session is saved under `/data` and reused on later restarts.

There is no public HTTP port required for normal use. You talk to the agent from WhatsApp on an allowlisted number.

**Important:** The Baileys bridge is unofficial. Meta can restrict or ban the linked number. Prefer a dedicated secondary number, not your primary personal WhatsApp.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hermes | [OpenSource-Templates/Hermes](https://github.com/OpenSource-Templates/Hermes) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `WHATSAPP_MODE` | bot | Runs the WhatsApp integration in bot mode. |
| `WHATSAPP_ENABLED` | true | Enables WhatsApp integration for the application. |
| `OPENROUTER_API_KEY` | (secret) | OpenRouter API key used to authenticate requests to AI models through OpenRouter. |
| `HERMES_IMAGE_VERSION` | latest | Version tag of the Hermes container image to use. "latest" uses the most recent available image. |
| `WHATSAPP_ALLOWED_USERS` | - | Comma-separated list of WhatsApp users allowed to interact with the bot. |
| `AGENT_CACHE_MEMORY_HIGH_MB` | 750 | Memory threshold in MB at which the agent cache considers memory usage high. |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile, TypeScript

[View on Railway →](https://railway.com/deploy/hermes-whatsapp)
