# Deploy zep-memory on Railway

Conversational LLM Application Framework

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/ugib3R)

## About

## ZEP-MEMORY

Zep is a Conversational LLM Application Framework developed by the team at [getzep](https://github.com/getzep).

### Overview

  - Manage users, sessions, chat messages, chat roles, and more, not just texts and embeddings.
  - Build autopilots, agents, Q&A over docs apps, chatbots, and more.

### Learn more

Zep-Memory is an open source project. See more at [GitHub](https://github.com/getzep/zep)

See more about Zep at [getzep.com](https://getzep.com).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgvector | `ankane/pgvector` | Database |
| zep | `ghcr.io/getzep/zep-cloud:latest` | Web service |
| zep-nlp | `ghcr.io/getzep/zep-nlp-server:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | pgvector | 5432 | - |
| `POSTGRES_DB` | pgvector | zep | - |
| `POSTGRES_USER` | pgvector | (secret) | - |
| `POSTGRES_PASSWORD` | pgvector | (secret) | The Postgres password |
| `PORT` | zep | 8000 | - |
| `ZEP_LLM_MODEL` | zep | gpt-3.5-turbo-16k | - |
| `ZEP_AUTH_SECRET` | zep | (secret) | - |
| `ZEP_AUTH_REQUIRED` | zep | true | - |
| `ZEP_OPENAI_API_KEY` | zep | (secret) | your openai key |
| `ZEP_SERVER_WEB_ENABLED` | zep | false | - |
| `ZEP_NLP_SERVER_HOSTPORT` | zep | zep-nlp | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/template/ugib3R)
