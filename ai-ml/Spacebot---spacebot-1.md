# Deploy Spacebot on Railway

Openclaw alternative for teams, communities, and multi-user environments.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/spacebot-1)

## About

<p align="center">
  <img height="120" width="120" alt="Spacebot" src="https://raw.githubusercontent.com/spacedriveapp/spacebot/main/.github/Ball.png">
</p>

<h1 align="center">Spacebot</h1>

<p align="center">
  <strong>An AI agent for teams, communities, and multi-user environments.</strong><br>
  Thinks, executes, and responds — concurrently, not sequentially.<br>
  Never blocks. Never forgets.
</p>

<p align="center">
  <a href="https://spacebot.sh"><strong>spacebot.sh</strong></a> •
  <a href="#how-it-works">How It Works</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="https://docs.spacebot.sh">Docs</a>
</p>

&gt; **One-click deploy with [spacebot.sh](https://spacebot.sh)** — connect your Discord, Slack, Telegram, or Twitch, configure your agent, and go. No self-hosting required.

<p align="center">
  <img alt="Spacebot UI" src="https://raw.githubusercontent.com/spacedriveapp/spacebot/refs/heads/main/.github/spacebot-ui.jpg">
</p>

Spacebot is an AI agent designed for teams and communities, built in Rust with a unique concurrent architecture. Unlike single-session agents, it uses specialized processes—Channels for conversation, Branches for thinking, and Workers for tasks—to handle multiple users simultaneously across Discord, Slack, Telegram, and Twitch without blocking.

Spacebot deploys as a single Rust binary with zero external dependencies. It uses embedded SQLite, LanceDB, and redb for persistence, requiring only a volume mount for data storage. Configuration is handled via TOML files and environment variables for LLM API keys (Anthropic, OpenAI, OpenRouter, etc.) and messaging platform tokens. Railway's persistent volume support makes it ideal for hosting Spacebot's databases and memory graph.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Spacebot | `ghcr.io/spacedriveapp/spacebot:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 19898 | Application port |
| `OPENAI_API_KEY` | (secret) | OpenAI API key |
| `SLACK_APP_TOKEN` | (secret) | Slack app token |
| `SLACK_BOT_TOKEN` | (secret) | Slack bot token |
| `ANTHROPIC_API_KEY` | (secret) | Anthropic API key |
| `DISCORD_BOT_TOKEN` | (secret) | Discord bot token |
| `OPENROUTER_API_KEY` | (secret) | OpenRouter API key |
| `BRAVE_SEARCH_API_KEY` | (secret) | Brave Search API key |
| `SPACEBOT_WORKER_MODEL` | - | Override worker model |
| `SPACEBOT_CHANNEL_MODEL` | - | Override channel model |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/spacebot-1)
