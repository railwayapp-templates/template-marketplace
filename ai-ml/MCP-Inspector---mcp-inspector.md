# Deploy MCP Inspector on Railway

Inspect and debug MCP (Model Context Protocol) servers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/mcp-inspector)

## About

**MCP Inspector** is a lightweight web-based inspection and debugging tool for **Model Context Protocol (MCP)** servers. It lets developers explore MCP endpoints, inspect requests and responses, and validate tool, resource, and prompt definitions in real time through a clean browser UI.

![](https://mintcdn.com/mcpuse/-dX3pYiRHSZpYTFG/images/inspector/connect-form.png?w=560&fit=max&auto=format&n=-dX3pYiRHSZpYTFG&q=85&s=8439dc79ace52e9bd2ee19edfa2356b3)
![](https://mintcdn.com/mcpuse/-dX3pYiRHSZpYTFG/images/inspector/server-detail.png?w=560&fit=max&auto=format&n=-dX3pYiRHSZpYTFG&q=85&s=5080f225c9245522fd524c4926ae8781)

Deploying MCP Inspector on Railway uses the official `mcpuse/inspector` Docker image to run a self-hosted inspection UI in a containerized environment. Railway handles networking, orchestration, and scaling, so you can focus on debugging and validating your MCP servers instead of managing infrastructure.

Once deployed, MCP Inspector exposes a web interface where you can connect to MCP-compatible servers, inspect protocol interactions, verify schemas, and troubleshoot integration issues. This setup is ideal for local development parity, shared team environments, or staging setups where you want a persistent, always-on MCP debugging tool without complex setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MCP Inspector | `mcpuse/inspector` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/template/mcp-inspector)
