# Deploy Agent Gateway on Railway

An open-source agentic proxy for AI agents and MCP servers.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agent-gateway)

## About

Agent Gateway is an open source agentic proxy for AI agents and MCP servers. It provides drop-in security, observability, and governance for agent-to-agent and agent-to-tool communication, supporting leading protocols including Model Context Protocol (MCP) and Agent2Agent (A2A).

Agent Gateway is a Rust-based proxy that runs as a standalone binary. This template deploys it on Railway alongside Caddy as a reverse proxy, which routes MCP traffic and the admin UI through Railway's single public port. Configuration is persisted to a Railway volume so changes made via the built-in admin UI survive redeploys. The template starts with a blank slate — no listeners, routes, or backends are preconfigured.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| agentgateway | [alphasecio/agentgateway](https://github.com/alphasecio/agentgateway) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/agent-gateway)
