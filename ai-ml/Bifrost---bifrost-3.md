# Deploy Bifrost on Railway

Bifrost AI gateway locked down: dashboard login, keys required, providers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bifrost-3)

## About

[Bifrost](https://github.com/maximhq/bifrost) is an AI gateway: one OpenAI-compatible endpoint in front of OpenAI, Anthropic, Gemini, OpenRouter and 20+ other providers, with virtual keys, budgets, rate limits, fallbacks, request logs and a dashboard. This template runs version 2.2.4.

A gateway holds your provider keys, so a public one has to be locked before anyone finds the URL. A fresh Bifrost is open: until an admin account exists its config API accepts changes without a login, and unless "enforce auth on inference" is on, anyone can send requests through your keys.

Here a start step writes Bifrost's `config.json` before every start:

- the dashboard login is on, with `BIFROST_ADMIN_PASSWORD` generated at deploy
- every model call needs a key; `BIFROST_VIRTUAL_KEY` is generated and works with every provider you add
- browser requests from other sites (CORS) are limited to your Railway domain
- each provider key you set as a variable (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`, `OPENROUTER_API_KEY`) becomes a provider

The file only holds references to the variables, not the keys themselves. Bifrost merges it into its own database at start and keeps changes you make in the dashboard unless the matching part of the file changes. If the password or key is missing the service refuses to start, so it never runs open.

Before publishing I tested it on Railway with an OpenRouter key. `/health` answered, the config API refused anonymous reads and writes (401), a wrong password got 401, and the admin signed in and saw keys required on inference and OpenRouter as a provider. A chat completion without a key and with a wrong key got 401; with `BIFROST_VIRTUAL_KEY` it answered in under a second. After a restart the login, the key and the completion worked the same.

It used 0.27 GB of RAM, about $3 a month on Railway's usage pricing, plus what your providers charge.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bifrost | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /bifrost) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port Railway routes to |
| `BIFROST_URL` | - | Dashboard; sign in with BIFROST_ADMIN_USERNAME and BIFROST_ADMIN_PASSWORD |
| `GEMINI_API_KEY` | (secret) | Optional: Google Gemini key |
| `OPENAI_API_KEY` | (secret) | Optional: OpenAI key. Or add providers in the dashboard |
| `ANTHROPIC_API_KEY` | (secret) | Optional: Anthropic key |
| `OPENROUTER_API_KEY` | (secret) | Optional: OpenRouter key (hundreds of models with one key) |
| `BIFROST_SETUP_TOKEN` | (secret) | One-time token Bifrost asks for when an admin account is first created (generated) |
| `BIFROST_VIRTUAL_KEY` | - | API key your apps send (Authorization: Bearer ...). Works with every provider you add (generated) |
| `BIFROST_ADMIN_PASSWORD` | (secret) | Dashboard password (generated) |
| `BIFROST_ADMIN_USERNAME` | (secret) | Dashboard username |
| `BIFROST_OPENAI_BASE_URL` | - | OpenAI-compatible base URL for your apps; the API key is BIFROST_VIRTUAL_KEY |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML · **Tags:** bifrost, ai-gateway, llm, openai, anthropic, openrouter, litellm-alternative · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/bifrost-3)
