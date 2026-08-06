# Deploy ZeroClaw — Lightweight Self-Hosted AI Agent on Railway

Self-host ZeroClaw — a tiny Rust AI agent for Discord & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zeroclaw-ai-agent)

## About

ZeroClaw is an ultra-lightweight, open-source AI agent runtime built entirely in Rust — a single tiny binary that gives you a self-hosted, always-on personal AI assistant across Discord, Telegram, and 30+ messaging channels. It connects to ~20 LLM providers (Anthropic, OpenAI, Ollama, OpenRouter, and any OpenAI-compatible endpoint), with persistent memory, tool execution, and scheduled autonomous tasks. Its headline feature is efficiency: where other agent frameworks need a gigabyte of RAM, ZeroClaw sips a few megabytes — so it runs 24/7 on Railway for almost nothing. This template deploys it with a persistent volume so your agent's memory survives redeploys.

---

ZeroClaw is a lean, powerful agent runtime, and a few things are worth understanding to run it well on Railway.

**It's astonishingly lightweight — that's the whole point.** ZeroClaw compiles to a single Rust binary of a few megabytes and uses only a few megabytes of RAM at runtime — on the order of 200× less than heavier agent frameworks. That means running an always-on AI agent on Railway costs almost nothing, since it fits on the smallest instance — the difference between an agent that's expensive to keep running and one you barely notice on your bill.

**Bring your own LLM provider key.** ZeroClaw is a runtime, not a model — it orchestrates calls to the provider you choose. Add your API key for Anthropic, OpenAI, OpenRouter, Ollama, or any OpenAI-compatible endpoint, and ZeroClaw handles the agent loop, memory, and channel connections. You control which model powers your agent and pay that provider directly.

**Configuration is file-driven — plan for `config.toml`.** ZeroClaw is configured through a `config.toml` defining providers, channels, memory, and policies, rather than a long list of environment variables. On Railway you provide this on the volume or through the template's configuration mechanism. Because ZeroClaw moves quickly, confirm the exact approach and current variables against the repository before publishing.

**Persist the volume — it's your agent's memory.** ZeroClaw's long-term memory and configuration live on the mounted volume. Without it, your agent forgets everything and loses its setup on redeploy. This template mounts a volume so both persist.

**Connect your channels with safe defaults.** ZeroClaw reaches you through Discord, Telegram, and many other channels, using allowlists and pairing so only you and people you approve can talk to it. Configure your channel tokens and keep the default access controls in place.

**Set clear policies for autonomous behavior.** ZeroClaw can run scheduled, autonomous tasks — daily summaries, web research, reminders. Define what it's allowed to do through its policy configuration, so its autonomy stays within bounds you've set, and enable only the tools and channels you actually need.

Typical cost: **~$5/month** on Railway for the tiny runtime, plus whatever you pay your LLM provider for usage. ZeroClaw is free and open source (MIT/Apache-2.0).

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| zeroclaw | `ghcr.io/zeroclaw-labs/zeroclaw` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `API_KEY` | (secret) |
| `PROVIDER` | ${PROVIDER:-openrouter} |
| `ZEROCLAW_GATEWAY_PORT` | ${ZEROCLAW_GATEWAY_PORT:-42617} |
| `ZEROCLAW_ALLOW_PUBLIC_BIND` | true |

## Configuration

- **Volume:** `/zeroclaw-data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/zeroclaw-ai-agent)
