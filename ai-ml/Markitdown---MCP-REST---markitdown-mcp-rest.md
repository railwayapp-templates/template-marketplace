# Deploy Markitdown - MCP + REST on Railway

Deploy and Host markitdown-mcp-rest with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/markitdown-mcp-rest)

## About

MarkItDown MCP + REST is a self-hosted document conversion service built on Microsoft's MarkItDown library. It converts PDF, Word, Excel, PowerPoint, HTML, images, audio, and more into clean Markdown via a REST API or MCP (Model Context Protocol) server -- ready for LLM pipelines, RAG systems, and text analysis workflows.

Hosting markitdown-mcp-rest on Railway gives you a production-ready document-to-Markdown conversion service with zero infrastructure management. The template deploys a Docker container with the FastAPI REST API, which accepts file uploads or URIs and returns structured Markdown. It includes Bearer token authentication (auto-generated on deploy), a health check endpoint for zero-downtime deploys, and built-in support for all major document formats. The same image can also run the MCP server for direct integration with LLM applications like Claude Desktop, Cursor, and other MCP-compatible clients.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| markitdown | [lifeofjer/markitdown](https://github.com/lifeofjer/markitdown) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LLM_MODEL` | - | Your OpenAI compatible LLM Model |
| `LLM_API_KEY` | (secret) | Your OpenAI compatible LLM key |
| `LLM_BASE_URL` | - | Your OpenAI compatible LLM API URL |
| `MARKITDOWN_API_TOKEN` | (secret) | - |
| `MARKITDOWN_ENABLE_PLUGINS` | true | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/markitdown-mcp-rest)
