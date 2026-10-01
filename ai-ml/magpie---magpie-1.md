# Deploy magpie on Railway

Deploy magpie with web UI on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/magpie-1)

## About

magpie is a self-hosted AI gateway and management platform that provides a unified interface for interacting with multiple AI model providers. It supports OpenAI-compatible APIs, provider management, model routing, and a built-in Web UI for configuring and managing AI services. magpie helps developers run their own AI infrastructure while keeping control of their API keys and data.

Hosting magpie on Railway provides a simple way to run your own AI gateway without managing servers or container infrastructure. This template deploys the official magpie Docker image, starts the Web UI/API service, and exposes it through Railway's public networking.

The deployment requires configuring persistent storage for magpie's configuration files and setting an authentication key to protect your publicly accessible instance. Railway volumes ensure that provider settings, profiles, and other application data persist across deployments and restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| magpie | `ghcr.io/yetone/magpie:latest` | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `MAGPIE_WEB_KEY` | Password used to protect access to the magpie Web UI. Set a strong random value to prevent unauthorized access to the management interface. |

## Configuration

- **Start command:** `/magpie web --lan --no-open`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/magpie-1)
