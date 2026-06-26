# Deploy otari on Railway

 OpenAI-compatible LLM gateway: virtual keys, budgets, usage tracking

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/otari-railway-template-demo)

## About

Otari is an open-source, OpenAI-compatible LLM gateway you run yourself. Put one endpoint in front of providers like OpenAI, Anthropic, Mistral, and Gemini, then
  issue virtual API keys, enforce per-user budgets, and track usage and cost in one place. It speaks the OpenAI Chat Completions and Responses APIs plus the Anthropic
  Messages API.

  ## About Hosting Otari

  This template runs two services: the Otari gateway from its published Docker image, and a managed PostgreSQL database. Otari is stateless; Postgres holds your keys,
  users, budgets, and usage. On first boot Otari runs its database migrations automatically and prints a bootstrap API key in the deploy logs, so the gateway is
  usable right away. You supply at least one provider API key (for example OPENAI_API_KEY or ANTHROPIC_API_KEY); the master key for management endpoints is generated
  for you. The gateway listens on port 8000 with a health check at /health. The gateway scales horizontally, and Postgres is the single stateful dependency.

  ## Common Use Cases

  - Give a team one OpenAI-compatible endpoint in front of multiple providers
  - Issue and revoke virtual API keys per app or user without sharing raw provider keys
  - Enforce per-user budgets and track spend and token usage across models

  ## Dependencies for Otari Hosting

  - A PostgreSQL database (provisioned by this template)
  - At least one provider API key (OpenAI, Anthropic, Mistral, or Gemini)

  ### Deployment Dependencies

  - Otari repository: https://github.com/mozilla-ai/otari
  - Otari documentation: https://github.com/mozilla-ai/otari/tree/main/docs
  - Docker image: https://hub.docker.com/r/mzdotai/otari
  - any-llm (provider routing and env var names): https://github.com/mozilla-ai/any-llm

  ### Implementation Details

  Provider keys use each provider's native variable name (OPENAI_API_KEY, ANTHROPIC_API_KEY, MISTRAL_API_KEY, GEMINI_API_KEY), read directly by the any-llm SDK, so
  any any-llm provider works by adding its env var. OTARI_REQUIRE_PRICING is set to false so models without configured pricing are served out of the box.
  OTARI_DATABASE_URL is wired to the Postgres service via a reference variable.

  ## Why Deploy Otari on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while
  allowing you to vertically and horizontally scale it.

  By deploying Otari on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents,
  and more on Railway.

  Then hit Publish. After it's live, the listing gets a marketplace URL; the deploy link in the README button keeps working regardless, so no further repo change is
  needed unless the deploy code changes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| otari | `mzdotai/otari:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `OPENAI_API_KEY` | otari | (secret) | Or add whatever api keys you want, see https://docs.mozilla.ai/providers |
| `OTARI_REQUIRE_PRICING` | otari | false | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/otari-railway-template-demo)
