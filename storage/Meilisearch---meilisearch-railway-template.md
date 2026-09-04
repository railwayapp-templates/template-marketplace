# Deploy Meilisearch on Railway

A fast search engine with a modern admin UI for easy management.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/meilisearch-railway-template)

## About

Meilisearch is a fast, open-source search engine designed for modern applications. It provides typo-tolerant full-text search, filtering, faceting, customizable ranking, and powerful search APIs with a developer-friendly experience.

This Railway template includes **Meilisearch with a web-based administration UI**, making it easy to manage indexes, documents, settings, and search configuration directly from your browser.

This template deploys a complete self-hosted Meilisearch environment on Railway using the official Meilisearch Docker image together with Meilisearch UI.

Meilisearch runs as the primary search engine and stores indexes and application data on a persistent Railway Volume. Meilisearch UI provides a browser-based dashboard for managing the deployed instance.

The stack is lightweight and self-contained. It does not require PostgreSQL, Redis, or any external database because Meilisearch manages its own indexes and persistent data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| meilisearch-ui | `riccoxie/meilisearch-ui:latest` | Web service |
| meilisearch | `getmeili/meilisearch:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SINGLETON_HOST` | meilisearch-ui | - | Meilisearch public endpoint used by the browser |
| `SINGLETON_MODE` | meilisearch-ui | true | Automatically connect the UI to a single Meilisearch instance |
| `SINGLETON_API_KEY` | meilisearch-ui | (secret) | API key used by the UI to manage Meilisearch |
| `PORT` | meilisearch | 7700 | Port |
| `MEILI_ENV` | meilisearch | production | Run Meilisearch in production mode |
| `MEILI_MASTER_KEY` | meilisearch | - | Master key used to secure the Meilisearch instance |
| `MEILI_NO_ANALYTICS` | meilisearch | true | Disable anonymous telemetry |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/meili_data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/meilisearch-railway-template)
