# Deploy AgentField Engineering Team on Railway

AI Powered Engineering Team

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/swe-af)

## About

SWE-AF is an autonomous software engineering factory built on AgentField. Give it a goal and a repo, and it spins up a fleet of AI agents that plan, code, review, test, and ship the work as a draft PR. Supports Claude, DeepSeek, MiniMax, Qwen, and other models.

SWE-AF runs as two Docker services: an AgentField control plane for orchestration, and a worker node that does the coding. The control plane accepts build requests over HTTP and dispatches them to workers. Workers clone the target repo, run agents in isolated git worktrees, and push a draft PR when finished. You need at least one AI provider API key and a GitHub token for repo access. Set your keys as environment variables in the Railway dashboard and you're good to go. Workers can be scaled horizontally for concurrent builds.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SWE-AF | [Agent-Field/SWE-AF](https://github.com/Agent-Field/SWE-AF) | Database |
| Postgres | `pgvector/pgvector:pg17` | Database |
| control-plane | `agentfield/control-plane:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | SWE-AF | 8003 |
| `NODE_ID` | SWE-AF | swe-planner |
| `GH_TOKEN` | SWE-AF | (secret) |
| `AGENTFIELD_API_KEY` | SWE-AF | (secret) |
| `CLAUDE_CODE_OAUTH_TOKEN` | SWE-AF | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `AGENTFIELD_PORT` | control-plane | 8080 |
| `AGENTFIELD_API_KEY` | control-plane | (secret) |
| `AGENTFIELD_STORAGE_MODE` | control-plane | postgres |

## Configuration

- **Volume:** `/workspaces`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Dockerfile, Makefile

[View on Railway →](https://railway.com/deploy/swe-af)
