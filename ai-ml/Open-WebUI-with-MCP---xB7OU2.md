# Deploy Open WebUI with MCP on Railway

Open WebUI with MCP-to-OpenAPI proxy server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/xB7OU2)

## About

# OpenWebUI & MCPO Bundle 

## Overview 

This template seamlessly integrates OpenWebUI with MCPO (MCP to OpenAPI proxy server), allowing you to leverage MCP tools within the OpenWebUI platform. By using MCPO, any MCP tool can be exposed as an OpenAPI-compatible HTTP server, making it easily accessible and functional within the OpenWebUI environment. This integration ensures that your MCP tools work seamlessly with OpenWebUI’s extensive features and capabilities.

## Quick Start

1. Deploy the template
2. Fill required variables
3. In Open-WebUI > Admin Panel > Tools
4. Add tool server with URL `http://mcpo:8000/time` for the time tool
5. Repeat for each tools you want to add (defined in your MCP config)
6. Enable it from your models / chats
7. Enjoy !

## Key Features 

### MCPO (MCP to OpenAPI Proxy Server) 

- Instant Exposure: Convert any MCP server command into an OpenAPI-compatible HTTP endpoint with minimal effort.
- Simplicity: No need for custom protocols or glue code. MCPO handles the complexity, allowing your tools to "just work."
- Hassle-Free: Enjoy a streamlined experience with no additional hassle.
     
### OpenWebUI 

- Extensible Platform: OpenWebUI is a highly extensible, feature-rich, and user-friendly self-hosted AI platform.
- Offline Operation: Designed to operate entirely offline, ensuring data privacy and security.
- LLM Support: Compatible with various Language Model runners such as Ollama and OpenAI-compatible APIs.
- Built-in Inference Engine: Features a powerful built-in inference engine for Retrieval-Augmented Generation (RAG), enhancing the AI capabilities.
- Powerful Deployment: Offers a robust solution for AI deployment, making it ideal for both development and production environments.
     

## Benefits 

- Simplified Integration: Easily integrate MCP tools with LLM agents and apps.
- Standard Compatibility: Ensure your tools are accessible via standard RESTful APIs.
- Efficient AI Deployment: Leverage a powerful, self-hosted AI platform for efficient and secure AI operations.
     

## Get Started 

Deploy this template to quickly set up an environment where your MCP tools are readily available as OpenAPI services, enhanced by the capabilities of OpenWebUI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| open-webui | [open-webui/open-webui](https://github.com/open-webui/open-webui) | Web service |
| mcpo | [open-webui/mcpo](https://github.com/open-webui/mcpo) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ENV` | open-webui | prod | - |
| `HOST` | open-webui | 0.0.0.0 | - |
| `PORT` | open-webui | 8080 | - |
| `WEBUI_NAME` | open-webui | My OWU | - |
| `OPENAI_API_KEY` | open-webui | (secret) | - |
| `WEBUI_SECRET_KEY` | open-webui | (secret) | - |
| `ENABLE_OLLAMA_API` | open-webui | false | - |
| `HOST` | mcpo | :: | - |
| `PORT` | mcpo | 8000 | - |
| `MCP_CONFIG_FILE` | mcpo | /_mcp_config.json | - |
| `MCP_CONFIG_CONTENT` | mcpo | { "mcpServers": { "memory": {"command": "npx","args": ["-y", "@modelcontextprotocol/server-memory"]},"time": {"command": "uvx","args": ["mcp-server-time", "--local-timezone=America/New_York"]}}} | Paste here your MCP config (json, without line breaks). The default value includes time and memory server. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`
- **Start command:** `sh -c 'echo $MCP_CONFIG_CONTENT > $MCP_CONFIG_FILE && mcpo --port $PORT --host $HOST --config $MCP_CONFIG_FILE'`

**Category:** AI/ML · **Languages:** JavaScript, Svelte, Python, TypeScript, CSS, Shell, Dockerfile, HTML, Batchfile, Mako, Makefile

[View on Railway →](https://railway.com/template/xB7OU2)
