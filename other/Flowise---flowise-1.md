# Deploy Flowise on Railway

Build AI Agents, Visually

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/flowise-1)

## About

Flowise is an open-source visual builder for LLM applications and AI agents. Using a drag-and-drop interface, you can chain together prompts, models, APIs, vector stores, and tools to create chatbots, RAG pipelines, and multi-agent workflows—without writing boilerplate code. It integrates with OpenAI, Anthropic, Google, Mistral, and any OpenAI-compatible API.

Flowise runs as a Node.js application with a React frontend. By default, it uses SQLite for storing chatflows, credentials, and API keys, requiring no external database. For production deployments, PostgreSQL is supported for better performance at scale.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flowise | `flowiseai/flowise:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Server listen port |
| `APP_URL` | - | Public app URL |
| `LOG_PATH` | /root/.flowise/logs | Logs directory |
| `JWT_ISSUER` | - | JWT Issuer |
| `JWT_AUDIENCE` | - | JWT Audience |
| `STORAGE_TYPE` | s3 | local | s3 | gcs |
| `DATABASE_PATH` | /root/.flowise | Local database path |
| `SECRETKEY_PATH` | (secret) | Secret key path |
| `S3_ENDPOINT_URL` | - | S3 endpoint |
| `S3_STORAGE_REGION` | - | S3 region |
| `S3_FORCE_PATH_STYLE` | true | Required by Railway |
| `JWT_AUTH_TOKEN_SECRET` | (secret) | JWT auth token secret |
| `S3_STORAGE_BUCKET_NAME` | - | S3 bucket name |
| `JWT_REFRESH_TOKEN_SECRET` | (secret) | JWT refresh token secret |
| `S3_STORAGE_ACCESS_KEY_ID` | - | S3 access key |
| `JWT_TOKEN_EXPIRY_IN_MINUTES` | (secret) | JWT expiry in minutes |
| `S3_STORAGE_SECRET_ACCESS_KEY` | (secret) | S3 access secret |
| `JWT_REFRESH_TOKEN_EXPIRY_IN_MINUTES` | (secret) | JWT refresh token expiry in minutes |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.flowise`

**Category:** Other

[View on Railway →](https://railway.com/template/flowise-1)
