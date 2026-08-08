# Deploy apap-sample on Railway

Accord Project Agreement Protocol (APAP) & MCP Server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apap-sample)

## About

The [Accord Project Agreement Protocol (APAP)](https://docs.accordproject.org/docs/ref-apap) is an open standard that defines how agreement tools — including AI agents — communicate with a smart contract template server over REST and [MCP (Model Context Protocol)](https://modelcontextprotocol.io). This deployment runs the official reference implementation: a ready-to-use server for template management, document generation, and format conversion.

The APAP Reference Implementation is a Node.js/Express server backed by Postgres. It exposes the full [APAP REST API](https://docs.accordproject.org/docs/ref-apap) for managing contract templates and agreements, and an MCP interface that lets AI assistants and LLM-powered tools interact with agreements directly using natural language. This Railway template provisions the server and a managed Postgres instance, runs schema migrations automatically on each deploy, and exposes the API on a public Railway domain. No additional infrastructure setup is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| apap | [accordproject/apap](https://github.com/accordproject/apap) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `HOST` | apap | 0.0.0.0 |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `cd dist && npm start`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** HTML, TypeScript, JavaScript, SCSS, EJS, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/apap-sample)
