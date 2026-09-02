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

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 20128 | Port used by the 9Router web application |
| `BASE_URL` | - | Public URL used by the server-side application |
| `DATA_DIR` | /app/data | Directory used to store persistent application data |
| `HOSTNAME` | 0.0.0.0 | Listen on all network interfaces inside the container |
| `NODE_ENV` | production | Run 9Router in production mode |
| `CLOUD_URL` | https://9router.com | Official 9Router cloud service URL |
| `JWT_SECRET` | (secret) | Secret used to sign and verify JWT authentication tokens |
| `API_KEY_SECRET` | (secret) | Secret used to secure and generate API credentials |
| `MACHINE_ID_SALT` | - | Random salt used when generating machine-specific identifiers |
| `INITIAL_PASSWORD` | (secret) | Optional initial password for the first application setup |
| `NEXT_PUBLIC_BASE_URL` | - | Public application URL exposed to the browser |
| `NEXT_PUBLIC_CLOUD_URL` | https://9router.com | Official 9Router cloud URL exposed to the frontend |

## Configuration

- **Start command:** `sh -c 'while true; do echo "$(date) - Server is active"; sleep 30; done & exec node server.js'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/9router)
