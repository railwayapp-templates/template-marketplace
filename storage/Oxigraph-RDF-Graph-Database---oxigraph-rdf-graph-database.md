# Deploy Oxigraph RDF Graph Database on Railway

Persistent RDF storage with SPARQL queries and protected updates.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/oxigraph-rdf-graph-database)

## About

Persistent RDF storage with SPARQL queries and protected updates.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

Persistent RDF storage with SPARQL queries and protected updates.

| Service | Role | Persistent path |
| --- | --- | --- |
| `app` | Private application or dependency | `/data` |
| `oxigraph` | Public owner gateway | `None` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| oxigraph | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| app | `ghcr.io/oxigraph/oxigraph:0.5.11@sha256:7532c1f9aa5f28c0dc6a4243198f7f6144017fab7429bf6c164a89fec9411767` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port for oxigraph; follows the upstream deployment configuration. |
| `OWNER_AUTH` | true | Owner auth for oxigraph; follows the upstream deployment configuration. |
| `OWNER_SCOPE` | all | Owner scope for oxigraph; follows the upstream deployment configuration. |
| `UPSTREAM_HOST` | - | Resolved from the linked service; preserve this reference for the included topology. |
| `UPSTREAM_PORT` | 7878 | Upstream port for oxigraph; follows the upstream deployment configuration. |
| `ACCESS_PASSWORD` | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/usr/local/bin/oxigraph serve --location /data --bind 0.0.0.0:7878`
- **Volume:** `/data`

**Category:** Storage · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/oxigraph-rdf-graph-database)
