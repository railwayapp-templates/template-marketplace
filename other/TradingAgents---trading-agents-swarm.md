# Deploy TradingAgents on Railway

Swarm of AI Agents helping to do extension stock analysis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/trading-agents-swarm)

## About

Trading Agents Swarm is an AI-powered stock analysis dashboard that runs a multi-agent LangGraph pipeline — 9 specialized agents covering technical, sentiment, and fundamental research — to deliver BUY / HOLD / SELL decisions with full reasoning. Supports single-model and 4-model consensus mode.

Hosting Trading Agents Swarm requires three services running in a single container: a React + Vite frontend, an Express REST/SSE API server, and a Python FastAPI service that wraps the TradingAgents LangGraph framework. A PostgreSQL database stores all analysis results and agent logs for history and replay. On Railway, the Dockerfile handles the full build, and the database schema is automatically pushed on first startup. All LLM calls are routed through OpenRouter, so only a single API key is needed regardless of which models you select.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| trading-agents-swarm | [derekcheungsa/trading-agents-swarm](https://github.com/derekcheungsa/trading-agents-swarm) | Web service |
| Postgres-a692 | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | trading-agents-swarm | PROD | - |
| `OPENROUTER_API_KEY` | trading-agents-swarm | (secret) | Openrouter API key from openrouter.ai |
| `POSTGRES_DB` | Postgres-a692 | railway | - |
| `POSTGRES_USER` | Postgres-a692 | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres-a692 | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, Python, CSS, HTML, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/trading-agents-swarm)
