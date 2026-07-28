# Deploy Apify MCP Server on Railway

Apify MCP Server — web scraping & data extraction via MCP on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apify-mcp-server-1)

## About

This service runs on Railway's infrastructure using the NIXPACKS builder. It requires an Apify API token for authentication. Once deployed, Railway assigns a public HTTPS URL that serves as your MCP endpoint.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| apify-mcp-server | [INAPP-Mobile/apify-mcp-server-railway](https://github.com/INAPP-Mobile/apify-mcp-server-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `APIFY_TOKEN` | (secret) | Your Apify API token for authentication. Get it from https://console.apify.com/settings/integrations |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/apify-mcp-server-1)
