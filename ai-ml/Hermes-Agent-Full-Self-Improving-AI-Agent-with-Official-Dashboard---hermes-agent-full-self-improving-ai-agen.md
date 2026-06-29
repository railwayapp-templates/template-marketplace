# Deploy Hermes Agent (Full) — Self-Improving AI Agent with Official Dashboard on Railway

Self-hosted Hermes AI agent + official Nous dashboard, self-improving

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-full-self-improving-ai-agen)

## About

[Hermes](https://github.com/nousresearch/hermes-agent) is a self-improving AI agent
by **Nous Research** that connects to your messaging channels, learns from every
interaction, creates its own skills, and gets more capable over time. This **Full**
template runs the agent **plus the first-party Nous `hermes dashboard`** — built from
source — so you can configure and monitor everything from your browser.

![Hermes Agent — the official Nous web dashboard](https://raw.githubusercontent.com/yuting1214/hermes-railway-template/30a9321/assets/dashboard.png)

The Full variant serves the **official Hermes web dashboard** behind basic auth (not a
third-party UI): configure LLM providers, channels, and tools; watch live gateway
logs; and start/stop the agent — all point-and-click. Alongside it runs the same
always-on `hermes gateway` that answers Telegram, Discord, and Slack 24/7. Config,
skills, memories, and sessions persist on a Railway **volume** (`/opt/data`) so they
survive redeploys. Steady memory is **~300 MB** (dashboard + gateway) with **no
headless browser** bundled — lean for what it offers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes | [yuting1214/hermes-railway-template](https://github.com/yuting1214/hermes-railway-template) (root: /variants/full) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HERMES_DASHBOARD_BASIC_AUTH_PASSWORD` | (secret) |
| `HERMES_DASHBOARD_BASIC_AUTH_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/hermes-agent-full-self-improving-ai-agen)
