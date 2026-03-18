# Deploy Open DeepResearch [by firecrawl] on Railway

AI agent that deeply researches the web, using firecrawl and Reasoning LLM

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/s9kj-n)

## About

Project Overview:
Open Deep Research is an open-source clone of OpenAI’s Deep Research experiment that combines AI reasoning with real-time web data extraction powered by Firecrawl. The project is built on a modern, serverless infrastructure leveraging Next.js with its App Router, React Server Components, and Server Actions to deliver dynamic, high-performance web experiences. It integrates a unified AI SDK to interface with various large language model providers (such as OpenAI, TogetherAI, and Deepseek) for generating text, structured outputs, and tool calls. The infrastructure also includes secure user authentication with NextAuth.js, data persistence through Vercel Postgres, and efficient file storage via Vercel Blob. Configurable environment variables allow seamless customization of the reasoning model and other operational parameters, ensuring the system is both flexible and scalable.

Features:
	•	Firecrawl Integration:
	•	Real-time web data extraction and search capabilities.
	•	Next.js Framework:
	•	Utilizes App Router, React Server Components, and Server Actions for optimized routing and rendering.
	•	AI SDK:
	•	Provides a unified API for text generation, structured outputs, and easy switching between multiple LLM providers.
	•	Modern UI:
	•	Styled with Tailwind CSS and built using accessible components from Radix UI.
	•	Data Persistence:
	•	Uses Vercel Postgres for database storage and Vercel Blob for efficient file storage.
	•	Authentication:
	•	Secure sign-in and session management via NextAuth.js.
	•	Flexible Reasoning Model:
	•	Configurable reasoning tasks enabled through environment variables for advanced research analysis.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| http | `ghcr.io/ikatsuba/serverless-redis:latest` | Database |
| app | [chinpeerapat/open-deep-research](https://github.com/chinpeerapat/open-deep-research) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Redis | `bitnami/redis:7.2.5` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SR_TOKEN` | http | (secret) | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | http | true | - |
| `PORT` | app | 3000 | - |
| `AUTH_SECRET` | app | (secret) | - |
| `FIRECRAWL_URL` | app | https://api.firecrawl.dev | - |
| `FIRECRAWL_API_KEY` | app | (secret) | - |
| `OPENROUTER_API_KEY` | app | (secret) | - |
| `UPSTASH_REDIS_REST_TOKEN` | app | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
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
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/template/s9kj-n)
