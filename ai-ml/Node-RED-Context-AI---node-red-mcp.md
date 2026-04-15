# Deploy Node-RED Context AI on Railway

AI workflows in Node-RED using Model Context Protocol (MCP)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/node-red-mcp)

## About

Node-RED MCP servers a visual automation environment that combines Node-RED with the Model Context Protocol (MCP), allowing you to build workflows using AI tools like OpenAI through a graphical interface. This template sets up both the Node-RED interface and the MCP backend required to process AI prompts.

This template deploys two services:
- A Node-RED instance with volume persistence to store flows
- A Node.js-based MCP host acts as a bridge, enabling integration with LLM providers such as OpenAI, Anthropic, Gemini, and OpenRouter through the MCP SDK.

After deployment, you must configure Node-RED to communicate with MCP Host:
1. Go to your deployed mcp-host service in Railway.
2. Copy the public URL (e.g. https://your-mcp-host.up.railway.app)
3. In the Node-RED UI, open the mcp-tools node configuration.
4. Paste the copied URL into the field labeled "URL do MCP Host".

This will allow Node-RED to communicate with the backend and execute AI prompts using the MCP protocol.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| node-red | [moises-paschoalick/node-red-mcp-server](https://github.com/moises-paschoalick/node-red-mcp-server) (root: node-red-docker) | Web service |
| bridge-mcp-server | [moises-paschoalick/node-red-mcp-server](https://github.com/moises-paschoalick/node-red-mcp-server) | Web service |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** JavaScript, HTML, TypeScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/node-red-mcp)
