# Deploy Contxtyfy Command Centre on Railway

Contxtyfy is a personal AI Command Centre and Context Knowledge Graph

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/contxtyfy-command-centre)

## About

Contxtyfy is a personal AI chief-of-staff: a GTD command centre and knowledge
graph run by six supervised agents that capture from your Gmail, Calendar,
Drive, Slack and more (via Composio OAuth), clarify tasks into an append-only
GTD store, build a living graph of your people, projects and commitments, and
brief you before every meeting — with every outbound action gated behind your
explicit approval.

Deploying Contxtyfy gives you a private, single-tenant instance: a FastAPI
Command Centre plus a Neo4j graph database on Railway's private network, with
all state on a persistent volume. After one-click deploy you finish setup in
the browser: set your password, register your Google accounts, pick a model
backend (OpenRouter, OpenAI, Ollama cloud, or any OpenAI-compatible endpoint —
you bring the key), and connect your apps through Composio's OAuth flow. Daily
agent cycles then run on your schedule, in your timezone, entirely inside your
deployment. No data leaves your instance except the LLM and integration calls
you configured.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Contxtyfy | `ghcr.io/contxtyfy/contxtyfy:stable` | Database |
| Neo4j | `neo4j:5-community` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `DATA_DIR` | Contxtyfy | /data |
| `CC_DEADMAN` | Contxtyfy | 1 |
| `CC_SCHEDULER` | Contxtyfy | 1 |
| `CC_SETUP_TOKEN` | Contxtyfy | (secret) |
| `NEO4J_PASSWORD` | Contxtyfy | (secret) |
| `NEO4J_USERNAME` | Contxtyfy | (secret) |
| `CC_SESSION_SECRET` | Contxtyfy | (secret) |
| `NEO4J_PASSWORD` | Neo4j | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/contxtyfy-command-centre)
