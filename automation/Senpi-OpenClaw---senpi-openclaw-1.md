# Deploy Senpi OpenClaw on Railway

One-click Deploy and Host Senpi OpenClaw with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/senpi-openclaw-1)

## About

Launch your private AI-driven trading assistant on Hyperliquid with a single click. Senpi OpenClaw is engineered with a comprehensive suite of trading utilities, long-term memory, and encrypted security protocols. Forget the hassle of managing wallets, private keys, or complex infrastructure—execute your first automated trade in under 120 seconds.

Senpi OpenClaw represents the most streamlined path to deploying a custom AI trading agent on Hyperliquid. Simply initiate the deployment, link your Telegram account, and your agent begins its work—analyzing your risk tolerance, monitoring market fluctuations, and executing orders. We’ve removed the technical barriers: no deep blockchain knowledge, server maintenance, or manual key handling required.

This is more than just a script; it is an evolving co-pilot that remembers your preferences and refines its strategy based on your trading style.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| senpi-openclaw | [iqbalexperience/senpi-hyperclaw](https://github.com/iqbalexperience/senpi-hyperclaw) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Internal port where the gateway listens (proxied by the wrapper) |
| `AI_API_KEY` | (secret) | Your API key from openai, anthropic, gemini |
| `AI_PROVIDER` | - | The name of your AI_PROVIDER: openai, anthropic, gemini (all lowercase) |
| `SENPI_MCP_URL` | https://mcp.prod.senpi.ai/mcp | Senpi MCP server endpoint |
| `OPENCLAW_ENTRY` | /openclaw/dist/entry.js | - |
| `SETUP_PASSWORD` | (secret) | Create a new password for OpenClaw. |
| `MCPORTER_CONFIG` | /data/.openclaw/config/mcporter.json | - |
| `TELEGRAM_USERID` | - | Your Telegram user ID (numeric). To find it, open https://t.me/userinfobot on Telegram. |
| `OPENCLAW_VERSION` | v2026.2.22 | openclaw version, default is v2026.2.22 |
| `SENPI_AUTH_TOKEN` | (secret) | Get this at https://senpi.ai |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | - |
| `TELEGRAM_BOT_TOKEN` | (secret) | Create your Telegram bot via https://t.me/BotFather and paste the token here. Make sure to tap "Start" in your bot's chat afterward. |
| `INTERNAL_GATEWAY_HOST` | 127.0.0.1 | - |
| `INTERNAL_GATEWAY_PORT` | 18789 | - |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | - |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace | Directory where clawdbot stores workspace files |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** JavaScript, Dockerfile, HTML, CSS

[View on Railway →](https://railway.com/deploy/senpi-openclaw-1)
