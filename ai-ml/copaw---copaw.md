# Deploy copaw on Railway

Your Personal AI Assistant; supports multiple chat apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/copaw)

## About

CoPaw is deployed on Railway using the official Docker image `agentscope/copaw:v0.2.0.post1`. Railway provides managed infrastructure with automatic HTTPS, persistent volumes, and public domain routing — making it ideal for self-hosted AI assistants.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| copaw | `agentscope/copaw:v0.2.0.post1` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8088 |
| `COPAW_PORT` | 8088 |
| `COPAW_SECRET_DIR` | (secret) |
| `COPAW_WORKING_DIR` | /app/working |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/working`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/copaw)
