# Deploy Scrapling MCP Server + Chromium on Railway

Scrapling web scraping MCP server with Chromium and bearer token auth

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/scrapling-mcp-server-chromium)

## About

Scrapling is an open source (BSD-3-Clause) adaptive web scraping framework for Python. Its built-in MCP server lets AI agents fetch web pages over plain HTTP or a real headless Chromium and receive clean Markdown, text or HTML, trimmed to just the elements a CSS selector matches, which saves tokens.

This template runs the official `ghcr.io/d4vinci/scrapling:0.4.15` image as a remote MCP server on the streamable HTTP transport at `/mcp`. Chromium is already inside the image, so browser tools work with no extra service. A server that fetches arbitrary URLs must never be open to the internet, so authentication is on from the first boot: a 64 character bearer token is generated at deploy and Scrapling refuses to start its HTTP transport without it. The endpoint also only answers for its own domain. There is no database and no volume: the server is stateless.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Scrapling | `ghcr.io/d4vinci/scrapling:0.4.15` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | Port the MCP server listens on (passed as --port). Railway's healthcheck and edge proxy probe $PORT, so keep it equal to the domain target port (8000). |
| `MCP_ENDPOINT_URL` | - | Convenience only, Scrapling does not read it. The streamable HTTP endpoint to paste into your MCP client together with the Authorization header. |
| `SCRAPLING_ALLOWED_HOSTS` | - | Comma-separated host names accepted on /mcp, each passed as --allowed-host (turns on Scrapling's DNS rebinding protection; any other Host header gets 421). Defaults to this service's Railway domain. When you add a custom domain, list it as well, for example your-app.up.railway.app,mcp.example.com. Delete the variable to accept any Host header; the bearer token still applies. |
| `SCRAPLING_MCP_AUTH_TOKEN` | (secret) | Bearer token every MCP client must send as 'Authorization: Bearer <token>'. Generated at deploy. Scrapling refuses to start its HTTP transport without it, so never delete it. Rotate by editing the value; the service redeploys and old clients get 401. |

## Configuration

- **Start command:** `sh -c 'set -f; set -- mcp --http --host 0.0.0.0 --port "$PORT"; IFS=,; for h in $SCRAPLING_ALLOWED_HOSTS; do if [ -n "$h" ]; then set -- "$@" --allowed-host "$h"; fi; done; unset IFS; exec uv run --no-sync scrapling "$@"'`
- **Healthcheck:** `/.well-known/oauth-protected-resource`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/scrapling-mcp-server-chromium)
