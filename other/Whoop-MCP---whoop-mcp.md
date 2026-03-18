# Deploy Whoop MCP on Railway

MCP server for WHOOP - integrate your fitness and biometric data with Poke

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whoop-mcp)

## About

A MCP server for accessing WHOOP fitness data. Integrate your biometric metrics—recovery, sleep, strain, and healthspan—into Claude Desktop and other MCP-compatible applications.

Deploy this MCP server to make your WHOOP data available to AI applications and MCP clients. The server handles authentication with WHOOP's API and provides five tools for accessing your fitness metrics through the Model Context Protocol.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| whoop-mcp | [JedPattersonn/whoop-mcp](https://github.com/JedPattersonn/whoop-mcp) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `WHOOP_EMAIL` | - | Whop account email |
| `MCP_AUTH_TOKEN` | (secret) | ptional authentication token for MCP requests |
| `WHOOP_PASSWORD` | (secret) | Whoop account password |

**Category:** Other · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/whoop-mcp)
