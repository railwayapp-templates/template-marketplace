# Deploy arifOS MCP Server on Railway

Constitutional AI MCP server with 6 tools and 13 governance floors

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/arifos-mcp-server)

## About

arifOS is an open-source Constitutional AI governance framework implementing the Model Context Protocol (MCP). It provides 6 specialized tools (INIT_000, AGI_GENIUS, ASI_ACT, APEX_JUDGE, VAULT_999, Trinity Loop) enforcing 13 thermodynamic floors for safe AI orchestration with Streamable HTTP and SSE transport.

Deploying arifOS MCP Server gives you a production-ready Constitutional AI governance endpoint. The server runs as a FastAPI/Uvicorn ASGI application, exposing MCP tools via Streamable HTTP at `/mcp` and legacy SSE fallback. It includes health monitoring at `/health`, JSON metrics at `/metrics/json`, and automatic enforcement of 13 constitutional floors (Amanah, Truth, Humility, etc.) across all AI operations. The Docker-based deployment uses Python 3.11-slim with uv package manager for fast, reproducible builds.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| arifOS | [ariffazil/arifOS](https://github.com/ariffazil/arifOS) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8000 |
| `ARIFOS_ENV` | production |
| `PYTHONPATH` | /app |
| `ARIFOS_MODE` | production |
| `ARIFOS_CLUSTER` | 3 |
| `ARIFOS_VERSION` | v53.2.0-CODEBASE |
| `ARIFOS_MCP_MODE` | bridge |
| `ARIFOS_LOG_LEVEL` | INFO |

## Configuration

- **Start command:** `codebase-mcp-sse`
- **Healthcheck:** `/health`

**Category:** Other · **Languages:** Python, PowerShell, Shell, HTML, PLpgSQL, Batchfile, CSS, JavaScript, TypeScript, Dockerfile, Nix

[View on Railway →](https://railway.com/template/arifos-mcp-server)
