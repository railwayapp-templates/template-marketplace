# Deploy OpenClaw (All-in-One Bundle) on Railway

OpenClaw + Web Wizard + Lite Panel + Web TUI + Browser + Searxng Search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-all-in-one-bundle)

## About

<img alt="OpenClaw Logo" src="https://zyugzloemocjcxmspsso.supabase.co/storage/v1/object/public/static-assets/openclaw-logo.png" width="80">
OpenClaw is a self-hosted personal AI assistant framework that connects to 17 messaging platforms — Telegram, Discord, Slack, WhatsApp, Signal, and more — with support for 14 AI providers including Anthropic, OpenAI, and Google Gemini. This all-in-one bundle packages OpenClaw with a web-based management dashboard, setup wizard, built-in Playwright browser automation, and signal-cli for Signal support into a single deployable service.

<img alt="OpenClaw Web-based Onboarding Wizard" src="https://zyugzloemocjcxmspsso.supabase.co/storage/v1/object/public/static-assets/onboarding-wizard-english.png">
<img alt="OpenClaw Web-based Onboarding Wizard(Japanese)" src="https://zyugzloemocjcxmspsso.supabase.co/storage/v1/object/public/static-assets/onboarding-wizard-japanese.png">
<img alt="OpenClaw Web-based Onboarding Wizard(AI provider)" src="https://zyugzloemocjcxmspsso.supabase.co/storage/v1/object/public/static-assets/onboarding-wizard-ai-providers.png">
<img alt="Web-based TUI" src="https://zyugzloemocjcxmspsso.supabase.co/storage/v1/object/public/static-assets/web-tui-2.png">
<img width="280" alt="Backup and version management" src="https://zyugzloemocjcxmspsso.supabase.co/storage/v1/object/public/static-assets/backup-restore.png">

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
