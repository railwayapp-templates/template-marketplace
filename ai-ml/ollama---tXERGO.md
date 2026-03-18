# Deploy ollama on Railway

ollama container with a demo/testing interface

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tXERGO)

## About

A starter for your next ollama project.

Using the official ollama docker image and includes a user interface built with SvelteKit. Built to be mobile friendly and with minimal hassle.

You can load multiple models and test switch between them quickly to test each one.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ui | [chris-windsor/alpaca](https://github.com/chris-windsor/alpaca) | Web service |
| ollama | `ollama/ollama` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | ui | 6794 | host port of ui |
| `PUBLIC_OLLAMA_HOST` | ui | - | Set to the internal address of the ollama service followed by :11434 |
| `OLLAMA_ORIGINS` | ollama | - | Set to the public URL of the 'ui' service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Svelte, TypeScript, JavaScript, CSS, HTML

[View on Railway →](https://railway.com/deploy/tXERGO)
