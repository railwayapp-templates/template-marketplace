# Deploy contract-af on Railway

Your Own AI Powered Legal Analyst

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/contract-af)

## About

Contract-AF is an AI-native legal contract risk analyzer that uses a multi-agent pipeline to review contracts like a senior lawyer — finding risks, tracing cross-references, running adversarial verification, and producing negotiation playbooks. One API call per contract.

Deploying contract-af involves running two services: the **AgentField control plane** (orchestrates agent execution) and the **contract-af worker** (runs the 7-phase analysis pipeline). The control plane exposes the async execution API while the worker registers itself and handles contract analysis requests. Both services are containerized and can be deployed as a linked pair on Railway with shared networking and environment variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `pgvector/pgvector:pg17` | Database |
| control-plane | `agentfield/control-plane:latest` | Web service |
| contract-af | [Agent-Field/contract-af](https://github.com/Agent-Field/contract-af) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `AGENTFIELD_PORT` | control-plane | 8080 |
| `AGENTFIELD_API_KEY` | control-plane | (secret) |
| `AGENTFIELD_STORAGE_MODE` | control-plane | postgres |
| `AI_MODEL` | contract-af | openrouter/moonshotai/kimi-k2.5 |
| `HARNESS_MODEL` | contract-af | openrouter/moonshotai/kimi-k2.5 |
| `HARNESS_PROVIDER` | contract-af | opencode |
| `AGENTFIELD_API_KEY` | contract-af | (secret) |
| `OPENROUTER_API_KEY` | contract-af | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/contract-af)
