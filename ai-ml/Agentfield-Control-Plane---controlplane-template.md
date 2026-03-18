# Deploy Agentfield Control Plane on Railway

Kubernetes-style orchestration for multi-agent AI systems with IAM

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/controlplane-template)

## About

AgentField is a Kubernetes-style control plane for AI agents. It provides production infrastructure for deploying, orchestrating, and observing multi-agent systems with cryptographic identity, workflow tracking, and audit trails—without the complexity of managing Kubernetes.

Hosting AgentField requires a PostgreSQL database for persistent storage and a server process running the Go-based control plane binary. The control plane exposes REST/gRPC APIs for agent registration, workflow execution, and memory management. A built-in web UI provides real-time monitoring of agent status, workflow DAGs, and execution traces. Agents connect via HTTP and communicate through the control plane—never directly—enabling centralized observability and routing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| control-plane | `agentfield/control-plane:latest` | Web service |
| example node | [Agent-Field/agentfield](https://github.com/Agent-Field/agentfield) (root: /examples/ts-node-examples/init-example) | Worker |
| Postgres | `pgvector/pgvector:pg17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `AGENTFIELD_PORT` | control-plane | 8080 |
| `AGENTFIELD_API_KEY` | control-plane | (secret) |
| `AGENTFIELD_STORAGE_MODE` | control-plane | postgres |
| `AGENTFIELD_API_KEY` | example node | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Go, TypeScript, Python, Shell, CSS, JavaScript, Go Template, Makefile, HTML, Dockerfile

[View on Railway →](https://railway.com/template/controlplane-template)
