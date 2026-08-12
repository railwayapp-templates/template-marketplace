# Deploy Ombre-Brain on Railway

Self-hosted emotional memory for AI with Obsidian storage and search.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ombre-brain)

## About

Ombre Brain is a memory and knowledge service designed to persist and retrieve information for AI applications. It provides an HTTP-based MCP transport, semantic embedding generation, memory compression and tagging, and persistent storage for Markdown memories, SQLite vector data, configuration, OAuth registrations, and tunnel data.

Hosting Ombre Brain on Railway involves deploying the `p0luz/ombre-brain:latest` Docker image as a Railway service. The application listens internally on port `8000` and binds to `0.0.0.0` so it can receive Railway network traffic. The service uses the Streamable HTTP MCP transport and requires a persistent Railway Volume mounted at `/app/buckets`. This directory stores memory files, SQLite vector data, configuration, OAuth registrations, and tunnel data. Railway environment variables configure the application port, bind address, transport, persistent directory, configuration path, dashboard password, and API keys used for compression and embeddings. The service runs using Railway's Docker runtime.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ombre-brain | `p0luz/ombre-brain:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | Internal Ombre Brain HTTP application listening port. |
| `OMBRE_PORT` | 8000 | Internal HTTP server port used by the Docker deployment. |
| `OMBRE_BIND_HOST` | 0.0.0.0 | Bind the application to all Railway interfaces. |
| `OMBRE_TRANSPORT` | streamable-http | Enable the HTTP MCP transport. |
| `OMBRE_VAULT_DIR` | /app/buckets | Persistent memory and vault directory. |
| `OMBRE_CONFIG_PATH` | /app/buckets/config.yaml | Persistent Ombre Brain configuration path. |
| `OMBRE_EMBED_API_KEY` | (secret) | API key for semantic embedding generation. |
| `OMBRE_COMPRESS_API_KEY` | (secret) | API key for the memory compression/tagging LLM. |
| `OMBRE_DASHBOARD_PASSWORD` | (secret) | Dashboard login password. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/buckets`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ombre-brain)
