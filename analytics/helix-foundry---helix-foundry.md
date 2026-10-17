# Deploy helix-foundry on Railway

AI-assisted data workspace for connected ontology and analytics.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/helix-foundry)

## About

Helix Foundry is an AI-assisted data workspace for connecting business sources, discovering a shared ontology, and exploring relationships through an interactive graph and analytics interface. It combines a browser UI, HelixDB graph storage, DuckDB execution, and persistent workspace data so teams can turn fragmented operational data into an understandable, queryable model.

Railway runs the web application and its private HelixDB dependency as Docker image services. The app receives a public HTTPS domain, while HelixDB stays on Railway private networking. Attached volumes preserve application workspaces and graph data across redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| helix | `xiaosong233/helixdb-railway:latest` | Database |
| app | `xiaosong233/helix-foundry-railway:latest` | Web service |

## Configuration

- **Volume:** `/var/lib/helix`
- **Start command:** `sh -c 'node --import tsx services/executor/src/server.ts & exec node --import tsx apps/api/src/server.ts'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/helix-foundry)
