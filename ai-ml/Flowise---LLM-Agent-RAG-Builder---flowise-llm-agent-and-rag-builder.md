# Deploy Flowise -  LLM Agent & RAG Builder on Railway

Self-hosted drag-and-drop builder for LLM agents and RAG pipelines.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowise-llm-agent-and-rag-builder)

## About

Flowise is an open-source drag-and-drop UI for building LLM-powered agents, RAG pipelines, and AI workflows — no coding required. Connect OpenAI, Anthropic, Ollama, and 100+ integrations visually. A self-hosted alternative to Zapier AI and Stack AI, saving teams $50–200/month.

Flowise runs as a single container with embedded SQLite — no external database required. This Railway template provisions everything automatically with a persistent volume at `/root/.flowise` that stores all flows, credentials, API keys, and uploads across restarts and redeployments. For larger teams, PostgreSQL and Redis can be added. Railway charges ~$5–10/month flat based on compute — no per-run fees, no operation limits, no per-seat pricing.

| Platform | Flowise on Railway | Competitor |
|----------|-------------------|------------|
| Zapier AI | ~$5–10/month, no run limits | $19–69/month + per-task charges |
| Make.com | ~$5–10/month, unlimited ops | $9–29/month with strict caps |
| Stack AI | ~$5–10/month, open-source | $49–199/month, closed SaaS |
| Relevance AI | ~$5–10/month, any LLM | $19–199/month |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flowise-railway-template | [Amritasha/flowise-railway-template](https://github.com/Amritasha/flowise-railway-template) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `FLOWISE_PASSWORD` | (secret) |
| `FLOWISE_USERNAME` | (secret) |

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/flowise-llm-agent-and-rag-builder)
