# Deploy Agentfield Deep Research on Railway

AI powered multi-agent deep research by Agentfield on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agentfield-deep-research)

## About

Agentfield Deep Research is an AI-powered research agent that performs iterative, multi-stream investigations on any topic. It autonomously searches the web, extracts entities and relationships, evaluates source quality, and generates comprehensive research documents with full citations and audit trails.

Deploying Agentfield Deep Research involves running two services: the AgentField control plane (orchestration layer) and the deep research agent node. The control plane manages agent registration, workflow execution, and provides observability. The research agent connects to the control plane on startup and handles research requests asynchronously. Both services communicate over internal networking, with the control plane exposing a public API for submitting research queries and streaming progress via Server-Sent Events.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `pgvector/pgvector:pg17` | Database |
| control-plane | `agentfield/control-plane:latest` | Web service |
| deep-research-agent | [Agent-Field/af-deep-research](https://github.com/Agent-Field/af-deep-research) | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `AGENTFIELD_PORT` | control-plane | 8080 |
| `AGENTFIELD_API_KEY` | control-plane | (secret) |
| `AGENTFIELD_STORAGE_MODE` | control-plane | postgres |
| `JINA_API_KEY` | deep-research-agent | (secret) |
| `SERPER_API_KEY` | deep-research-agent | (secret) |
| `TAVILY_API_KEY` | deep-research-agent | (secret) |
| `FIRECRAWL_API_KEY` | deep-research-agent | (secret) |
| `AGENTFIELD_API_KEY` | deep-research-agent | (secret) |
| `OPENROUTER_API_KEY` | deep-research-agent | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/agentfield-deep-research)
