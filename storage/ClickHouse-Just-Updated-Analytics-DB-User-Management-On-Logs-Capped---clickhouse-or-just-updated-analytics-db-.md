# Deploy ClickHouse | (Just Updated) Analytics DB, User Management On, Logs Capped on Railway

ClickHouse analytics DB. SQL users and grants on, system logs capped 7 days

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clickhouse-or-just-updated-analytics-db-)

## About

ClickHouse is the open-source column-oriented database for real-time analytics. It runs SQL over
billions of rows in milliseconds and backs product analytics, observability stacks, log search and
event pipelines.

This template runs ClickHouse 26.8 as a single service from a digest-pinned official image: the
HTTP interface on an HTTPS domain, the native protocol on the private network, and all data on a
Railway volume.

ClickHouse runs on Railway only after a few things are handled for you:

- **SQL user management is on.** The default user can run `CREATE USER`, `CREATE ROLE` and
  `GRANT`, so you can give each app its own read-only or scoped account. A stock deploy leaves
  access management off and every `CREATE USER` fails with `Not enough privileges`, which leaves
  one shared admin password for every client.
- **System logs cannot fill your volume.** ClickHouse writes its own metrics and query history into
  system tables that never expire by default; on an idle server `asynchronous_metric_log` alone
  gains millions of rows an hour. Here every system log table keeps 7 days and then deletes itself,
  and the server text log is kept at warning level instead of trace, so the disk you pay for holds
  your data.
- **Server log files are capped** at three 100 MB files.
- **A password is generated per deploy**, and anonymous requests are rejected.
- **Data survives redeploys.** Tables, users and grants live on the attached volume.
- **Memory is sized to your plan.** ClickHouse reads the container's cgroup limit and keeps its
  memory ceiling at 90% of it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clickhouse | `clickhouse/clickhouse-server:26.8.13.2@sha256:d3cdda9b2137852b20b96b1262b043dbedbe78c2b2c7063a3da60781a29e3463` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `CLICKHOUSE_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'set -e; P=${PORT:-8123}; T="event_date + INTERVAL 7 DAY DELETE"; X="<clickhouse><http_port>$P</http_port><logger><level>information</level><size>100M</size><count>3</count></logger>"; for t in query_log trace_log query_thread_log query_views_log part_log background_schedule_pool_log metric_log error_log instrumentation_trace_log query_metric_log asynchronous_metric_log crash_log backup_log s3queue_log iceberg_metadata_log delta_lake_metadata_log; do X="$X<$t><ttl>$T</ttl></$t>"; done; echo "$X<text_log><ttl>$T</ttl><level>warning</level></text_log></clickhouse>" > /etc/clickhouse-server/config.d/90-railway.xml; echo "[railway] http_port=$P, system log tables capped at 7 days, text_log at warning, SQL user management on"; export CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT=1; exec /entrypoint.sh'`
- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/clickhouse-or-just-updated-analytics-db-)
