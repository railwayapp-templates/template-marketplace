# Deploy strava-mcp-server on Railway

AI agents connect to Strava activities and athlete data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/strava-mcp-server)

## About

strava-mcp-server is an MCP server that connects AI agents to the Strava API. It exposes your activities, stats, and athlete profile as tools — letting agents analyze your runs, rides, and workouts without you manually pulling data from Strava.

Deploying strava-mcp-server requires a server that handles OAuth 2.0 token management and SSE connections. The server authenticates with Strava using OAuth credentials, automatically refreshes tokens, and exposes tools for reading activities, stats, and athlete data. Railway provides persistent hosting with SSL so your MCP clients can connect reliably. No database needed — tokens are managed in memory with automatic refresh.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| strava-mcp-server | [meimakes/strava-mcp-server](https://github.com/meimakes/strava-mcp-server) | Worker |

**Category:** Other · **Languages:** TypeScript, JavaScript

[View on Railway →](https://railway.com/deploy/strava-mcp-server)
