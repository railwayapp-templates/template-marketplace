# Deploy filament on Railway

Pluggable data replication with checkpointing and integrity events

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/filament)

## About

Filament is an open-source data replication platform for moving data from sources to sinks using full, incremental, or change data capture workflows. It provides durable checkpoints, verified batch writes, scheduling, recovery, an API, and a web interface for managing pipelines and runs.

This template deploys Filament’s server and control plane alongside PostgreSQL and NATS JetStream. PostgreSQL stores pipelines, connections, checkpoints, schedules, and run state, while NATS carries lifecycle events between services. The server exposes the Filament API and web application.

Because Railway does not provide a Kubernetes Jobs API, pipeline runs execute inside the control-plane service. This makes the template convenient for evaluations and straightforward hosted deployments without requiring a Kubernetes cluster.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| control-plane | `ghcr.io/galaxy-io/filament/control-plane` | Database |
| server | `ghcr.io/galaxy-io/filament/server:latest` | Worker |
| nats | `nats:alpine3.22` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres | (secret) | Password to connect to DB |
| `PORT` | control-plane | 8081 | Control plane service port |
| `NATS_URL` | control-plane | - | NATS connection URL |
| `LOG_LEVEL` | control-plane | INFO | Application log level |
| `HEALTH_ADDR` | control-plane | :8081 | Health server listen address |
| `NATS_STREAM` | control-plane | EVENTBUS | JetStream stream name |
| `DISPATCH_MODE` | control-plane | inproc | Run execution mode |
| `NATS_SUBJECTS` | control-plane | ingestion.v1.> | JetStream subject filter |
| `ENCRYPTION_KEY` | control-plane | - | Key used to decrypt stored secrets |
| `PERSISTENCE_DSN` | control-plane | - | PostgreSQL connection string |
| `NATS_TTL_SECONDS` | control-plane | 604800 | Message retention period in seconds |
| `EVENTBUS_PROVIDER` | control-plane | nats | Event bus provider |
| `PERSISTENCE_PROVIDER` | control-plane | postgres | Datastore provider |
| `PORT` | server | 8080 | Server service port |
| `NATS_URL` | server | - | NATS connection URL |
| `LOG_LEVEL` | server | INFO | Application log level |
| `NATS_STREAM` | server | EVENTBUS | JetStream stream name |
| `SERVER_ADDR` | server | :8080 | Server listen address |
| `NATS_SUBJECTS` | server | ingestion.v1.> | JetStream subject filter |
| `ENCRYPTION_KEY` | server | - | Key used to encrypt stored secrets |
| `PERSISTENCE_DSN` | server | - | PostgreSQL connection string |
| `NATS_TTL_SECONDS` | server | 604800 | Message retention period in seconds |
| `EVENTBUS_PROVIDER` | server | nats | Event bus provider |
| `PERSISTENCE_PROVIDER` | server | postgres | Datastore provider |
| `PORT` | nats | 8222 | NATS service port |
| `NATS_URL` | nats | - | NATS connection URL |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/readyz`
- **Volume:** `/var/lib/filament-control-plane`
- **Start command:** `nats-server --jetstream --store_dir /data --server_name filament-nats`
- **Volume:** `/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/filament)
