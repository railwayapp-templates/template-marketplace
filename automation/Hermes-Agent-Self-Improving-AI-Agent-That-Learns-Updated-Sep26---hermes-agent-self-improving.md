# Deploy Hermes Agent — Self-Improving AI Agent That Learns [Updated Sep'26] on Railway

Self-host Hermes by Nous Research — an AI agent that learns & improves

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-self-improving)

## About

Hermes Agent is a self-improving open-source AI agent by Nous Research — the agent that grows with you. Unlike a static chatbot, it runs a closed learning loop after every task: it creates its own reusable skills from experience, remembers past conversations, and gets measurably more capable at your specific workflows over time. Connect it to Telegram, Discord, Slack, WhatsApp, or email, bring your own LLM, and it learns as it works. This template deploys Hermes Agent with persistent storage for its memory and learned skills and an admin dashboard — so you have a private agent that improves week over week, in minutes.

---

Hermes Agent's whole point is that it improves over time — the key to hosting it is persisting what it learns, and this template does exactly that.

**The learning loop is the differentiator — persist what it learns.** Where most agents forget everything between sessions, Hermes runs a closed learning loop: after each task it generates reusable skills, models your preferences, and searches past conversations for context, so it gets better at your workflows every week. That accumulated intelligence — learned skills, memory, preferences — lives on the `/data` volume, so this template's persistent storage is what lets the agent keep what it builds instead of resetting on every redeploy. Persisting the volume is the whole game.

**Bring your own LLM — any provider.** Hermes is model-agnostic: select your provider and key (OpenAI, Anthropic, OpenRouter, or a local model) in the dashboard, and Hermes uses it for reasoning and skill generation. You bring your own key and pay the provider directly, and the container stays light because inference happens on their side, not yours.

**Set up in the dashboard — no config files.** The template ships a pre-configured admin dashboard for setup, gateway management, live monitoring, and user access control. Open your Railway URL, pick your LLM provider, enable the channels you want, and start chatting — there are no config files to hand-edit. Protect the dashboard with a strong login, since it controls an agent with tool access.

**Connect channels, tools, and cron.** Hermes lives where you already are: enable Telegram, Discord, Slack, WhatsApp, or email from the dashboard and run one agent across all of them, with per-user access control and pairing approval for teams. Beyond chat, it uses tools and runs scheduled tasks with a built-in cron scheduler, executing multi-step work autonomously — a persistent assistant that runs research and daily briefings, not just answers questions.

Typical cost: **~$5–10/month** on Railway for the lightweight agent (plus your LLM provider usage) — inference runs on your provider, so the container itself is cheap. Hermes Agent is MIT-licensed and free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hermes Agent | [praveen-ks-2001/hermes-agent-template](https://github.com/praveen-ks-2001/hermes-agent-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ADMIN_PASSWORD` | (secret) | Create admin login password credential |
| `ADMIN_USERNAME` | (secret) | Create admin login username credential |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** Automation · **Languages:** Python, HTML, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/hermes-agent-self-improving)
