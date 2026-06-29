# Deploy Hermes Agent (Slim) — Cheapest Self-Improving AI Agent on Railway

Memory-efficient self-hosted Hermes AI agent, self-improving, 24/7

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-slim-cheapest-self-improvin)

## About

[Hermes](https://github.com/nousresearch/hermes-agent) is a self-improving AI agent
by **Nous Research** that connects to your messaging channels, learns from every
interaction, creates its own skills, and gets more capable over time. This **Slim**
template runs it **headless** — CLI plus an always-on messaging gateway, no web UI —
for the smallest possible footprint (**~112 MB RAM**).

![Hermes Agent — CLI splash showing 31 tools and 76 skills](https://raw.githubusercontent.com/yuting1214/hermes-railway-template/7b6ac00/assets/onboarding.png)

The Slim variant keeps an always-on `hermes gateway` answering Telegram, Discord, and
Slack around the clock, while persisting skills, memories, and sessions automatically
so they survive redeploys. It ships **no dashboard, no Node, and no headless browser**
— just the agent and its gateway, tuned to idle around **~112 MB**. Because Railway
bills by **GB-hour of memory**, a leaner agent means a **lower monthly bill** for the
same self-improving agent. Storage, persistence, and low-memory tuning are handled for
you — you only bring an LLM key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes | [yuting1214/hermes-railway-template](https://github.com/yuting1214/hermes-railway-template) (root: /variants/slim) | Database |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/hermes-agent-slim-cheapest-self-improvin)
