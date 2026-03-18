# Deploy Inngest Single Node (SQLite) on Railway

Platform for running durable, event‑driven workflows and background jobs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/inngest-single-node-sqlite)

## About

Inngest is an event-driven durable execution platform for running reliable background functions, workflows, and AI agents. The single node SQLite configuration bundles all services—Event API, Runner, Executor, Queue, and Dashboard—into a single process with zero external dependencies, using embedded SQLite for persistence and an in-memory Redis implementation for queuing and state.

Hosting Inngest in single node mode is designed for simplicity. The `inngest start` command runs all system services in one process with no external database or queue dependencies. SQLite handles persistence by writing system state to disk, while a bundled in-memory Redis powers the queue and state store with periodic snapshots to disk. The server exposes port 8288 for the Event API, REST/GraphQL APIs, and Dashboard UI, and port 8289 for the Connect WebSocket gateway. Your application SDKs (TypeScript, Python, or Go) communicate with the server using event keys and signing keys for authentication. This setup is ideal for staging, CI/CD, lower-traffic production workloads, or air-gapped environments.

By default, the Inngest server uses SQLite for persistence. This is convenient for zero-dependency deployments, but does not support scaling beyond a single node. You may choose to run your own Postgres database or use a cloud-based Postgres service like AWS RDS, Neon, Supabase, etc.

> **Note on debugging:** You can temporarily create a public HTTP endpoint (e.g. via Railway's public networking) to access the Inngest Dashboard UI for debugging. However, the Dashboard is not authenticated in self-hosted mode, so the public endpoint should be removed once debugging is complete to avoid exposing your event data and function configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| inngest | `inngest/inngest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SDK_URL` | - | App serve URLs to sync (ex. http://localhost:3000/api/inngest) |
| `INNGEST_DEV` | 0 | Use this to force an SDK to be in Dev Mode with INNGEST_DEV=1, or Cloud mode with INNGEST_DEV=0. |
| `INNGEST_EVENT_KEY` | - | Event key that will be used by apps to send events to the server. |
| `INNGEST_SIGNING_KEY` | - | Signing key used to sign and validate data between the server and apps. |

## Configuration

- **Start command:** `/bin/sh -c "inngest start --sqlite-dir /app/data --sdk-url $SDK_URL"`
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/template/inngest-single-node-sqlite)
