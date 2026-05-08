# Deploy Flowise on Railway

Flowise with persistent storage for visual AI agents and LLM workflows.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowise-ai)

## About

Flowise is an open-source, low-code platform for building AI agents, chatbots, and LLM workflows visually. It provides a drag-and-drop web UI for connecting language models, tools, memory, retrievers, vector stores, APIs, and custom logic. This template deploys Flowise from the official GitHub repository with public web access, persistent storage, and configurable authentication.

![](https://i.imgur.com/hbOkfpX.png)

Deploying Flowise on Railway from the official GitHub repository builds the application using the Dockerfile included in `FlowiseAI/Flowise`. Railway handles infrastructure, networking, deployments, and scaling, while Flowise provides a browser-based UI for building and managing AI workflows. The Flowise service listens on port `3000`, and Railway can expose the app through a public Railway domain or custom domain. A Railway Volume should be mounted at `/root/.flowise` so Flowise data, API keys, credentials, logs, and configuration persist across restarts and redeployments. By default, this template sets the Flowise username to `admin` and password to `admin123`; users can change both values before or after deployment from Railway Variables.

> Initial deployment may take several minutes because Railway builds Flowise from the official GitHub repository, installs dependencies, and compiles the application before starting the web UI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Flowise AI | [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `LOG_LEVEL` | info |
| `APIKEY_PATH` | /root/.flowise |
| `WORKER_PORT` | 5566 |
| `NODE_OPTIONS` | --max-old-space-size=8192 |
| `FLOWISE_PASSWORD` | (secret) |
| `FLOWISE_USERNAME` | (secret) |
| `SECRETKEY_ENCRYPT` | (secret) |
| `PUPPETEER_SKIP_DOWNLOAD` | true |
| `PUPPETEER_EXECUTABLE_PATH` | /usr/bin/chromium-browser |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.flowise`

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, HTML, Handlebars, CSS, SCSS, Shell, Dockerfile, Batchfile

[View on Railway →](https://railway.com/deploy/flowise-ai)
