# Deploy Remotion on Railway

Deploy and Host Remotion with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/remotion)

## About

Remotion makes it possible to generate videos from code by combining React with a video renderer. Instead of a timeline UI, you build components and animations and render them to video via CLI or server.

Hosting Remotion requires a Node.js environment with sufficient CPU and memory resources for video rendering. The platform needs FFmpeg support, adequate storage for temporary video files, and good network bandwidth for delivery. Railway provides these requirements automatically with their runtime environment, plus scalable infrastructure that can handle multiple concurrent render jobs without manual configuration or container management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| remotion-template | [aeither/remotion-template](https://github.com/aeither/remotion-template) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `REMOTION_SERVE_URL` | - | Use a pre-bundled Remotion serve URL |
| `TELEGRAM_BOT_TOKEN` | (secret) | Send finished renders to a Telegram chat |

**Category:** Other · **Languages:** TypeScript, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/remotion)
