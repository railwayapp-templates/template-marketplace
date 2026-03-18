# Deploy SearXNG (w/ Official Image) on Railway

Bring powerful AI search to your apps with a self-hosted metasearch engine

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/searxng-w-official-i)

## About

SearXNG is a privacy-focused metasearch engine that aggregates results from multiple search engines without tracking users. Built for developers, AI agents, and automation workflows, it provides clean, ad-free search results while protecting user privacy and offering extensive customization options.

Hosting SearXNG involves deploying a containerized metasearch engine that acts as a proxy between users and major search engines. The official Docker image includes all necessary dependencies and configurations for immediate deployment. Railway simplifies this process by handling container orchestration, SSL certificates, and scaling automatically. The deployment includes customizable search engine configurations, result filtering, and API endpoints for programmatic access, making it perfect for integration with AI workflows and automation tools.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| searxng-railway | [protemplate/searxng](https://github.com/protemplate/searxng) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `SEARXNG_SECRET_KEY` | (secret) |
| `SEARXNG_UWSGI_THREADS` | 4 |
| `SEARXNG_UWSGI_WORKERS` | 4 |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/etc/searxng`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/searxng-w-official-i)
