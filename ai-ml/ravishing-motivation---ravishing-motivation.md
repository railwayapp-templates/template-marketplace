# Deploy ravishing-motivation on Railway

Proxy server for Matchwiser AI widget

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ravishing-motivation)

## About

Matchwiser Proxy is a lightweight Fastify server that acts as a secure backend for your AI lead qualification widget. It handles all communication with LLM providers, keeping your API keys server-side and away from the browser.

Your website's embed snippet cannot talk directly to Anthropic or OpenAI — API keys would be exposed to anyone who inspects your page. This proxy sits in between: it authenticates every request using a signed widget token, manages conversation sessions, and forwards only validated requests to the LLM provider.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| raonicaselli/propwidget-proxy:latest | `raonicaselli/matchwiser-proxy` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GEMINI_API_KEY` | (secret) | Required when DEFAULT_LLM_PROVIDER=gemini |
| `OPENAI_API_KEY` | (secret) | Required when DEFAULT_LLM_PROVIDER=openai |
| `ANTHROPIC_API_KEY` | (secret) | Required when DEFAULT_LLM_PROVIDER=anthropic |
| `DEFAULT_LLM_MODEL` | - | Leave blank to use the built-in default for the chosen provider |
| `LEADS_WEBHOOK_URL` | - | Your backend endpoint that receives lead data via POST when a visitor qualifies or clicks the CTA |
| `WIDGET_TOKEN_ISSUER` | (secret) | - |
| `WIDGET_TOKEN_SECRET` | (secret) | Pre-generated secret — copy from your download page |
| `DEFAULT_LLM_PROVIDER` | anthropic | Change to openai or gemini if you don't have an Anthropic key |
| `LEADS_WEBHOOK_SECRET` | (secret) | If set, every webhook request includes X-Matchwiser-Signature: sha256=<hmac> so you can verify authenticity |
| `WIDGET_TOKEN_AUDIENCE` | (secret) | - |

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ravishing-motivation)
