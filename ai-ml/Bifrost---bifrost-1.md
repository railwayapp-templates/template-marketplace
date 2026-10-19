# Deploy Bifrost on Railway

Fastest enterprise AI gateway (50x faster than LiteLLM).

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bifrost-1)

## About

Deploy Bifrost HTTP `v2.3.0`, an open-source, high-performance AI gateway for routing requests across OpenAI, Anthropic, AWS Bedrock, Google, Azure, and other model providers.

This template runs the official Bifrost container as one public service on port 8080. Its configuration database, gateway settings, logs, budgets, virtual keys, routing rules, and plugin state persist on a Railway volume mounted at `/app/data`.

Open the generated domain to configure providers and routing in the Bifrost dashboard. The gateway starts without provider credentials, but model requests require at least one configured provider. Configure Bifrost authentication, virtual keys, and governance controls before exposing production provider access.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bifrost | `maximhq/bifrost:v2.3.0@sha256:8f37e33a8caa85faf59a875605c61d1d934738e517d8fe96e2d9fcf6f0ef9098` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Application port of the gateway. |
| `BIFROST_SETUP_TOKEN` | (secret) | One-time setup token. Enter it in the dashboard on first visit to create the admin account; management API calls are rejected until then. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/bifrost-1)
