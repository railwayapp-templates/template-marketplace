# Deploy Bifrost on Railway

Fastest enterprise AI gateway (50x faster than LiteLLM).

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bifrost-1)

## About

Deploy Bifrost HTTP `v2.2.3`, an open-source, high-performance AI gateway for routing requests across OpenAI, Anthropic, AWS Bedrock, Google, Azure, and other model providers.

This template runs the official Bifrost container as one public service on port 8080. Its configuration database, gateway settings, logs, budgets, virtual keys, routing rules, and plugin state persist on a Railway volume mounted at `/app/data`.

Open the generated domain to configure providers and routing in the Bifrost dashboard. The gateway starts without provider credentials, but model requests require at least one configured provider. Configure Bifrost authentication, virtual keys, and governance controls before exposing production provider access.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bifrost | `maximhq/bifrost:v2.2.3@sha256:975487b95c6399de26e3a108164f21ae52687b316580a13ff0c239b865649ed2` | Web service |

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
