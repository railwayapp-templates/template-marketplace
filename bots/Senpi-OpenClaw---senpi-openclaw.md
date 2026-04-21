# Deploy Senpi OpenClaw on Railway

One-click Hyperliquid AI trading agent with 58 tools—live in 2 minutes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/senpi-openclaw)

## About

Deploy your personal AI trading agent on Hyperliquid in one click. Senpi OpenClaw comes pre-configured with dozens of purpose-built trading tools, persistent memory, and secure authentication — no wallets, no keys, no infrastructure to manage. Get to your first agent trade in 2 minutes.

Senpi OpenClaw is the fastest way to deploy a personal AI trading agent on Hyperliquid. Click deploy, connect via Telegram, and your agent is live — learning your risk profile, scanning the market, and trading on your behalf. No blockchain experience required. No servers to configure. No wallet management or key rotation.

This isn’t a bot. It’s a learning co-pilot with memory that adapts to how you trade.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| senpi-hyperclaw-railway-template | [Senpi-ai/senpi-hyperclaw-railway-template](https://github.com/Senpi-ai/senpi-hyperclaw-railway-template) | Database |

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

- **Volume:** `/data`

**Category:** Bots · **Languages:** JavaScript, Dockerfile, HTML, CSS

[View on Railway →](https://railway.com/deploy/senpi-openclaw)
