# Deploy mos.ai.c on Railway

Your second brain on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mosaic)

## About

MOS•AI•C (Memory-Organization-Synthesis AI Companion) is an AI-powered knowledge management system that transforms how you organize, search, and interact with your information. Built with Next.js 14, it features intelligent note processing, semantic search, task extraction, and interactive chat capabilities.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/gT34ln?referralCode=YC-2HP)

Hosting MOS•AI•C requires a robust infrastructure stack including a Next.js application server, PostgreSQL database with vector extensions, and integration with OpenAI's API services. This template provides a complete deployment solution with automated database setup, AI processing pipelines, and optional Telegram bot integration. The application automatically initializes its schema, processes content with embeddings, and provides real-time search capabilities across your knowledge base.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgvector | `pgvector/pgvector:pg17` | TCP service |
| mos.ai.c-app | [mumunha/mos.ai.c-app](https://github.com/mumunha/mos.ai.c-app) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | pgvector | railway | Name of the default database |
| `DATABASE_URL` | pgvector | - | Public URL |
| `POSTGRES_USER` | pgvector | (secret) | Name of the initial user |
| `PGHOST_PRIVATE` | pgvector | 5432 | Private port |
| `PGPORT_PRIVATE` | pgvector | 5432 | Private port |
| `POSTGRES_PASSWORD` | pgvector | (secret) | The Postgres password |
| `DATABASE_URL_PRIVATE` | pgvector | - | Private URL |
| `NODE_ENV` | mos.ai.c-app | production | - |
| `JWT_SECRET` | mos.ai.c-app | (secret) | - |
| `admin_email` | mos.ai.c-app | email@provide.com | - |
| `BCRYPT_ROUNDS` | mos.ai.c-app | 10 | - |
| `OPENAI_API_KEY` | mos.ai.c-app | (secret) | - |
| `TELEGRAM_BOT_TOKEN` | mos.ai.c-app | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **TCP Proxies:** 5432
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, JavaScript, PLpgSQL, CSS, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mosaic)
