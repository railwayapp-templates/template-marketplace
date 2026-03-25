# Deploy next-ai-draw-io on Railway

AI-powered draw.io diagram generation and editing app built with Next.js

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/next-ai-draw-io)

## About

[Next AI Draw.io](https://github.com/DayuanJiang/next-ai-draw-io) is a Next.js-based AI diagram tool that integrates natural language prompting with draw.io rendering. It can generate and edit diagrams from text, image, PDF, and other inputs, then render directly in an interactive browser canvas.

This Railway template deploys the official upstream container image `ghcr.io/dayuanjiang/next-ai-draw-io:latest` as a single web service. The app listens on port `3000`, and Railway routes your public domain to that port.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| next-ai-draw-io | `ghcr.io/dayuanjiang/next-ai-draw-io:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `AI_MODEL` | gpt-4o |
| `AI_PROVIDER` | openai |
| `TEMPERATURE` | 0 |
| `OPENAI_API_KEY` | (secret) |
| `ENABLE_PDF_INPUT` | true |
| `NEXT_PUBLIC_SELFHOSTED` | true |
| `NEXT_PUBLIC_DRAWIO_BASE_URL` | https://embed.diagrams.net |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/next-ai-draw-io)
