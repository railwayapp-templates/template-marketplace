# Deploy Inngest | (Just Updated) Durable Workflows & Background Jobs, Data Survives Redeploys on Railway

Self-hosted durable workflows, jobs and cron; SQLite on a volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/inngest-or-just-updated-durable-workflow)

## About

Inngest is an open-source durable execution engine: you write step functions in your own app, and Inngest handles events, retries, scheduling, concurrency, throttling and fan-out. This template runs the self-hosted Inngest server with a persistent SQLite database, so your event history and function runs survive redeploys.

This template runs the official `inngest/inngest` image (pinned by digest) with `inngest start` as a single service. State is stored in SQLite on a volume mounted at `/data`. The dashboard and event API listen on the public domain. A signing key and an event key are generated at deploy as hex secrets (`INNGEST_SIGNING_KEY`, `INNGEST_EVENT_KEY`) and passed to the server. Point your Inngest SDK at the domain with `INNGEST_BASE_URL`, `INNGEST_EVENT_KEY` and `INNGEST_SIGNING_KEY`, then register your app's serve URL from the dashboard.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| inngest | `inngest/inngest:v1.46.0@sha256:9c4a2413bdbfa31a94ff54c32ae2dcc6613dbee84bc76db6cf6644d19e357e3e` | Web service |

## Configuration

- **Start command:** `/bin/sh -c 'echo "[railway] uid=$(id -u) data=$(stat -c %u:%g /data)"; test -w /data && echo "[railway] data writable"; exec inngest start --host 0.0.0.0 --port "$PORT" --sqlite-dir /data --signing-key "$INNGEST_SIGNING_KEY" --event-key "$INNGEST_EVENT_KEY"'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/inngest-or-just-updated-durable-workflow)
