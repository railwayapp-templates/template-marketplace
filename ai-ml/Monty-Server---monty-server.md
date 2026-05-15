# Deploy Monty Server on Railway

Monty Server is an REST API in front of Pydantic's Monty.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/monty-server)

## About

monty-server is an HTTP API in front of [monty](https://github.com/pydantic/monty),
Pydantic's sandboxed Python interpreter written in Rust. It runs untrusted Python —
typically code an LLM wrote — with no filesystem or network access, hard memory and
time limits, and microsecond startup. Any language that speaks JSON over HTTP can use it.

monty-server is a single Rust binary in a small distroless container. There is no
database, no Redis, and no external services to wire up — sessions live in process
memory. The `/v1/run` endpoint is fully stateless; "code mode" sessions are
process-local, so a single Railway instance is the simplest setup. Set
`MONTY_API_TOKENS` to require a bearer token (this template generates one for you),
tune ceilings like `MONTY_MAX_TIMEOUT_MS` if needed, and point Railway's healthcheck at
`/health`. The container runs as a non-root user and shuts down cleanly on `SIGTERM`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| monty-server | `ghcr.io/joeychilson/monty-server:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `RUST_LOG` | info |
| `MONTY_API_TOKENS` | (secret) |
| `MONTY_LOG_FORMAT` | json |
| `MONTY_MAX_SESSIONS` | 1000 |
| `MONTY_MAX_TIMEOUT_MS` | 30000 |
| `MONTY_RATE_LIMIT_RPM` | 120 |
| `MONTY_MAX_MEMORY_BYTES` | 268435456 |
| `MONTY_SESSION_TTL_SECONDS` | 300 |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/monty-server)
