# Deploy Dialoqbase on Railway

Create chatbots with ease

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/TXdjD7)

## About

Dialoqbase is an open-source application designed to facilitate the creation of custom chatbots using a personalized knowledge base. It leverages advanced language models to generate accurate responses and utilizes PostgreSQL for efficient vector search operations and knowledge base storage.

Hosting Dialoqbase involves setting up a stack that includes PostgreSQL for database operations, Redis for caching, and Node.js for the backend. The application can be easily deployed using Docker with minimal configuration. Railway provides a one-click deployment option that handles all the infrastructure requirements, making it simple to get started with your custom chatbot solution.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis` | Database |
| Dialoqbase | `n4z3m/dialoqbase:latest` | Web service |
| Database | `ankane/pgvector` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | - | Port to connect to Redis, used by the Data panel. |
| `REDISUSER` | Redis | default | Default user to connect to Redis, needed for the Data panel. |
| `REDIS_URL` | Redis | - | URL to connect to Redis, used for Data panel. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis, needed for the Data panel. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PRIVATE_URL` | Redis | - | URL to connect to Redis over private network. |
| `NO_SEED` | Dialoqbase | false | - |
| `DB_SECRET_KEY` | Dialoqbase | (secret) | - |
| `COHERE_API_KEY` | Dialoqbase | (secret) | goto -> https://dashboard.cohere.ai/api-keys |
| `GOOGLE_API_KEY` | Dialoqbase | (secret) | - |
| `OPENAI_API_KEY` | Dialoqbase | (secret) | Goto -> https://platform.openai.com/account/api-keys |
| `FASTIFY_ADDRESS` | Dialoqbase | 0.0.0.0 | - |
| `ANTHROPIC_API_KEY` | Dialoqbase | (secret) | Goto  -> https://earlyaccess.anthropic.com/ |
| `DB_BOT_SECRET_KEY` | Dialoqbase | (secret) | - |
| `FIREWORKS_API_KEY` | Dialoqbase | (secret) | - |
| `ELEVENLABS_API_KEY` | Dialoqbase | (secret) | - |
| `GITHUB_ACCESS_TOKEN` | Dialoqbase | (secret) | Github personal access token -> https://github.com/settings/tokens/new |
| `HUGGINGFACEHUB_API_KEY` | Dialoqbase | (secret) | goto -> https://huggingface.co/settings/token |
| `POSTGRES_DB` | Database | dialoqbase | - |
| `POSTGRES_USER` | Database | (secret) | - |
| `PGPORT_PRIVATE` | Database | 5432 | - |
| `POSTGRES_PASSWORD` | Database | (secret) | - |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/uploads`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/TXdjD7)
