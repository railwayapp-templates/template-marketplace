# Deploy MarkItDown on Railway

Microsoft MarkItDown 0.1 document-to-Markdown REST and MCP service.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/markitdown)

## About

MarkItDown is Microsoft's Python tool for converting documents to Markdown for LLMs and text pipelines. It handles PDF, Word, Excel, PowerPoint, HTML, CSV, JSON, XML, EPUB, ZIP archives and images with metadata, keeping headings, lists, tables and links, so documents can be indexed, embedded or passed to a model.

This template runs MarkItDown 0.1.8 as a small web service from a public wrapper repository. It offers a REST endpoint for file uploads or URLs, and a Model Context Protocol endpoint with a `convert_to_markdown` tool for AI agents. Every request except the health check needs a generated bearer token. Only `http:`, `https:` and `data:` URIs are accepted, so the service never reads its own files. It keeps no state and fits the Hobby plan; large PDFs and spreadsheets need more memory. Send documents over HTTPS to the Railway domain, or call it privately from other services in the same project.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| markitdown | [aalfath/markitdown-railway-template](https://github.com/aalfath/markitdown-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `MARKITDOWN_API_TOKEN` | (secret) |
| `MARKITDOWN_MAX_UPLOAD_MB` | 50 |
| `MARKITDOWN_ENABLE_PLUGINS` | false |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/markitdown)
