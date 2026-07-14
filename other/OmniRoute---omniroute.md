# Deploy OmniRoute on Railway

[Jul'26] Route OpenAI, Claude, Gemini, and more through one endpoint.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/omniroute)

## About

OmniRoute AI Gateway is a unified AI proxy that lets you route multiple LLM providers through one OpenAI-compatible endpoint. Instead of managing many different provider URLs, API formats, and client configurations, OmniRoute gives you one central gateway for connecting models from different AI providers.

![OmniRoute](https://github.com/diegosouzapw/OmniRoute/raw/main/docs/screenshots/MainOmniRoute.png)

Hosting OmniRoute AI Gateway gives you a self-hosted control layer for your AI traffic. You can connect multiple LLM providers, configure endpoints, generate API keys, and route requests through a single `/v1` compatible endpoint.

This template runs OmniRoute as a single container using the official Docker image. It includes persistent storage so your dashboard settings, providers, endpoints, and routing configuration are retained across redeployments.

After deployment, open the public URL, configure your providers from the dashboard, create an endpoint/API key, and use the generated endpoint in tools such as Claude Code, Cursor, Cline, OpenWebUI, LiteLLM-compatible clients, or any OpenAI-compatible SDK.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OmniRoute | `diegosouzapw/omniroute:latest` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | OmniRoute | 20128 | - |
| `DATA_DIR` | OmniRoute | /app/data | - |
| `HOSTNAME` | OmniRoute | 0.0.0.0 | - |
| `NODE_ENV` | OmniRoute | production | - |
| `CLOUD_URL` | OmniRoute | https://9router.com | - |
| `JWT_SECRET` | OmniRoute | (secret) | - |
| `MODELS_DEV` | OmniRoute | false | - |
| `API_KEY_SECRET` | OmniRoute | (secret) | - |
| `INITIAL_PASSWORD` | OmniRoute | (secret) | - |
| `PRICING_SYNC_ENABLED` | OmniRoute | true | - |
| `NEXT_PUBLIC_CLOUD_URL` | OmniRoute | https://omniroute.online/ | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379

**Category:** Other

[View on Railway →](https://railway.com/deploy/omniroute)
