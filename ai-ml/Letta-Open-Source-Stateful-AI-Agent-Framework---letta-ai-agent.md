# Deploy Letta | Open-Source Stateful AI Agent Framework on Railway

Self-host Letta (MemGPT). Build AI agents that remember everything

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/letta-ai-agent)

## About

Deploy Letta on Railway to get a production-ready AI agent platform with persistent memory and stateful reasoning. Letta (formerly MemGPT) is an open-source framework for building AI agents that learn and self-improve over time through advanced long-term memory management.

Self-host Letta on Railway with this template that pre-configures the Letta server, a PostgreSQL database with pgvector for vector embeddings, and password-protected API access. Connect your own LLM provider (OpenAI, Anthropic, or local models) and start building agents immediately.

Letta is a platform for building stateful AI agents — AI systems with advanced memory that can learn and self-improve over time. Unlike stateless LLM API calls, Letta agents maintain persistent memory across conversations, enabling them to remember context, preferences, and learned information indefinitely.

Key features of self-hosted Letta include:

- **Long-term memory** — agents retain and recall information across sessions using vector-based retrieval
- **Multi-provider LLM support** — connect OpenAI, Anthropic, Google Gemini, local Ollama, or vLLM backends
- **REST API and Python SDK** — full programmatic control over agents, memory, and conversations
- **Tool use** — agents can execute custom Python functions and external API calls
- **Built-in memory management** — automatic archival memory, conversation summaries, and context window optimization
- **Multi-agent orchestration** — build systems with multiple specialized agents that collaborate

The template deploys two services: the Letta application server and a PostgreSQL database with pgvector for storing agent memory embeddings.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Letta | `letta/letta:latest` | Web service |
| Letta-DB | `pgvector/pgvector:pg16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Letta | 8283 | HTTP server listening port |
| `SECURE` | Letta | true | Enable API password authentication |
| `LETTA_PG_URI` | Letta | - | PostgreSQL connection with pgvector |
| `LETTA_SERVER_PASSWORD` | Letta | (secret) | API access password |
| `POSTGRES_DB` | Letta-DB | letta | Database name |
| `POSTGRES_USER` | Letta-DB | (secret) | Database username |
| `POSTGRES_PASSWORD` | Letta-DB | (secret) | Database password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/letta-ai-agent)
