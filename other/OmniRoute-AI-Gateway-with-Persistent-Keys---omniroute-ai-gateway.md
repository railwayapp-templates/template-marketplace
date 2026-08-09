# Deploy OmniRoute — AI Gateway with Persistent Keys on Railway

Self-host an AI gateway — providers & keys survive redeploys

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/omniroute-ai-gateway)

## About

OmniRoute is a self-hosted AI gateway that puts one unified API in front of every LLM provider you use — OpenAI, Anthropic, Google, OpenRouter, Ollama, and any OpenAI-compatible endpoint — with your own keys (BYOK), automatic fallback between providers, and prompt compression to cut token spend. The headline of this build: your configured providers, keys, and settings persist on a volume, so they survive redeploys instead of vanishing every time you ship a change. Point your apps at one endpoint and route across models without rewriting integrations.

---

OmniRoute is a straightforward gateway to run, and this build is specifically about making its state durable — plus the essentials for a secure deploy.

**Providers and keys survive redeploys — the whole point of this build.** In many gateway setups, configured providers and keys live in the container and vanish on every redeploy, forcing you to re-enter them each time you ship. This template mounts a persistent volume for OmniRoute's config and encrypted key store, so your providers, routing rules, and keys persist across redeploys, restarts, and crashes. Configure once; it stays configured.

**Bring your own keys.** OmniRoute doesn't resell inference — you add your own provider API keys (OpenAI, Anthropic, Google, OpenRouter, Ollama, or any OpenAI-compatible endpoint), and it routes requests using them. You pay each provider directly and keep full control of your credentials, which never leave your infrastructure.

**Automatic fallback keeps apps running.** Define a primary provider and fallbacks, and if one is down, rate-limited, or erroring, OmniRoute automatically retries the next — so a single provider outage doesn't take your app down. One endpoint, resilient routing.

**Prompt compression cuts your token spend.** OmniRoute can compress prompts before they reach the provider, reducing token usage — and therefore cost — on your own API bills, without you rewriting how your app builds prompts. It's an optional efficiency layer on the requests you already send.

**Encrypt the key store and set the master key.** `STORAGE_ENCRYPTION_KEY` (a 256-bit key, `openssl rand -hex 32`) encrypts the stored provider keys at rest — set it and keep it stable, since changing it makes existing stored keys unreadable. Secure the dashboard with strong admin credentials, and keep OmniRoute's endpoint access-controlled since it holds your provider keys.

**One endpoint, many models.** Applications call OmniRoute's OpenAI-compatible API and select models across providers without per-provider integration code — useful for redundancy or centralizing routing across a team.

Typical cost: **~$5–10/month** on Railway for the gateway, plus whatever you pay your LLM providers for usage. OmniRoute is open source; pin the version (`v3.8.49`) for reproducible deploys.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| omniroute | `ghcr.io/bon5co/omniroute-railway` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `INITIAL_PASSWORD` | (secret) |

## Configuration

- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/omniroute-ai-gateway)
