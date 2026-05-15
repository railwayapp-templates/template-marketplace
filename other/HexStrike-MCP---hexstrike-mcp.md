# Deploy HexStrike MCP on Railway

This is the HexStrike MCP.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hexstrike-mcp)

## About

HexStrike MCP is an AI-powered penetration testing platform that exposes 150+ professional security tools through the Model Context Protocol. It enables AI agents like Claude to autonomously execute reconnaissance, vulnerability scanning, exploit development, and security research tasks against authorized targets.

Deploys HexStrike AI v6.0 on a full Kali Linux rolling environment with all security tooling pre-installed. The stack runs two internal services: a Flask API server orchestrating 150+ tools and a supergateway SSE bridge that exposes the MCP interface over HTTP. An nginx reverse proxy sits in front, enforcing Bearer token authentication on all requests. The AUTH_TOKEN is auto-generated on deploy. Clients connect directly via a Railway URL — no local setup required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| HexStrike MCP | [dbx0/hexstrike-railway](https://github.com/dbx0/hexstrike-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `AUTH_TOKEN` | (secret) |
| `HEXSTRIKE_PORT` | 8888 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/hexstrike-mcp)
