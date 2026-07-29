# Deploy Trilium Notes on Railway

Personal knowledge base for structured notes, links, and automation.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/trilium-notes)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/trilium-notes)

**Published on the Railway marketplace:** https://railway.com/deploy/trilium-notes

Trilium Notes is a personal knowledge base for building deeply structured note trees. It combines rich text, code notes, links, attributes, full-text search, versioning, protected notes, diagrams, scripting, and an automation API in a self-hosted application designed for large collections of interconnected notes.

Trilium Notes runs as one Docker service with an embedded SQLite database, so it needs no external database or cache. The service listens on port 8080, exposes the supported `/api/health-check` endpoint, and stores its database, configuration, backups, logs, and attachments in `/home/node/trilium-data`. A Railway volume mounted there keeps the complete knowledge base across restarts and redeployments. On first launch, choose whether to create an empty or demo document and immediately set a strong password. Trilium is a single-user application; deploy a separate instance for each independent user. Keep backups before upgrades because database migrations are not backward compatible.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Trilium Notes | `triliumnext/trilium:v0.104.1` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `TRILIUM_DATA_DIR` | /home/node/trilium-data |

## Configuration

- **Healthcheck:** `/api/health-check`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/trilium-data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/trilium-notes)
