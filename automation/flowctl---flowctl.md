# Deploy flowctl on Railway

Self-service workflow platform with approvals, namespaces, and RBAC

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowctl)

## About

[Flowctl](https://github.com/cvhariharan/flowctl) is an open-source self-service workflow execution platform. Define flows, run them on demand or on a schedule, add approvals, and organize work with namespaces and RBAC — shipped as a single binary with a modern UI.

This template deploys Flowctl from the public image `ghcr.io/cvhariharan/flowctl:0.15.0` with managed PostgreSQL on Railway's private network. On start, the container runs migrations and admin bootstrap (`flowctl install`), then serves the UI on port 7000. Flow definitions and execution logs persist on a volume at `/data`. Generate a public domain on the Flowctl service so `ROOT_URL` resolves, then sign in with the admin username and password you set at deploy. Only those two credentials need configuration; database wiring, encryption keys, and runtime settings are prefilled.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flowctl | `ghcr.io/cvhariharan/flowctl:0.15.0` | Web service |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `FLOWCTL_DB__HOST` | flowctl | - | PostgreSQL hostname on Railway private network. |
| `FLOWCTL_DB__PORT` | flowctl | 5432 | PostgreSQL port. |
| `FLOWCTL_DB__USER` | flowctl | (secret) | PostgreSQL username. |
| `FLOWCTL_DB__DBNAME` | flowctl | - | PostgreSQL database name. |
| `FLOWCTL_DB__SSLMODE` | flowctl | disable | Postgres SSL mode. disable is fine over Railway private networking. |
| `FLOWCTL_APP__ADDRESS` | flowctl | 0.0.0.0:7000 | HTTP listen address. Bind IPv4 explicitly for Railway healthchecks. |
| `FLOWCTL_APP__USE_TLS` | flowctl | false | TLS termination is handled by Railway. Keep false. |
| `FLOWCTL_DB__PASSWORD` | flowctl | (secret) | PostgreSQL password. |
| `FLOWCTL_APP__ROOT_URL` | flowctl | - | Public URL of Flowctl as seen in the browser. Generate a Railway domain first. |
| `FLOWCTL_METRICS__PATH` | flowctl | /metrics | Metrics HTTP path. |
| `FLOWCTL_LOGGER__BACKEND` | flowctl | file | Execution log storage backend. |
| `FLOWCTL_METRICS__ENABLED` | flowctl | true | Expose Prometheus metrics. |
| `FLOWCTL_SCHEDULER__WORKERS` | flowctl | 20 | Number of scheduler workers. |
| `FLOWCTL_APP__ADMIN_PASSWORD` | flowctl | (secret) | Initial superadmin password (min 8 chars). Auto-generated; save after deploy. |
| `FLOWCTL_APP__ADMIN_USERNAME` | flowctl | (secret) | Initial superadmin username. Cannot be changed after first install. |
| `FLOWCTL_APP__FLOWS_DIRECTORY` | flowctl | /data/flows | Directory for flow definitions (persisted on the volume). |
| `FLOWCTL_KEYSTORE__KEEPER_URL` | flowctl | - | Local encryption key (base64 of 32 bytes). Do not change after first deploy. |
| `FLOWCTL_LOGGER__LOG_DIRECTORY` | flowctl | /data/logs | Directory for execution logs (persisted on the volume). |
| `FLOWCTL_LOGGER__SCAN_INTERVAL` | flowctl | 1h0m0s | Interval for log retention scans. |
| `FLOWCTL_MESSENGERS__EMAIL__SSL` | flowctl | none | SMTP TLS mode: none, tls, or starttls. |
| `FLOWCTL_MESSENGERS__EMAIL__HOST` | flowctl | localhost | SMTP host. Required by config validation even when email is disabled. |
| `FLOWCTL_MESSENGERS__EMAIL__PORT` | flowctl | 587 | SMTP port. Required by config validation even when email is disabled. |
| `FLOWCTL_APP__MAX_FILE_UPLOAD_SIZE` | flowctl | 104857600 | Max upload size in bytes (default 100MB). |
| `FLOWCTL_MESSENGERS__EMAIL__ENABLED` | flowctl | false | Enable SMTP notifications (optional). |
| `FLOWCTL_SCHEDULER__DEFAULT_TIMEZONE` | flowctl | UTC | Default IANA timezone for new schedules. |
| `FLOWCTL_MESSENGERS__EMAIL__MAX_CONNS` | flowctl | 10 | Max SMTP connections. Required by config validation (min 1). |
| `FLOWCTL_SCHEDULER__CRON_SYNC_INTERVAL` | flowctl | 5m0s | How often schedule changes are synced from the database. |
| `FLOWCTL_MESSENGERS__EMAIL__FROM_ADDRESS` | flowctl | flowctl@example.com | From address. Required by config validation even when email is disabled. |
| `FLOWCTL_SCHEDULER__FLOW_EXECUTION_TIMEOUT` | flowctl | 1h | Max duration for a single flow execution. |
| `POSTGRES_DB` | postgres | flowctl | Default database name created on initialization. |
| `DATABASE_URL` | postgres | - | Internal PostgreSQL connection URL for service-to-service communication. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL username for Flowctl. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Auto-generated PostgreSQL password. |
| `DATABASE_PUBLIC_URL` | postgres | - | Public PostgreSQL connection URL via TCP proxy for external access. |

## Configuration

- **Start command:** `/bin/sh -c "mkdir -p /data/flows /data/logs && /app/flowctl install && exec /app/flowctl start"`
- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/flowctl)
