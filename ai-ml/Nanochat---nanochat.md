# Deploy Nanochat on Railway

Self-hosted AI chat client. Every frontier model, one interface.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nanochat)

## About

Nanochat is an open-source AI chat client you host yourself. It connects to every frontier model through the nano-gpt API — Claude, GPT, Gemini, and more — from one clean interface. Your team gets a private ChatGPT-style workspace with no per-seat fees, and your conversations stay on your server.

Nanochat runs as a TypeScript app backed by PostgreSQL. Deploy both from this template and you get a web UI your team opens from any browser. It handles image and video generation, web search, deep research, speech-to-text, YouTube transcripts, and MCP tool integration out of the box. You need a nano-gpt.com API key to connect to the models.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| nanochat | [nanogpt-community/nanochat](https://github.com/nanogpt-community/nanochat) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** TypeScript, Svelte, CSS, HTML, Dockerfile, JavaScript, Python, Shell

[View on Railway →](https://railway.com/deploy/nanochat)
