# Deploy OpenClaw (All-in-One Bundle) on Railway

OpenClaw + Web Wizard + Lite Panel + Web TUI + Browser + Searxng Search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-all-in-one-bundle)

## About

<img width="80" src="https://zyugzloemocjcxmspsso.supabase.co/storage/v1/object/public/static-assets/openclaw-logo.png" alt="OpenClaw Logo">
OpenClaw is a self-hosted personal AI assistant framework that connects to 17 messaging platforms — Telegram, Discord, Slack, WhatsApp, Signal, and more — with support for 14 AI providers including Anthropic, OpenAI, and Google Gemini. This all-in-one bundle packages OpenClaw with a web-based management dashboard, setup wizard, built-in Playwright browser automation, and signal-cli for Signal support into a single deployable service.

<img src="https://zyugzloemocjcxmspsso.supabase.co/storage/v1/object/public/static-assets/onboarding-wizard-english.png" alt="OpenClaw Web-based Onboarding Wizard">
<img src="https://zyugzloemocjcxmspsso.supabase.co/storage/v1/object/public/static-assets/onboarding-wizard-japanese.png" alt="OpenClaw Web-based Onboarding Wizard(Japanese)">
<img src="https://zyugzloemocjcxmspsso.supabase.co/storage/v1/object/public/static-assets/onboarding-wizard-ai-providers.png" alt="OpenClaw Web-based Onboarding Wizard(AI provider)">
<img src="https://zyugzloemocjcxmspsso.supabase.co/storage/v1/object/public/static-assets/web-tui-2.png" alt="Web-based TUI">
<img src="https://zyugzloemocjcxmspsso.supabase.co/storage/v1/object/public/static-assets/backup-restore.png" alt="Backup and version management" width="280">

#### ChatGPT / Codex Subscription Pairing

If you have a ChatGPT/Codex subscription, you can connect it without an API key — straight from the browser, even on a headless Railway container. Pick **OpenAI Codex (subscription)** as your provider and the wizard runs OpenAI's device-code flow for you:

1. Click **Open auth page** and sign in with your ChatGPT/Codex subscription.
2. Enter the one-time code the wizard shows you (expires in 15 minutes).
3. Keep the tab open — it polls for approval and finishes automatically.

![ChatGPT / Codex subscription pairing in the onboarding wizard](https://somi-public-assets.s3.ap-southeast-1.amazonaws.com/railway/openclaw-onboard-openai-sub.jpg)

Once you approve, the wizard applies the channels and skills you picked in earlier steps, fixes the model prefix (`openai-codex/...`), and restarts the gateway — no re-prompting and no terminal output to copy. When it's done you get **Open Lite Panel** and **Open OpenClaw Gateway Dashboard** buttons.

![Codex pairing finished — channels configured and gateway restarted](https://somi-public-assets.s3.ap-southeast-1.amazonaws.com/railway/openclaw-onboard-openai-sub-finish.png)

Hosting OpenClaw requires a single container that runs an Express wrapper server in front of the OpenClaw gateway. The wrapper provides password-protected endpoints for onboarding (`/onboard`) and day-to-day management (`/lite`), health checks for monitoring, and a reverse proxy that routes all other traffic to the gateway on loopback. A persistent volume at `/data` stores configuration, sessions, memory, and workspace files. The setup wizard walks you through selecting an AI provider, entering API keys, configuring messaging channels, and installing skills — no SSH or CLI access needed. Once deployed, the management dashboard gives you gateway control, token usage analytics, memory search, security audits, backup/restore, and in-app upgrades without redeploying.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenClaw | [protemplate/openclaw-railway](https://github.com/protemplate/openclaw-railway) | Web service |
| searxng-railway | [protemplate/searxng](https://github.com/protemplate/searxng) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SEARXNG_URL` | OpenClaw | - | Internal URL for SearXNG web search |
| `SETUP_PASSWORD` | OpenClaw | (secret) | Password for the setup wizard |
| `OPENCLAW_STATE_DIR` | OpenClaw | /data/.openclaw | - |
| `OPENCLAW_WORKSPACE_DIR` | OpenClaw | /data/workspace | - |
| `PORT` | searxng-railway | 8080 | - |
| `SEARXNG_BASE_URL` | searxng-railway | - | Base URL for SearXNG |
| `SEARXNG_SECRET_KEY` | searxng-railway | (secret) | Secret key for SearXNG |
| `SEARXNG_UWSGI_THREADS` | searxng-railway | 4 | - |
| `SEARXNG_UWSGI_WORKERS` | searxng-railway | 4 | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | searxng-railway | true | - |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/etc/searxng`

**Category:** AI/ML · **Languages:** JavaScript, Shell, Dockerfile, Makefile

[View on Railway →](https://railway.com/deploy/openclaw-all-in-one-bundle)
