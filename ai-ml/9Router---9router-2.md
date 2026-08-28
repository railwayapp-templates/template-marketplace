# Deploy 9Router on Railway

Self-hosted AI router for Claude, Gemini, Cursor & OpenAI tools.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/9router-2)

## About

9Router is a self-hosted AI gateway and LLM router that helps developers connect Claude, Codex, Cursor, OpenAI-compatible tools, and multiple AI providers through a single unified endpoint. It is useful for managing model access, routing requests, switching providers, and simplifying AI development workflows from one central dashboard.

![9Router](https://raw.githubusercontent.com/decolua/9router/master/images/9router.png)

Hosting 9Router on Railway gives you a simple way to run your own AI routing gateway without managing servers manually. With this template, users only need to provide an `INITIAL_PASSWORD` before clicking deploy. Railway handles the deployment process, service hosting, networking, and runtime environment.

Once deployed, 9Router can be used as a centralized AI gateway for developer tools, coding assistants, API clients, and OpenAI-compatible integrations. It helps reduce provider lock-in by allowing users to manage multiple AI models, API keys, and routing behavior from a single self-hosted dashboard.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 9router | `decolua/9router:latest` | Database |
| headroom | `ghcr.io/chopratejas/headroom:latest` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 20128 | The service port |
| `API_KEY` | (secret) | The generated API KEY |
| `BASE_URL` | - | The public base url  |
| `DATA_DIR` | app/data | The path of data directory |
| `HOSTNAME` | 0.0.0.0 | The hostname |
| `NODE_ENV` | production | The environment variable to enable optimization |
| `CLOUD_URL` | https://9router.com | The 9router cloud URL |
| `JWT_SECRET` | (secret) | The super secret JWT secret |
| `HEADROOM_URL` | http://headroom:8787 | The headroom url |
| `MACHINE_ID_SALT` | - | The super secret Machine ID Salt |
| `INITIAL_PASSWORD` | (secret) | The generated initial password |
| `NEXT_PUBLIC_BASE_URL` | - | The public URL visible to frontend |
| `NEXT_PUBLIC_CLOUD_URL` | https://9router.com | The 9router cloud URL visible to the frontend |

## Configuration

- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/9router-2)
