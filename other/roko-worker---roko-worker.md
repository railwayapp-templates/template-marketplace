# Deploy roko-worker on Railway

Stateless AI agent worker for task execution

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/roko-worker)

## About

Roko Worker is a stateless agent execution container. It receives task requests over HTTP, runs them through the Roko universal loop (compose prompt, dispatch to Claude, validate with gates), and reports results back to the control plane. Scale horizontally by deploying multiple workers.

Workers are stateless with no persistent storage needed. Each worker reads its agent template from the `ROKO_TEMPLATE_JSON` environment variable (base64-encoded JSON) and listens for task submissions. The health endpoint at `GET /health` returns status, template name, and uptime.

### Environment Variables

- `ANTHROPIC_API_KEY` (required) — your Anthropic API key for Claude agent execution
- `ROKO_CONTROL_PLANE_URL` (required) — URL of your Roko control plane instance for result callbacks
- `ROKO_TEMPLATE_JSON` (required) — base64-encoded agent template JSON defining the worker's behavior
- `PORT` (default: 8080) — HTTP listen port
- `RUST_LOG` (default: info) — log verbosity

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wpank/roko-worker:latest | `wpank/roko-worker:latest` | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `RUST_LOG` | info |
| `ANTHROPIC_API_KEY` | (secret) |

**Category:** Other

[View on Railway →](https://railway.com/deploy/roko-worker)
