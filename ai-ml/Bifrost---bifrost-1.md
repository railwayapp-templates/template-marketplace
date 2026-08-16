# Deploy Bifrost on Railway

Fastest enterprise AI gateway (50x faster than LiteLLM).

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bifrost-1)

## About

Deploy Bifrost HTTP `v1.6.11`, an open-source, high-performance AI gateway for routing requests across OpenAI, Anthropic, AWS Bedrock, Google, Azure, and other model providers.

This template runs the official Bifrost container as one public service on port 8080. Its configuration database, gateway settings, logs, budgets, virtual keys, routing rules, and plugin state persist on a Railway volume mounted at `/app/data`.

Open the generated domain to configure providers and routing in the Bifrost dashboard. The gateway starts without provider credentials, but model requests require at least one configured provider. Configure Bifrost authentication, virtual keys, and governance controls before exposing production provider access.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bifrost | `maximhq/bifrost:v1.6.11@sha256:ef8e686b3588884066ec3d0e57f3fc15136b11047ad94678adefe5a9573539af` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Application port of the gateway. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/bifrost-1)
