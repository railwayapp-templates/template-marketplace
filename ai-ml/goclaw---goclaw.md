# Deploy goclaw on Railway

Multi-tenant Go AI agent platform with dashboard, memory, and 20+ providers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/goclaw)

## About

GoClaw is a multi-tenant AI agent gateway written in Go. Railway provides managed networking and image-based deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `ghcr.io/nextlevelbuilder/goclaw:v3.3.0` | Web service |
| postgres | `pgvector/pgvector:pg18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | app | 18790 |
| `GOCLAW_HOST` | app | 0.0.0.0 |
| `GOCLAW_PORT` | app | 18790 |
| `GOCLAW_CONFIG` | app | /app/data/config.json |
| `GOCLAW_SKILLS_DIR` | app | /app/data/skills |
| `GOCLAW_GATEWAY_TOKEN` | app | (secret) |
| `POSTGRES_DB` | postgres | goclaw |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/goclaw)
