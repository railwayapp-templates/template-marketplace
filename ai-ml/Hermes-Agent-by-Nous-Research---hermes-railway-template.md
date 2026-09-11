# Deploy Hermes Agent by Nous Research on Railway

Template for Hermes Agent by Nous Research

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-railway-template)

## About

Hermes Agent is the open-source, self-improving AI agent built by Nous Research. This Railway template runs its official Docker image as an always-on worker, connects it to Telegram, Discord, or Slack, and preserves configuration, conversations, skills, schedules, and memory across redeployments on a persistent volume.

Hosting Hermes Agent on Railway gives you a persistent messaging gateway without maintaining a VPS or Docker host. The template mounts a volume at `/data`, keeps Hermes state under `/data/.hermes`, and starts `hermes gateway` automatically. Configure one supported inference provider and at least one messaging platform through Railway Variables, then add your user ID to the platform allowlist. New deployments use the official `nousresearch/hermes-agent` image, with the version controlled by `HERMES_IMAGE_VERSION`. Railway handles deployment, restarts, logs, secrets, and SSH access while Hermes retains its configuration and learned state between container replacements.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes-railway-template | [lovexbytes/hermes-railway-template](https://github.com/lovexbytes/hermes-railway-template) (branch: main) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OPENROUTER_API_KEY` | (secret) |
| `TELEGRAM_BOT_TOKEN` | (secret) |
| `HERMES_IMAGE_VERSION` | latest |
| `AGENT_CACHE_MEMORY_HIGH_MB` | 750 |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile, TypeScript

[View on Railway →](https://railway.com/deploy/hermes-railway-template)
