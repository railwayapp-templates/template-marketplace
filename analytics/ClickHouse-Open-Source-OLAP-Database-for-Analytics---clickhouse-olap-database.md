# Deploy ClickHouse | Open Source OLAP Database for Analytics on Railway

Column-oriented OLAP database for fast analytics on large datasets

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clickhouse-olap-database)

## About

ClickHouse is an open-source column-oriented database built for analytics: it scans billions of rows and returns aggregates in the time a row-store spends planning the query.

This template runs the official `clickhouse/clickhouse-server:26.7.3.19-alpine` image with no custom build in between, so you get upstream ClickHouse and upstream security updates on a pinned, immutable tag. Data lives on a persistent Railway volume mounted at `/var/lib/clickhouse`, and a random password is generated at deploy time — nothing ships with a default credential.

Both interfaces are wired up. The HTTP interface is served over your public Railway domain on port 8123, which is what `curl`, the JDBC/ODBC drivers and the built-in `/play` query console speak. The native protocol is exposed through a Railway TCP proxy on port 9000, so `clickhouse-client` and the official Python, Go and Node drivers connect from outside the project without extra configuration. SQL-driven access management is enabled, so you can `CREATE USER`, `CREATE ROLE` and `GRANT` instead of editing XML files you cannot reach on a managed platform.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ClickHouse | `clickhouse/clickhouse-server:26.7.3.19-alpine` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8123 | Port Railway routes HTTP traffic and healthchecks to. ClickHouse ignores this variable; it exists because the image also exposes the native protocol on 9000. Do not change it. |
| `CLICKHOUSE_USER` | (secret) | ClickHouse account created at first boot. Keep 'default' unless you have a reason to rename it: every driver and connection string assumes it. |
| `CLICKHOUSE_PASSWORD` | (secret) | Password for the ClickHouse user. Generated per deployment. Change it later with ALTER USER, not by editing this variable — it is applied to the server's user config at boot. |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | 1 | Allows managing users, roles and grants with SQL (CREATE USER, GRANT). Set to 0 to lock access management down to the config files. |

## Configuration

- **Start command:** `/entrypoint.sh -- --logger.console=1 --logger.level=information`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 9000
- **Volume:** `/var/lib/clickhouse`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/clickhouse-olap-database)
