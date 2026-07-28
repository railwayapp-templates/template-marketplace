# Deploy MCP Server Starter | Remote Streamable HTTP with OAuth 2.1 & Postgres on Railway

Host your own remote MCP server — Streamable HTTP, OAuth 2.1, Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mcp-server-starter-or-remote-streamable-)

## About

The Model Context Protocol is how an AI assistant reaches tools and data it does not ship with. A **remote** MCP server is one your assistant connects to over the network instead of launching on your laptop — which means it needs a public address, a transport that survives more than one replica, and an authorization story, because anything reachable on the internet will be reached.

This template deploys a working one: a Streamable HTTP MCP endpoint, an OAuth 2.1 authorization server in front of it, and Postgres behind it. Add the URL to your client, type the generated password once, and the client is connected.

Most MCP templates wrap somebody else's SaaS — a server for one fitness tracker, one ad platform, one CRM. Useful if you want that product. Useless if what you want is to expose your own database, your internal API, or your document store.

The tools are the easy part. What takes the time is everything around them:

- **The transport.** Streamable HTTP replaced SSE as the recommended transport. Keeping sessions in memory forces sticky routing, so this server runs stateless: any replica can answer any request.
- **The authorization.** The spec puts OAuth 2.1 in the required path — PKCE, dynamic client registration (RFC 7591), protected-resource metadata (RFC 9728), resource indicators (RFC 8707). Clients like Claude and ChatGPT will not connect without it, and they register themselves, so there is no API key for you to copy around.
- **The storage.** Codes and tokens have to outlive the process that issued them. Hold them in memory and every deploy signs everyone out, while a second replica rejects tokens the first one issued.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MCP Server | [ak40u/mcp-server-railway-starter](https://github.com/ak40u/mcp-server-railway-starter) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | MCP Server | 8080 |
| `MCP_SERVER_NAME` | MCP Server | mcp-starter |
| `MCP_ADMIN_PASSWORD` | MCP Server | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/mcp-server-starter-or-remote-streamable-)
