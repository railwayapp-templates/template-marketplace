# Deploy rqlite on Railway

rqlite 10.3: SQLite over an HTTP API, with auth and a web console.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rqlite)

## About

rqlite is a lightweight relational database that puts SQLite behind an HTTP API. Applications send SQL as JSON over HTTP and get JSON results back, so any language can use it without a driver. It adds authentication, backups and optional Raft clustering on top of the SQLite engine.

This template runs the official `rqlite/rqlite:10.3.6` image as a single node. The database lives on a Railway volume and survives redeploys. At boot, the start command writes an auth file from `RQLITE_USERNAME` and `RQLITE_PASSWORD`, then drops to the unprivileged `rqlite` user. Every query and write needs those credentials. Only the readiness and status probes are open without a password. The HTTP API is served over HTTPS on a public domain and over the private network on port 4001. The built-in web console at `/console/` uses the same login. One node fits the Hobby plan easily.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rqlite | `rqlite/rqlite:10.3.6` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 4001 |
| `NODE_ID` | rqlite-1 |
| `HTTP_ADDR` | [::]:4001 |
| `RAFT_ADDR` | [::]:4002 |
| `RQLITE_PASSWORD` | (secret) |
| `RQLITE_USERNAME` | (secret) |

## Configuration

- **Start command:** `sh -c 'set -e; chown rqlite:rqlite /rqlite/file; umask 077; printf "[{\"username\":\"%s\",\"password\":\"%s\",\"perms\":[\"all\"]},{\"username\":\"*\",\"perms\":[\"ready\",\"status\"]}]\n" "$RQLITE_USERNAME" "$RQLITE_PASSWORD" > /tmp/auth.json; chown rqlite:rqlite /tmp/auth.json; exec su rqlite -s /bin/sh -c "exec docker-entrypoint.sh -auth /tmp/auth.json"'`
- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/rqlite/file`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/rqlite)
