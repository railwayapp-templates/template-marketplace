# Deploy openclaw-railway on Railway

Deploy and Host openclaw-railway with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/openclaw-railway-1)

## About

openclaw-railway is a Docker-based Railway template that deploys OpenClaw as an internal-only service. It builds and runs via Docker, keeps the service unexposed to the public internet, and ensures the agent workspace is created and configured correctly on startup.

Railway builds the included Docker image and runs it as a private service (no public ingress by default). On startup, the container verifies and prepares the agent workspace (required folders, paths, and permissions) so the environment is immediately usable. You typically only need to set the required environment variables and (if you want persistence) attach a volume so the agent workspace survives restarts and redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw-railway | [biering/openclaw-railway](https://github.com/biering/openclaw-railway) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OPENAI_API_KEY` | (secret) |
| `ANTHROPIC_API_KEY` | (secret) |
| `OPENROUTER_API_KEY` | (secret) |
| `TELEGRAM_BOT_TOKEN` | (secret) |

## Configuration

- **Volume:** `/data`

**Category:** Other · **Languages:** TypeScript, Dockerfile, Shell

[View on Railway →](https://railway.com/template/openclaw-railway-1)
