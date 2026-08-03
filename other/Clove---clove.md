# Deploy Clove on Railway

A Claude.ai reverse proxy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clove)

## About

Clove is an all-in-one Claude reverse proxy tool designed to provide standard API access to Claude.ai. It features dual-mode operation supporting both OAuth authentication (via Claude Code API) and web proxy mode. It offers high compatibility with Claude API clients, a user-friendly web management interface, automatic authentication switching, and built-in quota tracking.

When deploying Clove on Railway, Railway hosts the containerized Clove application service based on its official Docker image. Railway manages the underlying infrastructure, providing seamless container deployment, continuous operation, and automatic HTTPS endpoint provision through HTTP proxy networking.

Clove requires persistent storage mounted to `/app/data` to retain configuration files, API key records, and user session information across deployments or system restarts. Networking is simplified as Railway automatically routes external traffic to the container's exposed internal web port. Clove functions as a lightweight service, allowing easy scaling of memory and CPU resources directly from the Railway dashboard as request volumes grow.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Clove | `mirrorange/clove:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5201 | - |
| `LOCALE` | zh | - |
| `LOG_LEVEL` | INFO | - |
| `DEFAULT_MODEL` | claude-sonnet-4-20250514 | - |
| `ADMIN_API_KEYS` | (secret) | Your passward to login |
| `STREAM_TIMEOUT` | 300 | - |
| `REQUEST_TIMEOUT` | 300 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/clove)
