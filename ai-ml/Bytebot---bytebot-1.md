# Deploy Bytebot on Railway

Deploy and Host Bytebot(AI desktop agent) with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bytebot-1)

## About

[Bytebot](https://github.com/bytebot-ai/bytebot) is an open-source, self-hosted AI desktop assistant designed to redefine human-computer interaction. It leverages advanced artificial intelligence within a containerized Linux environment to execute intricate digital operations. Essentially acting as a remote operative, Bytebot can navigate interfaces, input text, and manage browsers to complete multi-step workflows in a manner that mirrors human activity.

Explore the comprehensive Bytebot documentation [here](https://docs.bytebot.ai/introduction).

The Bytebot ecosystem functions through the seamless integration of four primary modules:

- **Bytebot Desktop**: A virtualized Ubuntu 22.04 environment using the XFCE4 desktop, equipped with necessary software and a background automation service.
- **AI Agent**: A core NestJS backend that utilizes Large Language Models (LLMs) to strategize and carry out specific commands.
- **Postgres Database**: A dedicated storage layer for maintaining task history, operational logs, and system metadata.
- **Task Interface**: A user-facing Next.js dashboard for initiating, monitoring, and controlling automation workflows.

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

[View on Railway →](https://railway.com/deploy/bytebot-1)
