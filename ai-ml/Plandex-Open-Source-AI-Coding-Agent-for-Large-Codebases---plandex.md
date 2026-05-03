# Deploy Plandex | Open Source AI Coding Agent for Large Codebases on Railway

Self Host Plandex. AI coding, plan versioning, multi-file edits, & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plandex)

## About

Plandex is an open-source, terminal-based AI coding agent built for large projects and real-world development tasks. It plans multi-step changes across dozens of files, applies them in a sandboxed diff review, and supports version control and rollback for every AI-generated plan.

Deploy Plandex on Railway with a pre-configured PostgreSQL database, persistent volume for plan storage, and an embedded LiteLLM proxy that routes requests to 11+ LLM providers. Self-host Plandex to keep your code and API keys on your own infrastructure while your team collaborates on AI-assisted development.

Plandex is a client-server AI coding agent where the CLI runs on developer machines and connects to a central server. The server manages plans, file context, conversation history, and model routing through an embedded LiteLLM proxy.

- Plans changes across 50+ files with cumulative diff review before applying
- Built-in version control — branch, rewind, and diff any plan state
- Supports Anthropic, OpenAI, Google, xAI, OpenRouter, Ollama, DeepSeek, and more
- Tree-sitter powered project maps for 30+ languages (up to 2M tokens of context)
- Automated debugging for terminal commands and browser applications
- BYO API keys — LLM credentials stay on developer machines, never stored server-side

The template deploys a Go-based API server with an embedded Python LiteLLM proxy subprocess, backed by PostgreSQL for metadata and a persistent volume for plan file storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Plandex Server | `plandexai/plandex-server:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `PORT` | Plandex Server | 8099 | HTTP server listening port |
| `GOENV` | Plandex Server | development | Server mode (development or production) |
| `LOCAL_MODE` | Plandex Server | 1 | Skip email verification (dev mode only) |
| `DATABASE_URL` | Plandex Server | - | PostgreSQL connection string |
| `PLANDEX_BASE_DIR` | Plandex Server | /plandex-server | Plan file storage directory |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/plandex-server`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/plandex)
