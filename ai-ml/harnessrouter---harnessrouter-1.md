# Deploy harnessrouter on Railway

Unified interface for agent harnesses.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/harnessrouter-1)

## About

HarnessRouter is a self-hosted AI agent workspace that unifies a browser console, gateway, and runner in one Docker image. It supports multiple agent harnesses, streaming sessions, files, workspaces, and provider integrations while keeping credentials and durable state under your Railway project. A persistent volume preserves the local SQLite data and installed tools.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/z1hHX4)

Railway runs the published Docker Hub image as one HTTP service. The console is exposed publicly on port 3000, while the gateway and runner remain loopback-only inside the container. A Railway volume mounted at `/data` preserves application state across redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `harnessrouter/harnessrouter:0.20.1` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `HR_DATA_DIR` | /data |
| `HR_AUTH_USER` | (secret) |
| `HR_AUTH_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/harnessrouter-1)
