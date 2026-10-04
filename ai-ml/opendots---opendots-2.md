# Deploy opendots on Railway

Persistent AI coworker workspace with chat, research, pages, and calls

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opendots-2)

## About

OpenDots is a self-hosted AI coworker workspace for persistent specialist agents that move between chat, calls, research, pages, and Slack. It provides a browser UI, local SQLite workspace state, CopilotKit Intelligence integration, model-provider support, scheduled work, and optional browser/computer integrations for building personal agent workflows.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opendots-2)

Railway runs the Docker image as a single HTTP service with a generated HTTPS domain and a persistent volume for the SQLite workspace. The template uses a pre-built Docker Hub image, so deployment does not depend on GitHub source builds or Railpack detection.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `xiaosong233/opendots-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OWNER_TOKEN` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/opendots-2)
