# Deploy Morphic AI on Railway

Perplexity-like answer engine powered with AI,

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/I7-4De)

## About

Morphic + Redis, 
Required:
- OpenAI API Key, 
- Tavily API key,

This project is designed to make AI-powered search easy and improve user experience. It lets users ask questions and get fast, AI-generated answers. Features like search history, video search, and the ability to pull answers from specific websites make it more useful. You can also use it as a regular search engine.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| morphic | [miurla/morphic](https://github.com/miurla/morphic) | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | morphic | 3000 | - |
| `OPENAI_API_KEY` | morphic | (secret) | - |
| `TAVILY_API_KEY` | morphic | (secret) | - |
| `USE_LOCAL_REDIS` | morphic | true | - |
| `ANTHROPIC_API_KEY` | morphic | (secret) | - |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/bitnami`

**Category:** AI/ML · **Languages:** TypeScript, CSS, JavaScript, Dockerfile

[View on Railway →](https://railway.com/template/I7-4De)
