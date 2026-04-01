# Deploy Hermes Agent | Open Source, OpenClaw Alternative on Railway on Railway

Self Host Hermes Agent: Autonomous AI agent w/ self-improving, tools & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-ai)

## About

Deploy Hermes Agent — the self-improving, open-source AI agent built by [Nous Research](https://nousresearch.com/). Hermes Agent is an autonomous agent that connects to your messaging channels (Telegram, Discord, Slack, WhatsApp, Email), learns from every interaction, creates its own skills, and gets more capable over time. It's not a chatbot wrapper — it's a persistent agent with tool use, memory, and a built-in learning loop.

Self-host Hermes Agent on Railway with this one-click deploy template. It comes with a pre-configured admin dashboard for setup, gateway management, live monitoring, and user access control. No config files to edit — select your LLM provider, enable channels, and start chatting. The template uses the official [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) repo.

Hermes Agent is a fully autonomous AI agent by Nous Research that lives on your server and communicates through messaging channels — there is no web chat UI. It remembers conversations, builds its own skills, and improves with every interaction.

- **Learning loop** — agent-curated memory, autonomous skill creation, self-improving skills, and FTS5 session search with LLM summarization
- **Multi-channel** — Telegram, Discord, Slack, WhatsApp, Signal, Email, Mattermost, Matrix via unified gateway
- **200+ LLM models** — connect via OpenRouter, DeepSeek, DashScope, GLM/Z.AI, Kimi, MiniMax, or HuggingFace
- **Tool integrations** — search (Tavily, Parallel), scraping (Firecrawl), image gen (FAL), browser automation (Browserbase), GitHub, voice (Whisper/TTS)
- **Parallel subagents** — spawn isolated subagents for concurrent workstreams
- **Cron scheduler** — schedule automated tasks across platforms
- **MIT licensed** — fully open source

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hermes Agent | [praveen-ks-2001/hermes-agent-template](https://github.com/praveen-ks-2001/hermes-agent-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8642 | HTTP server listening port |
| `ADMIN_PASSWORD` | (secret) | Create admin login password credential |
| `ADMIN_USERNAME` | (secret) | Create admin login username credential |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** HTML, Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/hermes-agent-ai)
