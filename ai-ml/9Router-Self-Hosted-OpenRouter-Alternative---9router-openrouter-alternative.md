# Deploy 9Router — Self-Hosted OpenRouter Alternative on Railway

Zero-markup OpenRouter alternative — self-host 60+ LLM providers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/9router-openrouter-alternative)

## About

9Router is a self-hosted, open-source **OpenRouter alternative** — one OpenAI-compatible endpoint in front of 60+ LLM providers, with zero markup on your usage and no third-party cloud in the request path. It's the middle ground the LLM-gateway market is missing: the zero-fee, bring-your-own-keys model of a self-hosted proxy like LiteLLM, but with a one-click deploy and a management dashboard instead of an ops project. Point Claude Code, Cursor, Codex, or any OpenAI-compatible tool at one URL and route across providers with automatic fallback.

---

If you're moving off OpenRouter, you're weighing two options, and each has a catch this template is built to sidestep.

**OpenRouter is managed and simple, but you pay for it — and route through it.** Every credit purchase carries a platform fee (around 5.5%), bring-your-own-key still costs roughly 5% past the free cap, and every request passes through a third-party cloud you can't self-host, which is a hard stop for data-residency and compliance work. At $1,000/month of API spend that's $55/month in fees alone; at $5,000 it's $250 — pure routing overhead.

**LiteLLM is the usual self-hosted answer, but you become the platform team.** It's a bare proxy: you deploy and patch it, run its Postgres and Redis, and own uptime — a production setup commonly runs a few hundred dollars a month in infrastructure plus your time.

9Router sits between the two. It's self-hosted so there's **zero markup** — you bring your own provider keys and pay providers directly — and your requests never leave your infrastructure, which satisfies data residency. But it deploys in one click with SQLite instead of a Postgres-plus-Redis stack, and it ships a dashboard for keys, routing tiers, and usage rather than a config file you hand-edit. Zero-fee like LiteLLM, near-zero-ops like a managed gateway.

Because Railway assigns a public HTTPS domain, treat the instance as a credential store: it holds every provider key you connect, so set a strong dashboard password before adding any.

Typical cost: **~$5/month** on Railway for the single container — versus OpenRouter's percentage fees or LiteLLM's multi-service infrastructure bill. 9Router is MIT-licensed; you pay providers directly.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 9Router | `decolua/9router:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 20128 |
| `DATA_DIR` | /app/data |
| `NODE_ENV` | production |
| `CLOUD_URL` | https://9router.com |
| `JWT_SECRET` | (secret) |
| `API_KEY_SECRET` | (secret) |
| `INITIAL_PASSWORD` | (secret) |
| `NEXT_PUBLIC_CLOUD_URL` | https://9router.com |
| `OBSERVABILITY_ENABLED` | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/9router-openrouter-alternative)
