# Deploy OpenClaw + Bright Data on Railway

AI agent gateway with 66 Bright Data web tools pre-configured.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-bright-data)

## About

OpenClaw is a self-hosted AI agent gateway. This template bundles the official Bright Data plugin pre-configured with 66 web automation and data access tools — web search, scraping, browser automation, and structured data from 50+ platforms. Deploy in one click, add your API keys, and your AI agent is ready to use immediately.

![Setup page showing DONE status](https://raw.githubusercontent.com/ReallyGreatTech/brightdata-railway/main/docs/images/setup-done.png)

This template deploys OpenClaw on Railway with the Bright Data plugin pre-installed and fully configured. On first boot, the container installs the plugin, configures your Bright Data API key, registers your AI provider key, and starts the OpenClaw gateway. A persistent volume mounted at /data stores all configuration and credentials across redeploys. The setup wizard at /setup provides real-time initialization status and displays the generated gateway token after initialization completes. Supports OpenRouter (free), Gemini, OpenAI, and Anthropic as AI providers. No CLI commands or manual plugin setup required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| brightdata-railway | [ReallyGreatTech/brightdata-railway](https://github.com/ReallyGreatTech/brightdata-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GEMINI_API_KEY` | (secret) | Optional — alternative AI provider. Get key at aistudio.google.com |
| `OPENAI_API_KEY` | (secret) | Optional — alternative AI provider. Get key at platform.openai.com |
| `SETUP_PASSWORD` | (secret) | Password to access the /setup status page. Choose any password you want. |
| `ANTHROPIC_API_KEY` | (secret) | Optional — alternative AI provider. Get key at console.anthropic.com |
| `OPENROUTER_API_KEY` | (secret) | Free recommended AI provider. Get key at openrouter.ai/keys |
| `BRIGHTDATA_API_TOKEN` | (secret) | Your Bright Data API key. Get it at: brightdata.com/cp/setting/users → Generate API key |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/openclaw-bright-data)
