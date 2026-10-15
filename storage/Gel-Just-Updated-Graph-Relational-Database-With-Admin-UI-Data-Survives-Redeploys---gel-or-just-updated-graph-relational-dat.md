# Deploy Gel | (Just Updated) Graph-Relational Database With Admin UI, Data Survives Redeploys on Railway

Graph-relational database on Postgres, admin UI, persistent volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gel-or-just-updated-graph-relational-dat)

## About

Gel (formerly EdgeDB) is a graph-relational database built on PostgreSQL. You model data as typed objects with links, query it with EdgeQL, and manage it from a built-in admin UI. This template runs Gel as a single service from a digest-pinned official image, with a generated admin password and a persistent volume.

Gel needs a few things handled for Railway, all done in the start command:

- **Writable volume.** Railway mounts volumes root-owned while the image runs as an unprivileged user. The service runs as root and logs the owner of the data directory at boot.
- **Data directory under the mount.** The database lives in a subdirectory of `/var/lib/gel`, so the volume's `lost+found` never lands in the data directory.
- **Generated password.** `GEL_SERVER_PASSWORD` is random per deploy, so no default credential is ever live on a public address.
- **Wire protocol.** Gel clients connect over its own protocol on port 5656 through a TCP proxy; the admin UI is served on the same port at `/ui`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gel | `geldata/gel:6@sha256:b3a2815a39564f2c69a71886b9acba4e4a0251f352a72ffa20c3318984a901b1` | TCP service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `GEL_SERVER_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'echo "gel uid=$(id -u) mount_owner=$(stat -c %u:%g /var/lib/gel)"; export GEL_SERVER_DATADIR=/var/lib/gel/db GEL_SERVER_PORT=5656 GEL_SERVER_BIND_ADDRESS=0.0.0.0 GEL_SERVER_TLS_CERT_MODE=generate_self_signed GEL_SERVER_HTTP_ENDPOINT_SECURITY=optional GEL_SERVER_ADMIN_UI=enabled; exec docker-entrypoint.sh server'`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5656
- **Volume:** `/var/lib/gel`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/gel-or-just-updated-graph-relational-dat)
