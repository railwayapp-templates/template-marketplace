# Deploy Executor MCP Gateway on Railway

An open-source MCP gateway for AI agents.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/executor-mcp-gateway)

## About

Executor is an open-source MCP gateway that lets any MCP-compatible agent — Claude Code, Cursor, Codex, and others — connect to every tool you use through a single endpoint. Instead of exposing hundreds of individual tools to an agent's context, Executor collapses them into one `execute` tool that searches and calls your configured integrations on demand.

Executor's self-hosted image runs the entire server — the typed API, MCP server, authentication, sandboxed code execution, and web console — as a single container over a libSQL (SQLite) file, with no external database or separate services required. This Railway template deploys the official image with a persistent volume for the SQLite database and generated encryption keys. The first person to visit the deployed URL and create an account becomes the instance owner; everyone else joins through single-use invite links minted from the Admin page, since open signup is closed by default.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| executor | `ghcr.io/rhyssullivan/executor-selfhost:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4788 | HTTP port the server listens on. |
| `BETTER_AUTH_SECRET` | (secret) | Session secret. Rotating it signs everyone out. |
| `EXECUTOR_SECRET_KEY` | (secret) | Master key encrypting stored secrets. Set it to manage it yourself. |
| `EXECUTOR_WEB_BASE_URL` | - | Public URL browsers use. Required behind a domain or TLS |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/executor-mcp-gateway)
