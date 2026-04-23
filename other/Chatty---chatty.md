# Deploy Chatty on Railway

Personal AI agent platform — multi-agent, built for small business.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chatty)

## About

Chatty is a free, open-source AI agent platform built for small business owners. Create custom AI agents with their own personality, knowledge, and tools — powered by your own API keys. No SaaS fees, no vendor lock-in. Supports Anthropic, OpenAI, Google Gemini, and Ollama.

Deploying Chatty on Railway takes about 5 minutes. Click the deploy button, set a login password, and Railway handles the rest — building the Docker image, provisioning persistent storage, and giving you a public URL. Once deployed, log in and paste your AI provider API key in the setup wizard. Your data is stored on a persistent volume so it survives redeploys and updates. No external database, Redis, or additional services required — Chatty runs as a single container with SQLite.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chatty | [WWilson1017/chatty](https://github.com/WWilson1017/chatty) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `JWT_SECRET` | (secret) | - |
| `AUTH_PASSWORD` | (secret) | Main password for Chatty access.  |
| `GOOGLE_CLIENT_ID` | 493800201008-r75onc11p6uvk9r5u6pvuocouvbftviu.apps.googleusercontent.com | - |
| `GOOGLE_CLIENT_SECRET` | (secret) | - |
| `QUICKBOOKS_CLIENT_ID` | AB3XbbW3S1vM1ArJ6wE50sT5urcTpJBrvn9Vqthh40WQPJEXd1 | - |
| `QUICKBOOKS_CLIENT_SECRET` | (secret) | - |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`

**Category:** Other · **Languages:** Python, TypeScript, HTML, CSS, JavaScript, PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/chatty)
