# Deploy LocalAI on Railway

The free, Open Source alternative to OpenAI, Claude and others.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/localai)

## About

The free, Open Source alternative to OpenAI, Claude and others. Self-hosted and local-first. Drop-in replacement for OpenAI, running on consumer-grade hardware. No GPU required. Runs gguf, transformers, diffusers and many more. Features: Generate Text, MCP, Audio, Video, Images, Voice Cloning, Distributed, P2P and decentralized inference

No configuration required. Simply click to deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| localai | `localai/localai:latest-aio-cpu` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DEBUG` | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/build/models:cached`

**Category:** Other

[View on Railway →](https://railway.com/deploy/localai)
