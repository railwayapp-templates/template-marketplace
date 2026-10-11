# Deploy MongoDB | (Just Updated) Official Community Server, Auth On, Data Survives Redeploys on Railway

Official MongoDB 8 server, auth on, volume-backed, private and TCP URLs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mongodb-or-just-updated-official-communi)

## About

MongoDB is the document database behind a large share of Node.js, Python and Go back ends. This
template runs the official MongoDB Community Server 8.0 as a single service from a digest-pinned
image, with the database port on a Railway TCP proxy and a Railway volume holding the data files.

- **Authentication is on from the first connection.** A root user named `admin` is created at first
  boot with a password generated per deploy. Anonymous clients are refused with `Unauthorized`.
- **Your data survives redeploys.** The data directory `/data/db` is a Railway volume. The start
  command runs the server as root so the root-owned volume is writable, and prints the user id and
  mount owner in the deploy log so you can confirm it.
- **Cache size follows your plan.** The WiredTiger cache is set from the container's memory limit
  (half of it), not from the host's RAM, so the server does not size itself for a machine it cannot use.
- **Two ways in.** Services in the same project use the private URL; clients elsewhere use the TCP
  proxy URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mongodb | `mongodb/mongodb-community-server:8.0.32-ubi9-slim@sha256:80e08a8978e6de2feffdfd553358fd3398d56f42baac8a030e21ee2bd5709e04` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MONGO_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'set -e; M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); if [ "$M" != max ]; then CM=$((M / 2 / 1048576)); [ "$CM" -lt 256 ] && CM=256; C=$(printf "%d.%02d" $((CM / 1024)) $(((CM % 1024) * 100 / 1024))); else C=0.50; fi; export MONGODB_INITDB_ROOT_USERNAME=admin MONGODB_INITDB_ROOT_PASSWORD="$MONGO_PASSWORD"; echo "[railway] uid=$(id -u) wiredTigerCacheGB=$C owner=$(stat -c %u:%g /data/db)"; exec /usr/local/bin/docker-entrypoint mongod --wiredTigerCacheSizeGB "$C"'`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/mongodb-or-just-updated-official-communi)
