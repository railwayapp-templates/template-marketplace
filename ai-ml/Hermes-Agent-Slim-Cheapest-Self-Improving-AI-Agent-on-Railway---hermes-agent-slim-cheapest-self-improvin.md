# Deploy Hermes Agent (Slim) — Cheapest Self-Improving AI Agent on Railway on Railway

Cheapest self-hosted Hermes AI agent, ~112 MB RAM, self-improving, 24/7

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-slim-cheapest-self-improvin)

## About

[Hermes](https://github.com/nousresearch/hermes-agent) is a self-improving AI agent
by **Nous Research** — it connects to your messaging channels, learns from every
interaction, creates its own skills, and gets more capable over time. This **Slim**
template runs it **headless** (CLI + always-on messaging gateway, no web UI) for the
**smallest possible footprint — ~112 MB RAM**.

Hosting the Slim variant means running an always-on `hermes gateway` that answers
Telegram, Discord, and Slack around the clock, while persisting skills, memories,
sessions, and auth on a Railway **volume** (`/data`) so they survive redeploys. It
ships **no dashboard, no Node, and no headless browser** — just the agent and its
messaging gateway, with glibc tuned (`MALLOC_ARENA_MAX=2`) so the always-on engine
idles around **~112 MB**. Because Railway bills by **GB-hour of memory**, a leaner
agent means a **lower monthly bill** for the same 24/7 self-improving agent. You can
drive it from your terminal over `railway ssh` + `tmux` and `hermes chat`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes | [yuting1214/hermes-railway-template](https://github.com/yuting1214/hermes-railway-template) (root: /variants/slim) | Database |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/hermes-agent-slim-cheapest-self-improvin)
