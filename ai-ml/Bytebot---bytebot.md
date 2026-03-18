# Deploy Bytebot on Railway

AI desktop agent that automates any computer task through natural language

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bytebot)

## About

Bytebot consists of four integrated components working together:
<img alt="Bytebot Agent Architecture" src="https://mintlify.s3.us-west-1.amazonaws.com/bytebot/images/agent-architecture.png">

- **Bytebot Desktop**: Ubuntu 22.04 with XFCE4, pre-installed apps, and the automation daemon
- **AI Agent**: NestJS service that uses an LLM to plan and execute tasks
- **Postgres Database**: Persistent storage for the agent - task details, status, and metadata
- **Task Interface**: Next.js web app for creating and managing tasks

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bytebot-ui | `ghcr.io/bytebot-ai/bytebot-ui:edge` | Web service |
| bytebot-agent | `ghcr.io/bytebot-ai/bytebot-agent:edge` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| bytebot-desktop | `ghcr.io/bytebot-ai/bytebot-desktop:edge` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | bytebot-ui | production | - |
| `PORT` | bytebot-agent | 9991 | - |
| `GEMINI_API_KEY` | bytebot-agent | (secret) | - |
| `OPENAI_API_KEY` | bytebot-agent | (secret) | - |
| `ANTHROPIC_API_KEY` | bytebot-agent | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | bytebot-desktop | 9990 | - |
| `DISPLAY` | bytebot-desktop | :0 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/bytebot)
