# Deploy Chroma on Railway

Persistent vector database for RAG and AI memory with protected access.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chroma-db)

## About

Chroma is an open-source embedding and vector database designed for AI applications, Retrieval-Augmented Generation (RAG), semantic search, document retrieval, and agent memory. This template combines persistent Chroma storage with an API-key authentication proxy, providing a simple and protected vector database endpoint for applications and AI workflows.

Hosting Chroma on Railway gives you a persistent vector database without requiring PostgreSQL, Redis, object storage, or other supporting database services.

This template separates the deployment into two services. **Chroma** runs privately inside the Railway network and stores its database on a persistent Railway volume. **CaddyAuthProxy** is the only publicly exposed service and protects access to Chroma using an API key.

Requests arrive through the authentication proxy, are validated, and are then forwarded to Chroma over Railway private networking. This keeps the underlying Chroma service inaccessible directly from the public internet while still providing a simple HTTP endpoint for applications.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chroma | `chromadb/chroma:latest` | Database |
| Auth | [FraglyG/CaddyAuthProxy](https://github.com/FraglyG/CaddyAuthProxy) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ALLOW_RESET` | chroma | FALSE | Prevent remote database reset operations |
| `IS_PERSISTENT` | chroma | TRUE | Enable persistent Chroma database storage |
| `PERSIST_DIRECTORY` | chroma | /chroma/chroma | Persistent Chroma data directory |
| `ANONYMIZED_TELEMETRY` | chroma | FALSE | Disable anonymized telemetry |
| `PORT` | Auth | 80 | Public HTTP port used by the authentication proxy |
| `API_KEY` | Auth | (secret) | API key required to access the protected Chroma API |
| `TARGET_PORT` | Auth | 8000 | Internal HTTP port used by Chroma |
| `TARGET_DOMAIN` | Auth | - | Private Railway hostname of the Chroma service |

## Configuration

- **Volume:** `/chroma/chroma`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/chroma-db)
