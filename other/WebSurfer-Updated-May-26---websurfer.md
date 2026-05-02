# Deploy WebSurfer [Updated May '26] on Railway

WebSurfer [May '26] (Open-Source LLM Web Fetching API) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/websurfer)

## About

WebSurfer is an open-source, high-performance API designed to help Large Language Models (LLMs) surf the web. Built in Go, it fetches and processes web content with token-based content limiting, Redis caching, and API key authentication — making it easy to give your AI agents reliable, controlled access to live web data. It is a self-hosted alternative to proprietary web scraping APIs and LLM browsing tools.

With Railway, deploying WebSurfer becomes a true one-click experience. No server provisioning, no Redis setup, no reverse proxy configuration — just deploy and start fetching.

Self hosting WebSurfer traditionally means:

* Provisioning a server with Go installed or Docker configured
* Setting up and managing a Redis instance for caching
* Configuring API keys, ports, and environment variables
* Managing networking between WebSurfer and Redis
* Handling service restarts, updates, and uptime monitoring

WebSurfer on Railway removes this burden completely. Railway automatically provisions both the WebSurfer container and a Redis instance, wires them together with internal networking, manages environment variables, and keeps both services running.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| joeychilson/websurfer:latest | `ghcr.io/joeychilson/websurfer:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `API_KEY` | joeychilson/websurfer:latest | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/websurfer)
