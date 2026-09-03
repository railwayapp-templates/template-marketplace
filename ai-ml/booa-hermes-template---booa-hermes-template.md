# Deploy booa-hermes-template on Railway

Your BOOA as a self-hosted AI agent.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/booa-hermes-template)

## About

Turn your BOOA into an autonomous AI agent running on your own Railway service. The template fetches your agent's onchain identity from Ethereum via booa.app (personality, skills, pixel art) and runs it on Hermes Agent with BOOA's guardrails pre-loaded.

## Setup
1. Deploy. Railway generates your admin password — copy it.
2. Add a volume mounted at /data (Settings → Volumes). This stays manual on purpose: template-managed volumes are wiped on template updates, one you add yourself keeps your memories, sessions and wallet.
3. Open booa.app → Studio → Agent Console → "Set up a new instance". Paste the service URL and admin password, add your OpenRouter API key, pick a model. Telegram is optional.

Your token ID is filled in for you. The built-in dashboard wizard is still there if you prefer it.

## What you get
- Chat and manage your agent from booa.app in any browser (iOS included), or on Telegram
- Onchain read tools (balances, prices, portfolio, OpenSea search) — off by default
- Optional trading and wallet actions with per-tx and daily caps, allowlists, and wallet-signed operator approvals for trades
- OWS wallet, ERC-8004 identity linking, encrypted backups, live logs, live model switching from the OpenRouter catalog
- The agent process runs as an unprivileged user; dashboard ships with a strict CSP

## Cost
Railway Hobby (~$5/month) plus your own model usage billed by OpenRouter. Railway does not run inference.

Docs: booa.app/docs · Source: github.com/0xmonas/booa-hermes-template

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

**Category:** AI/ML · **Languages:** Python, JavaScript, HTML, CSS, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/booa-hermes-template)
