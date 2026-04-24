# Deploy roko on Railway

Self-building agent orchestration control plane

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/roko)

## About

Roko is an orchestration control plane for AI agents that build themselves. It exposes ~85 REST API routes, WebSocket event streaming, and a learning feedback loop. Deploy this template to get a fully functional Roko instance that reads PRDs, generates plans, dispatches agents, validates with gates, and learns from results.

Roko runs as a single container serving HTTP on the configured PORT (default 3000). It persists learning state, episodes, and plans to `/workspace/.roko`. Attach a volume at that path for durability across redeploys. The health endpoint at `GET /api/health` returns status, version, uptime, active plans/agents/runs, and provider health.

### Environment Variables

- `PORT` (default: 3000) — HTTP listen port (Railway sets this automatically)
- `RUST_LOG` (default: info) — log verbosity (debug, info, warn, error)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wpank/roko:latest | `wpank/roko:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Railway injects this |
| `RUST_LOG` | info | Log level |

## Configuration

- **Volume:** `/workspace/.roko`

**Category:** Other

[View on Railway →](https://railway.com/deploy/roko)
