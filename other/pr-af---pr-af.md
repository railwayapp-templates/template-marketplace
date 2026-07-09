# Deploy pr-af on Railway

AI Powered Pull Request Reviews

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pr-af)

## About

PR-AF is an open-source, agentic pull-request reviewer built on AgentField. Instead of running a single LLM pass over a diff with a fixed checklist, it builds a custom review strategy for every PR — spawning parallel reviewer agents with runtime-crafted prompts, grounding each finding in real code pulled via AST extraction, adversarially challenging its own conclusions, and posting evidence-backed inline GitHub review comments.

Hosting pr-af means running a Python agent that registers with an AgentField control plane and exposes an HTTP API for triggering reviews. When a review is requested, pr-af clones the target repository, compiles review dimensions specific to that PR, drives an LLM through the opencode harness, verifies each finding against the extracted code, and posts the surviving findings back to GitHub as inline comments. The service runs from a single Dockerfile, listens on port `8004`, exposes a `/health` endpoint, keeps per-review workspaces on a persistent volume, and reads its configuration from environment variables. This template provisions pr-af alongside an AgentField control plane so the two communicate over Railway's private network out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `pgvector/pgvector:pg17` | Database |
| control-plane | `agentfield/control-plane:latest` | Web service |
| pr-af | [Agent-Field/pr-af](https://github.com/Agent-Field/pr-af) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `AGENTFIELD_PORT` | control-plane | 8080 |
| `AGENTFIELD_API_KEY` | control-plane | (secret) |
| `AGENTFIELD_STORAGE_MODE` | control-plane | postgres |
| `PORT` | pr-af | 8004 |
| `NODE_ID` | pr-af | pr-af |
| `GH_TOKEN` | pr-af | (secret) |
| `EXA_API_KEY` | pr-af | (secret) |
| `PR_AF_MODEL` | pr-af | openrouter/z-ai/glm-5.2 |
| `PR_AF_PROVIDER` | pr-af | opencode |
| `PR_AF_NO_BUDGET` | pr-af | true |
| `AGENTFIELD_API_KEY` | pr-af | (secret) |
| `AGENT_CALLBACK_URL` | pr-af | http://pr-af.railway.internal:8004 |
| `OPENROUTER_API_KEY` | pr-af | (secret) |
| `OPENCODE_ENABLE_EXA` | pr-af | 1 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/pr-af)
