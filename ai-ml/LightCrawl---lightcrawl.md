# Deploy LightCrawl on Railway

Playwright-based lightweight scraping API and MCP server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lightcrawl)

## About

LightCrawl is a lightweight, self-hostable Web scraping API and Model Context Protocol (MCP) server that converts any web page into clean Markdown. Optimized for low-resource environments, it acts as a minimal, secure, and cost-effective alternative to Firecrawl, perfect for local development and LLM integration.

Deploying LightCrawl on Railway is incredibly straightforward and takes less than a minute. Since the project includes a fully configured Dockerfile, Railway automatically detects the environment, builds the container, and downloads only the required Chromium browser binary to optimize memory footprint. 

You only need to configure basic environment variables: specifying `PORT`, setting `NODE_ENV` to production, and setting `API_KEY` (which Railway can generate automatically) to secure your HTTP API endpoints. Once deployed, Railway exposes a public URL, enabling immediate use as a standard REST API or integrating it as an MCP server with AI tools like Cursor or Claude Desktop.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LightCrawl | [yosuke1024/LightCrawl](https://github.com/yosuke1024/LightCrawl) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | - |
| `API_KEY` | (secret) | Enter a secure custom API key to protect your scraper endpoint. (e.g. your-secret-token)  |
| `NODE_ENV` | production | - |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/lightcrawl)
