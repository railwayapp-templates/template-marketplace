# Deploy cloudsecurity-af on Railway

AI Powered Cloud Security Analysis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cloudsecurity-af)

## About

cloudsecurity-af is an AI-native cloud infrastructure security scanner that performs risk-prioritized attack path analysis on Infrastructure-as-Code. Unlike traditional scanners that report isolated findings, it chains misconfigurations into realistic attack paths (e.g., public S3 → IAM escalation → RDS exfiltration) and proves exploitability — all before deployment.

cloudsecurity-af runs as two Railway services: the AgentField control plane and the cloudsecurity-af agent. The control plane orchestrates execution, manages state, and exposes the REST API and observability UI. The agent registers with the control plane at startup and runs a multi-phase pipeline (RECON → HUNT → CHAIN → PROVE → REMEDIATE) against target repos. Scans are triggered via the control plane API — the agent clones the target repo, deploys seven parallel domain hunters (IAM, network, data, secrets, compute, logging, compliance), chains findings into attack paths, and formally proves exploitability. You only need an OpenRouter API key for LLM access.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `pgvector/pgvector:pg17` | Database |
| cloudsecurity-af | [Agent-Field/cloudsecurity-af](https://github.com/Agent-Field/cloudsecurity-af) | Worker |
| control-plane | `agentfield/control-plane:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `NODE_ID` | cloudsecurity-af | cloudsecurity-af |
| `AGENTFIELD_API_KEY` | cloudsecurity-af | (secret) |
| `OPENROUTER_API_KEY` | cloudsecurity-af | (secret) |
| `AGENTFIELD_PORT` | control-plane | 8080 |
| `AGENTFIELD_API_KEY` | control-plane | (secret) |
| `AGENTFIELD_STORAGE_MODE` | control-plane | postgres |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/cloudsecurity-af)
