# Deploy Chatty on Railway

Personal AI agent platform — multi-agent, built for small business.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chatty)

## About

Chatty is a free, open-source AI agent platform. Create custom AI agents with their own personality, knowledge, and tools — powered by your own API keys. No SaaS fees, no vendor lock-in. Supports Anthropic, OpenAI, Google Gemini, and Ollama.

Deploying Chatty on Railway takes about 5 minutes. Click the deploy button, set a login password, and Railway handles the rest — building the Docker image, provisioning persistent storage, and giving you a public URL. Once deployed, log in and paste your AI provider API key in the setup wizard. Your data is stored on a persistent volume so it survives redeploys and updates. No external database, Redis, or additional services required — Chatty runs as a single container with SQLite.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chatty | [WWilson1017/chatty](https://github.com/WWilson1017/chatty) | Web service |
| computer | `ghcr.io/wwilson1017/chatty-computer:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `JWT_SECRET` | chatty | (secret) | JWT secret |
| `COMPUTER_URL` | chatty | - | The url to chatty's computer |
| `AUTH_PASSWORD` | chatty | (secret) | Main password for Chatty access.  |
| `COMPUTER_SECRET` | chatty | (secret) | key for chatty's computer |
| `GOOGLE_CLIENT_ID` | chatty | - | Google client id for account access. |
| `GOOGLE_CLIENT_SECRET` | chatty | (secret) | storage for google secret keys.  |
| `QUICKBOOKS_CLIENT_ID` | chatty | - | QB client ID storage |
| `QUICKBOOKS_CLIENT_SECRET` | chatty | (secret) | storage for qb secret |
| `PORT` | computer | 8080 | port for the chatty computer |
| `COMPUTER_SECRET` | computer | (secret) | computer secret |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`
- **Healthcheck:** `/health`
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, TypeScript, HTML, CSS, JavaScript, PHP, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/chatty)
