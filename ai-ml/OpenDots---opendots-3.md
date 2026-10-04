# Deploy OpenDots on Railway

Self-host AI coworkers with chat, pages, calls, and Slack

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opendots-3)

## About

OpenDots is a self-hosted workspace for persistent AI coworkers. Define specialist Dots, organize work in Spaces and pages, and continue conversations across web chat, voice calls, Slack, and scheduled tasks. It combines CopilotKit, AG-UI, and an OpenAI-compatible model layer in a focused browser interface for private, customizable agent workflows.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opendots-3)

Railway runs the published Docker image as a single HTTP service with an automatically generated HTTPS domain. The one-service deployment includes the complete browser UI and API; optional browser, Slack, voice, and computer integrations can be configured later through environment variables or companion services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `xiaosong233/opendots-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OWNER_TOKEN` | (secret) |
| `VOICE_API_KEY` | (secret) |
| `OPENAI_API_KEY` | (secret) |
| `PARALLEL_API_KEY` | (secret) |
| `INTELLIGENCE_API_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/opendots-3)
