# Deploy GHL MCP on Railway

Deploy and Host GHL MCP with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/ghl-mcp)

## About

GHL MCP is a Model Context Protocol server that enables AI assistants like Claude and ChatGPT to interact with GoHighLevel's CRM, calendar, and automation features through a standardized tool interface.

Hosting GHL MCP on Railway provides a production-ready bridge between AI platforms (like ElevenLabs Agents, Claude Desktop) and GoHighLevel's API. The server exposes SSE endpoints for real-time communication and REST endpoints for tool execution, enabling AI agents to manage contacts, appointments, conversations, and automations. Railway handles the infrastructure complexity while providing automatic SSL, scaling, and monitoring, making it ideal for agencies running AI-powered booking systems and customer service automation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| GoHighLevel-MCP | [boostfunnel/SSE-GoHighLevel-MCP](https://github.com/boostfunnel/SSE-GoHighLevel-MCP) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `GHL_API_KEY` | (secret) |
| `GHL_BASE_URL` | https://services.leadconnectorhq.com |
| `GHL_LOCATION_ID` | pTqa7xGVUkoNMXEVHXMs |

## Configuration

- **Start command:** `npm start`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, JavaScript, Dockerfile, Procfile

[View on Railway →](https://railway.com/template/ghl-mcp)
