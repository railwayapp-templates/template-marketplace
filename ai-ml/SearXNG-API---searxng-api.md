# Deploy SearXNG API on Railway

A pre-configured SearXNG optimized for private and LLM tool use.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/searxng-api)

## About

SearXNG is a privacy-respecting metasearch engine that aggregates results from multiple sources. This template configures SearXNG as a JSON API with GET requests enabled, making it easy to integrate with backends, scripts, and LLM agents that need web search capabilities.

Running SearXNG typically requires configuring YAML settings, managing search engine lists, and tuning timeouts. This template handles all of that. It ships with a curated engine list (DuckDuckGo, Brave, GitHub, arXiv, StackOverflow, and more), extended timeouts for reliability, and settings tuned for API access rather than browser use. Rate limiting is disabled since you control who has access. Add Redis for caching and you're done.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| searxng | `ghcr.io/joeychilson/railway-searxng:1.1` | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SEARXNG_SECRET` | (secret) |

## Configuration

- **Healthcheck:** `/healthz`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/searxng-api)
