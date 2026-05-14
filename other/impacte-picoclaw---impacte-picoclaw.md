# Deploy impacte-picoclaw on Railway

The simplest curated setup for PicoClaw - brought to you by impacte.tech

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/impacte-picoclaw)

## About

impacte-picoclaw is a lightweight, agentic research tool inspired by OpenClaw, optimized for a minimal hardware footprint. It functions as an autonomous researcher that utilizes the Brave Search API to browse the web and Telegram as a primary interface for user interaction and reporting.

Hosting impacte-picoclaw on Railway provides a stable, 24/7 environment for your agent without the need for local hardware. This template automates the setup of the runtime environment required for agentic workflows, specifically handling the headless browsing capabilities and persistent Telegram bot connection. 

Because it is designed for a small footprint, it runs efficiently within Railway's containers, utilizing minimal resources while maintaining high responsiveness. Railway’s infrastructure ensures that the agent remains online, automatically restarting the process if it encounters an error during complex research tasks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| picoclaw | [oamazonasgabriel/picoclaw](https://github.com/oamazonasgabriel/picoclaw) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PICOCLAW_GATEWAY_HOST` | - | Filled in by Railway automatically |
| `PICOCLAW_GATEWAY_PORT` | - | Filled in by Railway automatically |
| `PICOCLAW_AGENTS_DEFAULTS_MODEL` | - | Filled in by Railway automatically. Edit as needed |
| `PICOCLAW_CHANNELS_TELEGRAM_TOKEN` | (secret) | Required if TELEGRAM is enabled |
| `PICOCLAW_TOOLS_WEB_BRAVE_API_KEY` | (secret) | Required if Brave is enabled |
| `PICOCLAW_TOOLS_WEB_BRAVE_ENABLED` | FALSE | TRUE or FALSE, enables or disables Brave usage - If TRUE, BRAVE_TOKEN is needed |
| `PICOCLAW_AGENTS_DEFAULTS_PROVIDER` | - | Filled by default. Change as needed |
| `PICOCLAW_AGENTS_DEFAULTS_WORKSPACE` | - | Filled in by Railway automatically. Edit as needed |
| `PICOCLAW_CHANNELS_TELEGRAM_ENABLED` | FALSE | Required to enable telegram |
| `PICOCLAW_PROVIDERS_OPENROUTER_API_KEY` | (secret) | Required if OPENROUTER used as provider |

## Configuration

- **Start command:** `gateway`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/tmp/picoclaw/workspace`

**Category:** Other · **Languages:** Go, Shell, Makefile, Dockerfile

[View on Railway →](https://railway.com/deploy/impacte-picoclaw)
