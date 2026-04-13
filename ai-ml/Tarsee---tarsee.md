# Deploy Tarsee on Railway

24/7 Claude Code agent — web, Telegram, Discord, voice. No API keys.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tarsee)

## About

Tarsee is a personal 24/7 Claude Code agent you can talk to from anywhere — web, Telegram, Discord, or voice. It wraps the Claude Code SDK directly, uses your Claude Max subscription (no API keys needed), and runs on a lightweight Node.js server with no build step.

Tarsee deploys as a single Docker container on Railway with a persistent volume for data. It needs a Claude Max subscription for authentication — just run `claude login` in the built-in web terminal after deploying. The only env var you need to change is your 4-digit PIN password. Everything else (encryption key, Node env) is pre-configured. The server runs on ~200MB RAM, includes Playwright for browser automation, faster-whisper for speech-to-text, and Piper/Edge TTS for text-to-speech. Credentials auto-refresh on the volume — no maintenance needed after initial setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Tarsee | [projectservan8n/Tarsee](https://github.com/projectservan8n/Tarsee) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `NODE_ENV` | production |
| `SETUP_PASSWORD` | (secret) |
| `TARSEE_STATE_DIR` | /data/tarsee |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** JavaScript, CSS, HTML, Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/tarsee)
