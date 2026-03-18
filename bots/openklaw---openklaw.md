# Deploy openklaw on Railway

openclaw+telegram+(free API: https://build.nvidia.com/)+tailscale

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openklaw)

## About

OpenKlaw is an opinionated deployment template for OpenClaw with Telegram integration, powered by Kimi K2.5 via NVIDIA NIM's free API tier. All configuration is driven by environment
  variables.

  ## About Hosting OpenKlaw

  Hosting OpenClaw typically requires configuring a gateway, setting up model providers, managing persistent storage for agent memory, and handling Telegram bot integration. OpenKlaw
  automates all of this. The entrypoint script validates your API keys on startup, generates configuration from environment variables, and starts the gateway. A persistent volume
  preserves agent state, session memory, and auth tokens across deploys.

  ## Common Use Cases

  - Personal AI assistant accessible via web dashboard and Telegram
  - Self-hosted alternative to cloud AI chat services with full data control
  - Telegram bot powered by Kimi K2.5 for private or team use

  ## Dependencies for OpenKlaw Hosting

  - NVIDIA NIM API key for Kimi K2.5 inference (free tier) - [create one here](https://build.nvidia.com/settings/api-keys)
  - Telegram bot token from @BotFather (optional, only if you want Telegram integration)

  ### Deployment Dependencies

  - [OpenClaw](https://openclaw.ai) - The open-source AI agent framework
  - [NVIDIA NIM](https://build.nvidia.com) - API for Kimi K2.5 model inference
  - [Telegram Bot API](https://core.telegram.org/bots#botfather) - For creating a bot token (optional)

  ## Why Deploy OpenKlaw on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically
   and horizontally scale it.


Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

By deploying openklaw on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openklaw | [llk23r/openklaw](https://github.com/llk23r/openklaw) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TS_AUTHKEY` | - | Tailscale auth key for zero public exposure (optional) -- generate at login.tailscale.com/admin/settings/keys |
| `TS_HOSTNAME` | - | Tailscale machine name (default: openklaw) |
| `GATEWAY_TOKEN` | (secret) | Secret token for Control UI access |
| `SYSTEM_PROMPT` | - | Custom agent personality |
| `MOONSHOT_API_KEY` | (secret) | NVIDIA NIM API key (nvapi-...) |
| `TELEGRAM_USER_ID` | - | Your numeric Telegram user ID |
| `TELEGRAM_BOT_TOKEN` | (secret) | Telegram bot token from @BotFather |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Bots · **Languages:** Shell, HTML, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/openklaw)
