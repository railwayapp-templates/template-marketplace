# Deploy cabinet 0.5.0 on Railway

Cabinet from https://github.com/cabinetai/cabinet

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cabinet-050)

## About

cabinet 0.5.0 is a self-hosted, AI-first knowledge base and workspace for getting real work done with AI agents. It brings your files, tasks, conversations, scheduled routines, and agent team together in one private environment, with your knowledge stored as portable files instead of locked inside a proprietary platform.

Deploying cabinet 0.5.0 on Railway gives you an always-on Cabinet workspace accessible from any browser. The template runs the Next.js application, Cabinet daemon, realtime events, terminal connections, and reverse proxy together as one service. A Railway volume keeps your files and agent state safe across deployments, while environment variables configure authentication and AI providers. Set a `KB_PASSWORD`, attach persistent storage at `/app/data`, and provide credentials for the AI provider you want to use. Railway then handles container builds, health checks, networking, restarts, HTTPS, and future deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cabinet | [callmechristian/cabinet](https://github.com/callmechristian/cabinet) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `KB_PASSWORD` | (secret) | Password to login. !!! leaving blank means anyone can access the endpoint |
| `CABINET_DATA_DIR` | - | Recommended: /app/data |
| `OPENROUTER_API_KEY` | (secret) | Your OpenRouter API key. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS, Shell, PowerShell

[View on Railway →](https://railway.com/deploy/cabinet-050)
