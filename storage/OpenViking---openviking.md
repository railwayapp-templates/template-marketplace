# Deploy OpenViking on Railway

Context database for AI agents with persistent semantic storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openviking)

## About

[OpenViking](https://openviking.ai) is an open-source context database for AI agents. It provides file-system-like content organization, semantic retrieval, persistent session memory, and skill management through a unified HTTP API and a built-in Web Studio.

This template runs the official `ghcr.io/volcengine/openviking:latest` image as a single service on port 1933 with automatic HTTPS.

- **Persistent Storage**: A persistent volume is mounted at `/app/.openviking`, ensuring accounts, memory, and vector indices survive redeployments.
- **Ready-to-Use Defaults**: Preconfigured with OpenAI settings. Provide your `OPENAI_API_KEY` at deploy time; the admin key (`OPENVIKING_ROOT_API_KEY`) is generated automatically.
- **Browser-Only Bootstrap**: No CLI required. Open Web Studio, save the root key in `/studio/settings`, and create your first user in `/studio/users`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenViking | `ghcr.io/volcengine/openviking:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 1933 | Server port. Railway's edge proxies HTTPS to this port. |
| `OPENAI_API_KEY` | (secret) | REQUIRED. Your OpenAI API key, used for embeddings and the VLM. |
| `OPENVIKING_WITH_BOT` | 1 | Keep 1 to enable the built-in bot. Set 0 only when you explicitly want to run the API server without it. |
| `OPENVIKING_CONF_CONTENT` | {
  "storage": {
    "workspace": "/app/.openviking/data",
    "vectordb": {
      "name": "context",
      "backend": "local",
      "project": "default"
    },
    "agfs": {
      "backend": "local",
      "timeout": 10
    }
  },
  "server": {
    "host": "0.0.0.0",
    "port": 1933,
    "workers": 1,
    "root_api_key": "${OPENVIKING_ROOT_API_KEY}",
    "cors_origins": [
      "*"
    ]
  },
  "embedding": {
    "dense": {
      "provider": "openai",
      "api_base": "https://api.openai.com/v1",
      "api_key": "${OPENAI_API_KEY}",
      "model": "text-embedding-3-small",
      "dimension": 1536
    }
  },
  "vlm": {
    "provider": "openai",
    "api_base": "https://api.openai.com/v1",
    "api_key": "${OPENAI_API_KEY}",
    "model": "gpt-5.6-terra"
  }
} | Initial server configuration. Used only when ov.conf does not exist; after first startup, edit the volume-backed ov.conf or delete it before redeploying. |
| `OPENVIKING_ROOT_API_KEY` | (secret) | Auto-generated root API key. Paste it into Studio settings to bootstrap accounts and users. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.openviking`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/openviking)
