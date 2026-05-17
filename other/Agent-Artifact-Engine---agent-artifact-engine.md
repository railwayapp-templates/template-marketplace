# Deploy Agent Artifact Engine on Railway

Self-hostable HTML and safe MDX artifact publishing for AI agents.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agent-artifact-engine)

## About

Agent Artifact Engine is a self-hostable service for publishing immutable HTML and safe MDX artifacts from AI agents. It provides a simple publish API, public and unlisted viewer pages, private share links, sandboxed raw artifact rendering, and persistent file-backed storage without requiring a hosted SaaS platform.

Hosting Agent Artifact Engine on Railway runs the Node/Fastify server with a persistent Railway Volume mounted at `/data`. Published artifacts, metadata, source files, and rendered HTML are stored on that volume so data survives deploys and restarts. Railway provides the public HTTP endpoint, health checks, restart handling, and environment variables. The template only requires a generated `PUBLISH_TOKEN`; optional settings can tune file size limits, script sandboxing, custom domains, and storage paths.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| agent-artifact-engine | [code-atlantic/agent-artifact-engine](https://github.com/code-atlantic/agent-artifact-engine) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PUBLISH_TOKEN` | (secret) |

## Configuration

- **Start command:** `npm start`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/agent-artifact-engine)
