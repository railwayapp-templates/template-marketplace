# Deploy PostgreSQL 18 on Railway

PostgreSQL 18 with SSL on, a persistent volume and a public TCP proxy URL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresql-18)

## About

PostgreSQL 18 is the current major release of the PostgreSQL database, with a new asynchronous I/O subsystem that speeds up sequential scans, bitmap heap scans and vacuum, OAuth authentication, a native `uuidv7()` function, B-tree skip scans and virtual generated columns. This template deploys it on Railway with SSL enabled from the first connection, a persistent volume, private networking for your other services and a public TCP proxy for external tools.

The service builds from a fork of Railway's own `postgres-ssl` repository, using its `Dockerfile.18`. That image starts from the official `postgres:18` image and adds an init script that generates a self-signed certificate on first boot and turns `ssl = on`, so clients can connect encrypted immediately. The certificate is valid for 820 days by default (`SSL_CERT_DAYS`) and is regenerated automatically on restart when it is within 30 days of expiry.

The volume is mounted at `/var/lib/postgresql`, matching the version-specific data layout the official image adopted in PostgreSQL 18, with `PGDATA` set beneath it. Railway's standard variables are all present: `DATABASE_URL` for the private network, `DATABASE_PUBLIC_URL` through the TCP proxy, and `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` for tools and the Railway data panel. The password is generated at deploy time. `RAILWAY_DEPLOYMENT_DRAINING_SECONDS=60` gives PostgreSQL time to shut down cleanly on redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PostgreSQL 18 | [ThallesP/postgres-ssl](https://github.com/ThallesP/postgres-ssl) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | railway |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql`

**Category:** Storage · **Languages:** Shell

[View on Railway →](https://railway.com/deploy/postgresql-18)
