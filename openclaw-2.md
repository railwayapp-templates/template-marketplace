# Deploy OpenClaw on Railway

Production-ready OpenClaw template, fully maintained

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/openclaw-2)

## About

Hosting OpenClaw requires running a persistent service capable of executing workflows, handling background jobs, and securely communicating with external APIs and data sources. This template provides a production-ready OpenClaw deployment on Railway, handling builds, configuration, networking, and scaling. With infrastructure managed for you, you can focus on developing and operating your agents instead of maintaining servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw | [yves-pires/openclaw](https://github.com/yves-pires/openclaw) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SETUP_PASSWORD` | (secret) |
| `OPENROUTER_API_KEY` | (secret) |
| `TELEGRAM_BOT_TOKEN` | (secret) |
| `OPENCLAW_CONFIG_DIR` | /data/.openclaw |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, Swift, Kotlin, Shell, CSS, JavaScript, Python, Go, HTML, Dockerfile, Ruby

[View on Railway →](https://railway.com/template/openclaw-2)
