# Deploy Hermes Agent by Nous Research on Railway

Template for Hermes Agent from Nous Research

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-railway-template)

## About

hermes-railway-template is a Railway-ready deployment for [Hermes Agent](https://github.com/NousResearch/hermes-agent), configured as a worker service with persistent state. It bootstraps Hermes on first run using environment variables, then reuses saved configuration from a mounted volume. The template supports Telegram, Discord, or Slack and works with multiple AI inference providers.

Hosting hermes-railway-template on Railway centers on a worker-first runtime with persistent storage. During setup, you deploy the service as a worker, mount a volume at `/data`, and provide required environment variables for both an inference provider and at least one messaging platform. On first boot, the entrypoint initializes Hermes under `/data/.hermes`, writes runtime configuration, and creates initialization markers. On subsequent boots, state and config are reused automatically, reducing operational overhead. In practice, this gives you a stable bot gateway deployment that can survive restarts and redeploys while keeping credentials and access controls managed through Railway Variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes-railway-template | [lovexbytes/hermes-railway-template](https://github.com/lovexbytes/hermes-railway-template) (branch: main) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OPENROUTER_API_KEY` | (secret) |
| `TELEGRAM_BOT_TOKEN` | (secret) |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/hermes-railway-template)
