# Deploy LeafWiki on Railway

A lightweight, modern, tree-based wiki

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/leafwiki)

## About

**LeafWiki** is a minimal, self-hosted wiki written in Go. It focuses on simplicity, fast performance, and Markdown-based content, making it well-suited for personal knowledge bases, internal documentation, and small team wikis without complex infrastructure.

LeafWiki runs as a single container with no external services required. All wiki content is stored on disk and persisted using a single mounted volume. Configuration is intentionally minimal and handled via environment variables. On Railway, deployment consists of attaching one persistent volume to the service and setting a JWT secret for authentication. Once deployed, LeafWiki is immediately usable through its web interface.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LeafWiki | `ghcr.io/perber/leafwiki:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `LEAFWIKI_HOST` | 0.0.0.0 |
| `LEAFWIKI_PORT` | 8080 |
| `LEAFWIKI_DATA_DI` | ./data |
| `LEAFWIKI_JWT_SECRET` | (secret) |
| `LEAFWIKI_PUBLIC_ACCESS` | false |
| `LEAFWIKI_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/leafwiki)
