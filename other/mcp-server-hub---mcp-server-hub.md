# Deploy mcp-server-hub on Railway

One authenticated gateway for 5 MCP servers — one URL, one token

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mcp-server-hub)

## About

mcp-server-hub is a production-ready, **stateless Model Context Protocol (MCP) gateway**. It hosts five MCP servers — web fetch, shared memory, GitHub, Postgres, and utilities — behind a single authenticated Streamable HTTP endpoint, giving AI agents like Claude, Cursor, and custom clients instant tool access with one Bearer token.

Hosting mcp-server-hub means running one always-on HTTP service that multiplexes several MCP servers behind a single URL and auth token. Railway builds it straight from the included multi-stage, non-root Dockerfile, injects a generated `AUTH_TOKEN`, and exposes a public HTTPS domain with a `/health` healthcheck. Because the hub is fully stateless — no sessions, no sticky routing — any replica can serve any request, so you can scale horizontally with zero extra configuration. Optional persistent memory and read-only Postgres access are toggled purely through environment variables. Set `PUBLIC_URL` to your Railway domain so the RFC 9728 auth metadata advertises the correct address to clients.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mcp-server-hub | [KbnCodes/mcp-server-hub](https://github.com/KbnCodes/mcp-server-hub) | Worker |

**Category:** Other · **Languages:** TypeScript, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/mcp-server-hub)
