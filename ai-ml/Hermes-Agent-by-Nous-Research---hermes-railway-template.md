# Deploy Hermes Agent by Nous Research on Railway

Template for Hermes Agent by Nous Research

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-railway-template)

## About

hermes-railway-template is a Railway-ready deployment for [Hermes Agent](https://github.com/NousResearch/hermes-agent), configured as a worker service with persistent state. It builds Hermes from a pinned upstream tag or commit, bootstraps Hermes on first run using Railway Variables, then reuses saved configuration and state from a mounted volume. The template supports Telegram, Discord, or Slack and works with OpenRouter, OpenAI-compatible providers, or Anthropic.

Hosting hermes-railway-template on Railway centers on a worker-first runtime with persistent storage. During setup, you deploy the service as a worker, mount a volume at `/data`, set `HERMES_GIT_REF` to a pinned Hermes Agent tag or commit, and provide required environment variables for both an inference provider and at least one messaging platform.

On startup, the entrypoint initializes Hermes under `/data/.hermes`, writes runtime environment values from Railway Variables into `${HERMES_HOME}/.env`, creates `${HERMES_HOME}/config.yaml` if missing, and records a first-run marker at `${HERMES_HOME}/.initialized`. On subsequent boots, the persisted Hermes home is reused while runtime variables are refreshed from Railway. The container then starts the Hermes messaging gateway as a Railway worker, giving you a stable bot deployment that can survive restarts and redeploys while keeping credentials and access controls managed through Railway Variables.

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
