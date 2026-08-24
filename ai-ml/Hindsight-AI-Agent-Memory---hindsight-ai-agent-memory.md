# Deploy Hindsight — AI Agent Memory on Railway

Memory for AI agents that learns, recalls, and evolves over time.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hindsight-ai-agent-memory)

## About

Hindsight gives AI agents persistent memory that can be stored, recalled, reasoned over, and improved across sessions. It provides a dedicated memory layer for agents and applications through REST and MCP interfaces, helping AI systems retain useful context instead of starting from zero every time.

This template deploys Hindsight with persistent storage and its built-in database, giving you a compact memory backend without requiring an external PostgreSQL or Redis service.

Hindsight acts as a long-term memory service between your AI agents and model providers.

Agents can send information to Hindsight, organize it into memory banks, and later retrieve relevant memories using semantic, temporal, and entity-aware recall.

Hindsight can be used through its API or MCP interface, making it suitable for coding agents, AI assistants, automation systems, and custom applications that need durable context across conversations and sessions.

This template uses Hindsight's embedded PostgreSQL storage and persists it to a Railway volume so memory banks survive restarts and redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hindsight | `ghcr.io/vectorize-io/hindsight:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HINDSIGHT_API_HOST` | 0.0.0.0 | Listen on all container network interfaces |
| `HINDSIGHT_API_PORT` | 8888 | Hindsight API and MCP server port |
| `HINDSIGHT_API_LLM_MODEL` | gpt-5-nano | Model used by Hindsight for memory operations |
| `HINDSIGHT_API_WORKER_ID` | railway-hindsight | Stable worker identity across Railway restarts |
| `HINDSIGHT_API_LLM_API_KEY` | (secret) | Required: API key for the selected cloud LLM provider |
| `HINDSIGHT_API_LLM_PROVIDER` | openai | LLM provider used by Hindsight memory processing |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/hindsight/.pg0`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/hindsight-ai-agent-memory)
