# Deploy Hermes Agent (All-in-One Bundle) on Railway

Hermes Agent + Hermes Web UI + Web TUI + Browser + Searxng Search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-all-in-one)

## About

<img width="80" src="https://somi-public-assets.s3.ap-southeast-1.amazonaws.com/railway/hermes-agent-logo.png" alt="Hermes Agent Logo">

Hermes Agent is a self-improving, open-source AI agent from Nous Research. It connects to messaging channels such as Telegram, Discord, Slack, WhatsApp, Signal, and Email, remembers previous work, creates and improves skills, and can run scheduled automations. This Railway template packages Hermes with [Hermes WebUI](https://github.com/nesquena/hermes-webui) — the popular community web interface — so you get a polished browser experience for chat, sessions, settings, and onboarding right after deploy.

The template also includes a companion SearXNG service so Hermes has private, self-hosted web search available without third-party search API keys.

<img src="https://somi-public-assets.s3.ap-southeast-1.amazonaws.com/railway/hermes-agent-webui.png" alt="Hermes Agent WebUI">

<img src="https://somi-public-assets.s3.ap-southeast-1.amazonaws.com/railway/hermes-agent-webui-onboarding.jpg" alt="Hermes Agent WebUI Onboarding">

<img src="https://somi-public-assets.s3.ap-southeast-1.amazonaws.com/railway/hermes-agent-gateway-telegram.png" alt="Hermes Agent Gateway Telegram">

### Web-Based TUI: One-Click OAuth, No SSH Required

Headless OAuth is a nightmare — no browser, no localhost callback, no easy way to paste a device code. Railway has `railway ssh` if you've installed the CLI and linked the project, but most people deploying from a template haven't, and a browser is always closer to hand than a terminal. This template ships with **`/tui`**, a web-based terminal embedded directly in the Hermes UI. Open it from any browser and you get the full Hermes CLI experience without installing anything locally.

**One-Click OAuth.** `/tui` runs Hermes' device-code flow for you. Click "Login with ChatGPT (Codex)", scan the code on your phone, and you're chatting with GPT-5.5 through your existing **$20/mo ChatGPT subscription** — no API key, no per-token billing, no SSH tunnels, no `xdg-open` errors. Same flow works for **Nous Portal**, **Anthropic (Claude Max)**, and **GitHub Copilot**. For other providers (OpenRouter, DeepSeek, Gemini API, etc.), paste your API key into the WebUI Settings panel.

<img src="https://somi-public-assets.s3.ap-southeast-1.amazonaws.com/railway/openai-codex-cli-oauth-1.jpg" alt="OpenAI Codex CLI OAuth">

<img width="300" src="https://somi-public-assets.s3.ap-southeast-1.amazonaws.com/railway/openai-codex-cli-oauth-2.png" alt="OpenAI Codex CLI OAuth">

**Full web shell.** `/tui` also exposes a long-lived `/bin/bash` pane for the moments you need to peek at logs, inspect `/data`, or run a `hermes` CLI command directly — no `railway ssh` setup, no local CLI install required. Authentication reuses the WebUI's `hermes_session` cookie, so the shell is gated behind the same admin password as the rest of the UI.

<img src="https://somi-public-assets.s3.ap-southeast-1.amazonaws.com/railway/hermes-agent-web-tui.png" alt="Hermes Agent TUI">

### Built-In Chromium: Real Browser Automation Out of the Box

<img src="https://somi-public-assets.s3.ap-southeast-1.amazonaws.com/railway/hermes-agent-web-browser.png" alt="Hermes Agent Chromium Browser">

Most Railway templates that "support a browser tool" leave you to figure out the runtime yourself — Hermes happily calls Playwright, but only if Chromium and its system libraries are actually installed. This template ships with **Playwright Chromium pre-installed** in the container, so Hermes' browser tool works the moment the deploy finishes. No `apt-get install`, no missing `libnss3` errors, no headless-shell dance.

That means you can ask Hermes to:

- **Navigate sites and fill forms** — log into dashboards, submit signup pages, click through multi-step flows.
- **Take screenshots** — capture a page, a region, or full scrollable content for reports, monitoring, or audits.
- **Scrape rendered HTML** — pages that need JavaScript to render are no problem.
- **Drive auth flows** — pair the browser with the agent's memory to keep sessions across runs.

Combined with the bundled SearXNG service, Hermes can search the web privately, then open and interact with the results — all inside one Railway project, with no third-party browser API.

Hosting Hermes Agent on Railway runs a containerized Hermes Agent installation with Hermes WebUI on the public HTTP port. The WebUI persists configuration into the `/data` volume (`.env`, `config.yaml`, sessions, skills, memory, workspace files, WebUI state). Users configure an LLM provider, default model, channel credentials, and skills directly through the WebUI's Hermes Control Center.

An optional `START_GATEWAY=true` environment variable enables the messaging gateway daemon (`hermes gateway run --replace`) so Telegram/Discord/Slack/email bridges run alongside the WebUI in the same container.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes-agent | [protemplate/hermes-agent-railway](https://github.com/protemplate/hermes-agent-railway) | Web service |
| searxng-railway | [protemplate/searxng](https://github.com/protemplate/searxng) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | hermes-agent | 8080 | - |
| `SEARXNG_URL` | hermes-agent | - | Internal URL for SearXNG web search |
| `START_GATEWAY` | hermes-agent | false | Set to "true" to also auto-start the messaging gateway daemon (Telegram/Discord/Slack/email bridges). |
| `ADMIN_PASSWORD` | hermes-agent | (secret) | Admin dashboard password |
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

**Category:** Other · **Languages:** Python, HTML, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/hermes-agent-all-in-one)
