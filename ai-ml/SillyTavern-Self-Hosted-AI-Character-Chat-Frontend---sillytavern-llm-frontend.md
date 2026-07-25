# Deploy SillyTavern — Self-Hosted AI Character Chat Frontend on Railway

Power-user AI character chat — any LLM, uncensored, your server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sillytavern-llm-frontend)

## About

SillyTavern is the most powerful open-source LLM frontend for power users — a self-hosted interface for character-driven chat, roleplay, and advanced prompt engineering that works with virtually any AI backend: OpenAI, Anthropic, Google, OpenRouter, KoboldAI, text-generation-webui, and local models. Character cards, group chats, world info, extensions, and fine-grained sampler control, all on infrastructure you own. This template deploys it with the Railway-specific security configuration already solved.

---

SillyTavern is built to run on your own machine, and that creates one specific problem on any cloud host that stops most deployments cold: **it ships with `whitelistMode: true`, which blocks every connection that isn't from localhost.** Deploy it as-is on Railway and you're locked out of your own instance with a "Blocked connection from [IP]" error — the IP whitelist is checking against a fixed local address that doesn't exist in a cloud environment with dynamic IPs.

The fix has two parts, and doing only the first breaks it a different way:

1. **Disable IP whitelisting** (`SILLYTAVERN_WHITELISTMODE=false`), because Railway assigns dynamic IPs with no stable gateway to whitelist.
2. **Enable basic auth** (`SILLYTAVERN_BASICAUTHMODE=true` with a username and password), because SillyTavern refuses to start when listening publicly unless at least one security layer — whitelist, basic auth, or account mode — is active. Turn off the whitelist without replacing it and the server won't boot.

This template configures both, so your instance is reachable *and* protected from the first deploy. This matters more than usual here: SillyTavern connects to LLM backends using your API keys, so an unprotected public instance is an open door to your provider credits.

Typical cost: **~$5/month** on Railway's Hobby plan for a single always-on frontend. SillyTavern is free and MIT-licensed; you pay only for the LLM backends you connect.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SillyTavern | `ghcr.io/null2264/st-railway:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SILLYTAVERN_LOG_LEVEL` | 3 | Minimum log level to display (DEBUG = 0, INFO = 1, WARN = 2, ERROR = 3) |
| `SILLYTAVERN_ENABLE_IPV6` | false | - |
| `SILLYTAVERN_PREFER_IPV6` | false | - |
| `SILLYTAVERN_DISCREET_LOGIN` | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/app/persist/`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/sillytavern-llm-frontend)
