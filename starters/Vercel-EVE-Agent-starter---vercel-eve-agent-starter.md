# Deploy Vercel EVE Agent starter on Railway

Starter template for building AI agents with Vercel Eve.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vercel-eve-agent-starter)

## About

Vercel EVE Agent Starter is a production-ready template for building conversational AI agents with Vercel Eve. It ships with a working example — a support agent that answers from a FAQ knowledge base and escalates to a ticket when it can't find an answer — so you can see it running before building your own.

Hosting this template on Railway means running a standard Node.js 24 service built with Railpack from a pnpm-managed repository — no Dockerfile needed. The build compiles the agent with `eve build` and serves it with `eve start`, listening on Railway's injected `PORT`. Because the container has no Docker-in-Docker or KVM access, the template ships `just-bash` so Eve's execution sandbox can initialize on a plain Linux host. The OpenAI model, reasoning effort, and HTTP Basic credentials that gate `/eve/v1/session` in production are read from environment variables, with `/eve/v1/health` left public for Railway's healthcheck.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Eve Agent Starter | [tresdoce/eve-agent-starter](https://github.com/tresdoce/eve-agent-starter) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 2000 | Puerto en el que escucha la app (Railway lo inyecta solo, no hace falta tocarlo) |
| `APP_STAGE` | production | Entorno de la app: local | test | develop | qa | homo | production |
| `OPENAI_MODEL` | gpt-4o | Modelo de OpenAI que usa el agente (opcional, default gpt-4o) |
| `OPENAI_API_KEY` | (secret) | API key de OpenAI (requerida) |
| `RAILPACK_NODE_VERSION` | 24 | Versión de Node para el build de Railpack — Eve requiere >=24 |
| `OPENAI_REASONING_EFFORT` | medium | Nivel de razonamiento del modelo (opcional): none | minimal | low | medium | high | xhigh |
| `ROUTE_AUTH_BASIC_PASSWORD` | (secret) | Password para autenticar /eve/v1/session en producción (httpBasic) — se regenera en cada redeploy |
| `ROUTE_AUTH_BASIC_USERNAME` | (secret) | Usuario para autenticar /eve/v1/session en producción (httpBasic) |

## Configuration

- **Start command:** `pnpm run start`
- **Healthcheck:** `/eve/v1/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, JavaScript

[View on Railway →](https://railway.com/deploy/vercel-eve-agent-starter)
