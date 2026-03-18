# Deploy MCP Servers on Railway

MCP gateway — expose web fetch, memory, and reasoning tools to AI clients.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mcp-servers)

## About

A Model Context Protocol (MCP) gateway that bundles multiple MCP servers behind a single HTTP endpoint. It exposes AI tools — web fetching, persistent memory, and sequential thinking — over SSE and Streamable HTTP transports for remote access.

MCP servers typically run locally alongside AI clients, limiting them to a single machine. This template deploys an mcp-proxy gateway that wraps multiple MCP servers and exposes them over HTTP, making them accessible from anywhere. It bundles three servers out of the box: a web fetch server for retrieving URLs, a memory server backed by a persistent knowledge graph on a volume, and a sequential-thinking server for structured chain-of-thought reasoning. The gateway runs on a single port and supports both SSE and Streamable HTTP transports. You can extend it by adding additional MCP servers to the configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mcp-servers | [Sokanon/railway-mcp-servers](https://github.com/Sokanon/railway-mcp-servers) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Gateway HTTP Port |

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mcp-servers)
