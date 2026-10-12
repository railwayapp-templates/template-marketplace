# Deploy Magpie AI Gateway on Railway

Magpie AI gateway + Web UI, one HTTPS domain and persistent storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/magpie-ai-gateway)

## About

Deploy Magpie on Railway to manage your AI model providers and serve them through a shared API endpoint. Configure providers, accounts and routing groups in the Web UI, then connect your AI tools and applications to the gateway.

The template includes one service, persistent storage at `/config`, an automatically generated management key and a healthcheck. The Web UI and model API share one HTTPS domain.

Magpie supports OpenAI, Anthropic and Gemini API formats, including streaming responses. Available models depend on the providers and accounts you configure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| magpie-railway | [norberia/magpie-railway](https://github.com/norberia/magpie-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Public HTTP port for the Railway adapter. Keep the default 8080. |
| `MAGPIE_ADDR` | 0.0.0.0:3425 | Internal Magpie gateway listening address. Keep 0.0.0.0:3425. |
| `MAGPIE_WEB_KEY` | - | Automatically generated management key. After deployment, read this value in Railway Variables and open https://YOUR-DOMAIN/?k=YOUR-WEB-KEY. Keep it private. Model API clients use separate Gateway Keys. |
| `MAGPIE_WEB_URL` | - | Public HTTPS address of the management UI, derived automatically from the Railway domain. |
| `MAGPIE_PUBLIC_URL` | - | Public gateway base URL, derived automatically from the Railway domain with /gateway appended. OpenAI clients append /v1. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** AI/ML · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/deploy/magpie-ai-gateway)
