# Deploy 9Router on Railway

Self-hosted AI router for Claude, Gemini, Cursor & OpenAI tools.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/9router)

## About

9Router is a self-hosted AI gateway and LLM router that helps developers connect Claude, Codex, Cursor, OpenAI-compatible tools, and multiple AI providers through a single unified endpoint. It is useful for managing model access, routing requests, switching providers, and simplifying AI development workflows from one central dashboard.

![9Router](https://github.com/decolua/9router/raw/master/images/9router.png?1)

Hosting 9Router on Railway gives you a simple way to run your own AI routing gateway without managing servers manually. With this template, users only need to provide an `INITIAL_PASSWORD` before clicking deploy. Railway handles the deployment process, service hosting, networking, and runtime environment.

Once deployed, 9Router can be used as a centralized AI gateway for developer tools, coding assistants, API clients, and OpenAI-compatible integrations. It helps reduce provider lock-in by allowing users to manage multiple AI models, API keys, and routing behavior from a single self-hosted dashboard.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 9router | `decolua/9router:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 20128 |
| `DATA_DIR` | /app/data |
| `HOSTNAME` | 0.0.0.0 |
| `NODE_ENV` | production |
| `CLOUD_URL` | https://9router.com |
| `JWT_SECRET` | (secret) |
| `API_KEY_SECRET` | (secret) |
| `INITIAL_PASSWORD` | (secret) |
| `NEXT_PUBLIC_CLOUD_URL` | https://9router.com |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/9router)
