# Deploy Manifest — LLM Provider Gateway for Agents on Railway

Self-host Manifest — one endpoint for keys, subs, local & custom

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/manifest-llm-router)

## About

Manifest is an open-source AI provider gateway for agents and apps — connect your API keys, provider subscriptions, local models, and any custom OpenAI-compatible endpoint behind one unified endpoint and dashboard. Your agents talk to a single OpenAI-compatible URL, and Manifest routes each request to the right provider, so you're never locked into one platform. This template deploys Manifest with PostgreSQL on Railway, ready to connect providers in minutes.

---

Manifest solves a specific problem: agents and apps that get locked into a single LLM provider, with keys and configuration scattered across codebases.

**One endpoint in front of every provider.** Manifest sits between your agents and your models as an OpenAI-compatible proxy. Point any OpenAI SDK client at Manifest's URL, and it routes to whatever you've connected behind it — no per-provider integration, no lock-in. Switching or adding providers happens in the dashboard, not in your agent's code.

**It connects more than just API keys.** This is where Manifest stands out from a plain gateway. It supports four kinds of provider at once: **bring-your-own API keys** for cloud providers (OpenAI, Anthropic, and dozens more), **provider subscriptions** (reuse subscription flows instead of only pay-per-token keys), **local models** (Ollama, LM Studio, llama.cpp, or any local server), and **custom OpenAI/Anthropic-compatible endpoints**. All of them route through the same endpoint, so an agent can mix cloud, subscription, and local models transparently.

**Smart routing and fallback come built in.** Manifest scores each request and can route to the most appropriate model — including sending simpler requests to cheaper models to cut cost — with the decision made locally in milliseconds, adding no meaningful latency. If a provider fails, it automatically falls back to another, and it tracks every request, token, and dollar per agent and provider in the dashboard.

**Two services, minimal footprint.** Manifest runs as a container with PostgreSQL for its state. The first account you create becomes the admin; from there you connect providers and generate a per-agent base URL and key. Keep the dashboard access-controlled, since it holds all your provider credentials.

Typical cost: **~$5–10/month** on Railway for Manifest and Postgres, plus whatever you pay your providers directly (Manifest doesn't mark up usage).

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Manifest | `manifestdotbuild/manifest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 2099 |
| `MANIFEST_MODE` | selfhosted |
| `BETTER_AUTH_SECRET` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/manifest-llm-router)
