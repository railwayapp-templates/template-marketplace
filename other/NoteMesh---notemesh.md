# Deploy NoteMesh on Railway

Talk to your Obsidian or git Markdown notes via MCP

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/notemesh)

## About

Deploy a private MCP server to talk to your Obsidian or Markdown git notes.

Deploy a private server to talk to your Obsidian Vault (via Obsidian Sync or git) or your git-based Markdown notes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| notemesh | [changenode/notemesh](https://github.com/changenode/notemesh) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | App server port |
| `ENCRYPTION_KEY` | - | Credential encryption |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/notemesh)
