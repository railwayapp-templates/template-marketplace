# Deploy AI Chatbot | Open Source ChatGPT-Style App on Next.js on Railway

Next.js AI chat with auth, history and streaming responses

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Kd2GIJ)

## About

A full-featured chat application built on the Next.js AI SDK: streaming responses, conversation history, authentication and multiple model providers. It is a real application rather than a demo, and it is meant to be forked and turned into your own product.

The app builds from a Git repository, with PostgreSQL on a persistent volume for accounts and chat history. Session secrets are generated per deployment and the public URL is wired into the auth configuration automatically.

Two things are left to you: a model provider API key, and — if you want file uploads — a blob storage token. Everything else boots as it is.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ai-chatbot | [IKatsuba/ai-chatbot](https://github.com/IKatsuba/ai-chatbot) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `AUTH_SECRET` | ai-chatbot | (secret) |
| `XAI_API_KEY` | ai-chatbot | (secret) |
| `GROQ_API_KEY` | ai-chatbot | (secret) |
| `AUTH_TRUST_HOST` | ai-chatbot | true |
| `BLOB_READ_WRITE_TOKEN` | ai-chatbot | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/Kd2GIJ)
