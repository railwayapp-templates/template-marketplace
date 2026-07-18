# Deploy One API on Railway

Self Hosted LLM API management. Supports OpenAI, Claude, Gemini, and more.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/one-api)

## About

One API is a self-hosted LLM API management and key distribution system. It provides a unified interface to manage API keys from multiple providers such as OpenAI, Claude, Gemini, DeepSeek, and others, with built-in quota control and load balancing.

![One-API](https://opengraph.githubassets.com/4a3fa291732195ae8467266dd5a49902a29d66a2efa92dcdd854c9c7a7e035f3/songquanpeng/one-api)

This template deploys One API using its default SQLite database for simplicity and ease of use. It is designed for quick deployment where users only need to set an admin password via the `INIT_ROOT_PASSWORD` environment variable before clicking deploy. The template is lightweight, requires minimal configuration, and is suitable for both personal use and small to medium production workloads. Railway automatically handles HTTPS, scaling, and monitoring.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| one-api | `ghcr.io/songquanpeng/one-api:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | UTC |
| `SESSION_SECRET` | (secret) |
| `INIT_ROOT_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/one-api)
