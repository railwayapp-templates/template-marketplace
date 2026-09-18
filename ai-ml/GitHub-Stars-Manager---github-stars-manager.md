# Deploy GitHub Stars Manager on Railway

AI semantic search & auto-categorization for your GitHub stars.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/github-stars-manager)

## About

GitHub Stars Manager is an open-source, AI-powered manager for your GitHub stars: semantic search across everything
you've starred, automatic categorization, and release tracking — with a web UI and MCP endpoints. This template
deploys it as a single self-hosted service protected by a generated API secret. It is a community-maintained
template and is not affiliated with the GitHub Stars Manager project.

GitHub Stars Manager is a single Node/Express process that serves its web UI, its REST API and its MCP endpoints,
storing everything in SQLite on disk. It is single-user and protects its API with a Bearer secret — but if that
secret is not configured, it runs with authentication disabled, which on a public URL would let anyone read and
change your data. It also encrypts the tokens you store (your GitHub token and AI provider keys) with a key you
provide.

This template runs GitHub Stars Manager on Railway with a generated API secret (so the API is always protected), a
generated encryption key (so stored tokens are encrypted at rest), the SQLite database persisted on a volume, and
the port and health check wired. It runs the official image unmodified, pinned by digest.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `ghcr.io/amintacccp/github-stars-manager-fullstack:v0.8.1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Port Railway routes traffic and health checks to; the app reads it (keep it 3000). |
| `API_SECRET` | (secret) | Bearer secret for the API, generated. Copy it and paste it in the app when it asks for the backend secret. |
| `ENCRYPTION_KEY` | - | 64-hex-char key that encrypts your stored GitHub/AI tokens, generated. Keep it stable across redeploys. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/github-stars-manager)
