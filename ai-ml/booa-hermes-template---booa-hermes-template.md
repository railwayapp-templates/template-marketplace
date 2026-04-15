# Deploy booa-hermes-template on Railway

Deploy and Host booa-hermes-template with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/booa-hermes-template)

## About

BOOA Hermes Template deploys your BOOA NFT as an autonomous AI agent powered by Hermes Agent. Enter your token ID, pick an AI provider, connect Telegram — your agent starts with its on-chain personality, skills, and identity pre-loaded. By Khôra.

Hosting runs a lightweight Python admin server that manages Hermes Agent as a subprocess. During setup, a 4-step wizard fetches your BOOA's on-chain identity from Shape Network, writes personality and memory files, configures your AI provider, and connects Telegram. The admin dashboard provides gateway controls, live logs, Telegram pairing, ERC-8004 verification status, and data export. All state persists on a mounted volume — survives restarts and redeploys. The AI inference runs on your chosen provider (OpenRouter, Anthropic, OpenAI), not on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| booa-hermes-template | [0xmonas/booa-hermes-template](https://github.com/0xmonas/booa-hermes-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOME` | /data |
| `PORT` | 8080 |
| `HERMES_HOME` | /data/hermes |
| `ADMIN_PASSWORD` | (secret) |
| `ADMIN_USERNAME` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, HTML, CSS, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/booa-hermes-template)
