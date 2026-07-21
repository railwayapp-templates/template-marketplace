# Deploy Dify.ai on Railway

Dify Is an Open-Source Platform for Building LLM-Powered Applications

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/difyai)

## About

Hosting Dify on Railway provides a managed, scalable environment for your LLM applications without the overhead of traditional infrastructure. Railway handles the container orchestration, internal DNS, and volume management out of the box, allowing you to focus on building AI workflows rather than debugging server configurations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SANDBOX | `langgenius/dify-sandbox` | Database |
| Storage Provision | `minio/mc` | Database |
|  Postgres | `postgres:15-alpine` | Database |
|  Worker | `langgenius/dify-api` | Worker |
| API | `langgenius/dify-api` | Worker |
| WEB | `langgenius/dify-web` | Worker |
| Weaviate | `semitechnologies/weaviate` | Database |
|  Storage | `minio/minio` | Database |
|  Plugin Daemon | `langgenius/dify-plugin-daemon` | Worker |
| Redis | `redis:6-alpine` | Database |
| Database Provision | `postgres:15-alpine` | Database |

## Configuration

- **Volume:** `/dependencies`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/var/lib/weaviate`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/difyai)
