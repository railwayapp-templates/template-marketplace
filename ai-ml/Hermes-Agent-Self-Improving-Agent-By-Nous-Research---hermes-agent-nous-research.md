# Deploy Hermes Agent | Self Improving Agent By Nous Research on Railway

Self Host Hermes Agent, Cron, Skills, Analytics with The Official Dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-nous-research)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-nous-research?referralCode=QXdhdr&utm_medium=integration&utm_source=template&utm_campaign=generic)

Deploy Hermes Agent — the self-improving, open-source AI agent built by [Nous Research](https://nousresearch.com/). Hermes Agent is an autonomous agent that connects to your messaging channels (Telegram, Discord, Slack, WhatsApp), learns from every interaction, creates its own skills, and gets more capable over time. It's not a chatbot wrapper — it's a persistent agent with tool use, memory, and a built-in learning loop.

Self-host Hermes Agent on Railway with this one-click deploy template. It ships with two UIs behind a single sign-in: a streamlined **Setup wizard** that gets you live in minutes (LLM provider, channels, tool keys, user approvals) and the full **native Hermes dashboard** reverse-proxied at `/` for everything else — providers Keys tab, skills and toolsets, analytics, session history, log viewer, and the cron scheduler. No config files to edit, no terminal access required. 

The template uses the official [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) repo, built on `ghcr.io/astral-sh/uv:python3.12-bookworm-slim`.

![Hermes Agent Official dashboard](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776497358/hermes-official-dashboard_gu3gwl.png)

Hermes Agent is a fully autonomous AI agent by Nous Research that lives on your server and communicates through messaging channels — there is no web chat UI. It remembers conversations, builds its own skills, and improves with every interaction.

- **Learning loop** — agent-curated memory, autonomous skill creation, self-improving skills, and FTS5 session search with LLM summarization
- **Multi-channel** — Telegram, Discord, Slack, WhatsApp, Signal, Email, Mattermost, Matrix via unified gateway
- **200+ LLM models** — connect via OpenAI, Anthropic, Google Gemini, OpenRouter, DeepSeek, DashScope, GLM/Z.AI, Kimi, MiniMax, or HuggingFace
- **Tool integrations** — search (Tavily, Parallel), scraping (Firecrawl), image gen (FAL), browser automation (Browserbase), GitHub, voice (Whisper/TTS)
- **Parallel subagents** — spawn isolated subagents for concurrent workstreams
- **Cron scheduler** — schedule automated tasks across platforms, manageable from the built-in dashboard
- **Native Hermes dashboard** — full in-browser Keys tab, skills, toolsets, analytics, session history, and log viewer proxied at `/` behind the same login
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

[View on Railway →](https://railway.com/deploy/hermes-agent-nous-research)
