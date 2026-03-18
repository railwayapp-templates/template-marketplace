# Deploy oura-mcp-server on Railway

AI agents connect to Oura Ring sleep, readiness, and HRV.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/oura-mcp-server)

## About

oura-mcp-server is an MCP server that connects AI agents to the Oura Ring API. It exposes your sleep, readiness, activity, and heart rate data as tools — giving agents access to your health metrics for analysis, correlations, and proactive wellness insights.

Deploying oura-mcp-server requires a server that handles OAuth 2.0 authentication with Oura's cloud API and maintains SSE connections for MCP clients. The server manages token refresh automatically and exposes tools for reading sleep scores, readiness data, activity summaries, and heart rate measurements. Railway handles hosting and SSL so agents can query your health data on demand. No database required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| oura-mcp-server | [meimakes/oura-mcp-server](https://github.com/meimakes/oura-mcp-server) | Worker |

**Category:** Other · **Languages:** TypeScript, Procfile

[View on Railway →](https://railway.com/deploy/oura-mcp-server)
