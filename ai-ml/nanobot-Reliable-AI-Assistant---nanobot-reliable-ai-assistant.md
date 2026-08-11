# Deploy nanobot — Reliable AI Assistant on Railway

Community nanobot 0.2.2: pinned, token-gated, persistent, healthchecked.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nanobot-reliable-ai-assistant)

## About

nanobot is a lightweight personal AI assistant. This independent community template pins nanobot-ai 0.2.2 and its Python base image for repeatable builds; it is not endorsed by the upstream project.

This template supplies a generated Web UI bearer token, a persistent state volume, explicit port 8765, and a healthcheck. The public wrapper is exercised by a container smoke workflow before publication.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nanobot | [hryhory-sinenka/railway-reliability-templates](https://github.com/hryhory-sinenka/railway-reliability-templates) (root: /nanobot) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NANOBOT_ACCESS_TOKEN` | (secret) | Auto-generated bearer token required to access the nanobot Web UI. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.nanobot`

**Category:** AI/ML · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/nanobot-reliable-ai-assistant)
