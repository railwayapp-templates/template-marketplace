# Deploy SigNoz | (Just Updated) Datadog Alternative, Admin Locked To You on Railway

Traces, logs and metrics on ClickHouse. Admin seeded, ingest token-locked.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/signoz-or-just-updated-datadog-alternati)

## About

SigNoz is an open-source observability platform — distributed traces, metrics and logs in one
application, stored in ClickHouse. It is the self-hosted alternative to Datadog and New Relic,
speaks OpenTelemetry natively, and needs no proprietary agent.

This template deploys SigNoz as **three services**: ClickHouse (with ClickHouse Keeper embedded in
the same process), the SigNoz application, and an OpenTelemetry collector that accepts your
telemetry over OTLP.

SigNoz is not a single container. It needs a ClickHouse cluster, a coordination service for the
replicated-table DDL it issues, a schema migration step that must complete before the application
starts, and a collector to receive OTLP. Getting those four things to agree is most of the work,
and it is where self-hosted SigNoz deployments usually go wrong.

Three things this template does that are easy to get wrong:

- **Coordination state lives on the volume.** ClickHouse Keeper runs embedded in the ClickHouse
  process and writes its log and snapshots under `/var/lib/clickhouse/coordination`, which is
  inside the mounted volume. If coordination state is lost, ClickHouse brings the replicated
  tables back **read-only** — the container still looks healthy, the UI still loads, and ingest
  silently stops. Verified here by destroying the container and bringing it back on the same
  volume: existing spans were still readable and a fresh OTLP push still landed.
- **The schema migrations run before the collector serves.** The collector service runs
  `migrate bootstrap`, `migrate sync up` and `migrate async up` against ClickHouse, retrying
  until ClickHouse accepts connections, and only then starts receiving. Migrations are
  idempotent, so a redeploy is safe.
- **Both stateful services have volumes.** ClickHouse holds your telemetry, and the SigNoz
  application holds its SQLite database — users, dashboards, saved views and alert rules.
  Without a volume on the second one, every redeploy loses your dashboards even though the
  telemetry survives.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| otel-collector | `signoz/signoz-otel-collector:v0.144.8` | Web service |
| signoz | `signoz/signoz:v0.136.1` | Web service |
| clickhouse | `clickhouse/clickhouse-server:25.12.5` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `INGEST_TOKEN` | otel-collector | (secret) |
| `ADMIN_PASSWORD` | signoz | (secret) |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'echo cmVjZWl2ZXJzOgogIG90bHA6CiAgICBwcm90b2NvbHM6CiAgICAgIGdycGM6CiAgICAgICAgZW5kcG9pbnQ6IDAuMC4wLjA6NDMxNwogICAgICAgIGF1dGg6CiAgICAgICAgICBhdXRoZW50aWNhdG9yOiBiZWFyZXJ0b2tlbmF1dGgKICAgICAgaHR0cDoKICAgICAgICBlbmRwb2ludDogMC4wLjAuMDoke2VudjpQT1JUfQogICAgICAgIGF1dGg6CiAgICAgICAgICBhdXRoZW50aWNhdG9yOiBiZWFyZXJ0b2tlbmF1dGgKcHJvY2Vzc29yczoKICBiYXRjaDoKICAgIHNlbmRfYmF0Y2hfc2l6ZTogMTAwMAogICAgdGltZW91dDogMTBzCmV4dGVuc2lvbnM6CiAgYmVhcmVydG9rZW5hdXRoOgogICAgc2NoZW1lOiBCZWFyZXIKICAgIHRva2VuOiAke2VudjpJTkdFU1RfVE9LRU59CmV4cG9ydGVyczoKICBjbGlja2hvdXNldHJhY2VzOgogICAgZGF0YXNvdXJjZTogJHtlbnY6Q0xJQ0tIT1VTRV9EU059CiAgICB1c2VfbmV3X3NjaGVtYTogdHJ1ZQogIHNpZ25vemNsaWNraG91c2VtZXRyaWNzOgogICAgZHNuOiAke2VudjpDTElDS0hPVVNFX0RTTn0KICBjbGlja2hvdXNlbG9nc2V4cG9ydGVyOgogICAgZHNuOiAke2VudjpDTElDS0hPVVNFX0RTTn0KICAgIHVzZV9uZXdfc2NoZW1hOiB0cnVlCnNlcnZpY2U6CiAgZXh0ZW5zaW9uczogW2JlYXJlcnRva2VuYXV0aF0KICBwaXBlbGluZXM6CiAgICB0cmFjZXM6CiAgICAgIHJlY2VpdmVyczogW290bHBdCiAgICAgIHByb2Nlc3NvcnM6IFtiYXRjaF0KICAgICAgZXhwb3J0ZXJzOiBbY2xpY2tob3VzZXRyYWNlc10KICAgIG1ldHJpY3M6CiAgICAgIHJlY2VpdmVyczogW290bHBdCiAgICAgIHByb2Nlc3NvcnM6IFtiYXRjaF0KICAgICAgZXhwb3J0ZXJzOiBbc2lnbm96Y2xpY2tob3VzZW1ldHJpY3NdCiAgICBsb2dzOgogICAgICByZWNlaXZlcnM6IFtvdGxwXQogICAgICBwcm9jZXNzb3JzOiBbYmF0Y2hdCiAgICAgIGV4cG9ydGVyczogW2NsaWNraG91c2Vsb2dzZXhwb3J0ZXJdCg== | base64 -d > /tmp/otel.yaml; M="--clickhouse-dsn=$CLICKHOUSE_DSN --clickhouse-replication=false"; i=0; while [ $i -lt 60 ]; do /signoz-otel-collector migrate bootstrap $M && break; echo "[railway] waiting for ClickHouse..."; i=$((i+1)); sleep 5; done; /signoz-otel-collector migrate sync up $M || echo "[railway] sync migrations failed"; /signoz-otel-collector migrate async up $M || echo "[railway] async migrations failed"; exec /signoz-otel-collector --config /tmp/otel.yaml'`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'export SIGNOZ_SQLSTORE_SQLITE_PATH=/var/lib/signoz/signoz.db; cd /root && ./signoz server & SP=$!; i=0; while [ $i -lt 150 ]; do wget -q -O /dev/null http://127.0.0.1:8080/api/v1/health && break; i=$((i+1)); sleep 2; done; if wget -q -O /dev/null --header="Content-Type: application/json" --post-data="{\"email\":\"$ADMIN_EMAIL\",\"name\":\"Admin\",\"orgName\":\"SigNoz\",\"password\":\"$ADMIN_PASSWORD\"}" http://127.0.0.1:8080/api/v1/register; then echo "[railway] admin account claimed for $ADMIN_EMAIL"; else echo "[railway] admin not seeded (already set up, or ADMIN_PASSWORD rejected: needs 12+ chars with upper, lower, digit and symbol)"; fi; wait $SP'`
- **Healthcheck:** `/api/v1/health`
- **Volume:** `/var/lib/signoz`
- **Start command:** `/bin/sh -c 'mkdir -p /etc/clickhouse-server/config.d && echo PGNsaWNraG91c2U+CiAgPGxpc3Rlbl9ob3N0PjAuMC4wLjA8L2xpc3Rlbl9ob3N0PgogIDx6b29rZWVwZXI+PG5vZGU+PGhvc3Q+MTI3LjAuMC4xPC9ob3N0Pjxwb3J0PjkxODE8L3BvcnQ+PC9ub2RlPjwvem9va2VlcGVyPgogIDxrZWVwZXJfc2VydmVyPgogICAgPHRjcF9wb3J0PjkxODE8L3RjcF9wb3J0PgogICAgPHNlcnZlcl9pZD4xPC9zZXJ2ZXJfaWQ+CiAgICA8bG9nX3N0b3JhZ2VfcGF0aD4vdmFyL2xpYi9jbGlja2hvdXNlL2Nvb3JkaW5hdGlvbi9sb2c8L2xvZ19zdG9yYWdlX3BhdGg+CiAgICA8c25hcHNob3Rfc3RvcmFnZV9wYXRoPi92YXIvbGliL2NsaWNraG91c2UvY29vcmRpbmF0aW9uL3NuYXBzaG90czwvc25hcHNob3Rfc3RvcmFnZV9wYXRoPgogICAgPGNvb3JkaW5hdGlvbl9zZXR0aW5ncz4KICAgICAgPG9wZXJhdGlvbl90aW1lb3V0X21zPjEwMDAwPC9vcGVyYXRpb25fdGltZW91dF9tcz4KICAgICAgPHNlc3Npb25fdGltZW91dF9tcz4zMDAwMDwvc2Vzc2lvbl90aW1lb3V0X21zPgogICAgPC9jb29yZGluYXRpb25fc2V0dGluZ3M+CiAgICA8cmFmdF9jb25maWd1cmF0aW9uPgogICAgICA8c2VydmVyPjxpZD4xPC9pZD48aG9zdG5hbWU+MTI3LjAuMC4xPC9ob3N0bmFtZT48cG9ydD45MjM0PC9wb3J0Pjwvc2VydmVyPgogICAgPC9yYWZ0X2NvbmZpZ3VyYXRpb24+CiAgPC9rZWVwZXJfc2VydmVyPgogIDxyZW1vdGVfc2VydmVycz4KICAgIDxjbHVzdGVyPgogICAgICA8c2hhcmQ+CiAgICAgICAgPGludGVybmFsX3JlcGxpY2F0aW9uPnRydWU8L2ludGVybmFsX3JlcGxpY2F0aW9uPgogICAgICAgIDxyZXBsaWNhPjxob3N0PjEyNy4wLjAuMTwvaG9zdD48cG9ydD45MDAwPC9wb3J0PjwvcmVwbGljYT4KICAgICAgPC9zaGFyZD4KICAgIDwvY2x1c3Rlcj4KICA8L3JlbW90ZV9zZXJ2ZXJzPgogIDxtYWNyb3M+PHNoYXJkPjAxPC9zaGFyZD48cmVwbGljYT4wMTwvcmVwbGljYT48Y2x1c3Rlcj5jbHVzdGVyPC9jbHVzdGVyPjwvbWFjcm9zPgo8L2NsaWNraG91c2U+Cg== | base64 -d > /etc/clickhouse-server/config.d/railway.xml && export CLICKHOUSE_USER=signoz CLICKHOUSE_DB=default && exec /entrypoint.sh'`
- **Volume:** `/var/lib/clickhouse`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/signoz-or-just-updated-datadog-alternati)
