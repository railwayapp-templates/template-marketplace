# Deploy Sandbox on Railway

All-in-one AI agent sandbox with browser, shell, MCP, and VSCode.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sandbox-1)

## About

Sandbox is an all-in-one environment for AI agents that combines browser automation, shell execution, file operations, MCP services, Jupyter, and VSCode Server in a single Docker container. It provides a shared workspace and unified APIs, allowing agents to browse websites, execute code, manipulate files, use development tools, and interact with MCP services from one environment.

Hosting Sandbox on Railway requires a single Docker-based service using the `ghcr.io/agent-infra/sandbox:latest` image. The application listens on port `8080` and binds to `0.0.0.0`, allowing Railway to route public HTTP traffic to the container.

A Railway Volume is required at `/home/gem/workspace` to persist files created, downloaded, or modified by agents. The shared workspace is accessible to the browser, shell, file operations, Jupyter, and VSCode Server. Sandbox also supports API-key authentication through `SANDBOX_API_KEY`, which protects its API and associated services.

Railway provides the public networking and HTTPS layer, so a separate reverse proxy or TLS configuration is not required. The Sandbox API, browser interface, VSCode Server, and MCP services are exposed through the same port.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Sandbox | `ghcr.io/agent-infra/sandbox:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | UTC |
| `HOST` | 0.0.0.0 |
| `PORT` | 8080 |
| `WORKSPACE` | /home/gem/workspace |
| `SANDBOX_API_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/gem/workspace`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/sandbox-1)
