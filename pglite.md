# Deploy PGlite on Railway

PGlite a real Postgres database that runs anywhere JavaScript runs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/pglite)

## About

This section provides comprehensive guidance on deploying and hosting the PGlite HTTP Server, including options for Railway and local environments.

Hosting the PGlite HTTP Server means running a Node.js-based application that embeds a WebAssembly-compiled PostgreSQL database (PGlite) and exposes it through a RESTful HTTP API. This setup allows for seamless integration into web applications or services without requiring a traditional database server. On platforms like Railway, hosting is handled via containerized deployment, where the app runs in a managed environment with automatic scaling, networking, and storage options. Data persistence is achieved through mounted volumes, ensuring your database remains intact across restarts or redeploys. This approach is serverless-friendly, portable, and eliminates the overhead of managing separate database instances.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PGlite | [AnarchistManifesto/PGlite](https://github.com/AnarchistManifesto/PGlite) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |

## Configuration

- **Volume:** `/app/data`

**Category:** Storage · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/template/pglite)
