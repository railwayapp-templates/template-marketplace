# Deploy sec-af on Railway

AI Powered Security Analyst

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sec-af)

## About

sec-af is an open-source, AI-native security auditor that proves exploitability. It orchestrates ~200-300 focused AI agents — hunters find vulnerabilities, provers try to disprove them — producing verified findings with data flow traces, verdicts, and evidence. One API call, ~$0.18-$0.90 per audit.

sec-af runs as two Railway services: the AgentField control plane and the sec-af agent. The control plane orchestrates execution, manages state, and exposes the REST API and observability UI. The sec-af agent registers with the control plane at startup. Audits are triggered via the control plane API — the agent clones the target repo, runs its multi-phase pipeline (RECON, HUNT, DEDUP, PROVE, REMEDIATION), and streams results back. You only need to provide an OpenRouter API key for LLM access.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `pgvector/pgvector:pg17` | Database |
| control-plane | `agentfield/control-plane:latest` | Web service |
| sec-af | [Agent-Field/sec-af](https://github.com/Agent-Field/sec-af) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `AGENTFIELD_PORT` | control-plane | 8080 |
| `AGENTFIELD_API_KEY` | control-plane | (secret) |
| `AGENTFIELD_STORAGE_MODE` | control-plane | postgres |
| `PORT` | sec-af | 8080 |
| `AGENTFIELD_API_KEY` | sec-af | (secret) |
| `OPENROUTER_API_KEY` | sec-af | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/sec-af)
