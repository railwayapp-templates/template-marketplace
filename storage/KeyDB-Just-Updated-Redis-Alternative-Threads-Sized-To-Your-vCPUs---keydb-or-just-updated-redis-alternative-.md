# Deploy KeyDB | (Just Updated) Redis Alternative, Threads Sized To Your vCPUs on Railway

KeyDB Redis alternative. Password on, threads sized to vCPUs, data kept

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/keydb-or-just-updated-redis-alternative-)

## About

KeyDB is a multi-threaded, Redis-compatible in-memory datastore. It speaks the Redis protocol, so
existing clients, queues, rate limiters and caches connect to it unchanged, while serving them from
several threads instead of one.

This template runs KeyDB 6.3 as a single service from a digest-pinned official image: the Redis port
on a Railway TCP proxy, and a Railway volume holding an append-only file and snapshots.

- **Threads follow your plan.** KeyDB defaults to a handful of threads regardless of the container.
  The start command reads the container's CPU quota and starts that many server threads, capped at
  four, and prints the number it chose in the deploy log.
- **Memory is capped below the limit.** `maxmemory` is set to 70% of the container's memory limit with
  `noeviction`, so a full instance returns errors instead of being killed by the platform.
- **Writes survive restarts.** Append-only persistence (`everysec`) is on, with the data on the
  Railway volume at `/data`; a redeploy or a crash loses at most about a second of writes.
- **A password is required from the first connection.** It is generated per deploy; anonymous clients
  are rejected.
- **Two ways in.** Services in the same project use the private URL; clients elsewhere use the TCP
  proxy URL. Both IPv4 and IPv6 are listened on, so the private network works.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| keydb | `eqalpha/keydb:latest@sha256:6537505c42355ca1f571276bddf83f5b750f760f07b2a185a676481791e388ac` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `KEYDB_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'set -e; M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); Q=$(cut -d" " -f1 /sys/fs/cgroup/cpu.max 2>/dev/null || echo max); if [ "$M" != max ]; then MM=$((M / 100 * 70)); else MM=0; fi; if [ "$Q" != max ]; then CORES=$(( (Q + 99999) / 100000 )); else CORES=$(nproc); fi; T=$CORES; [ "$T" -gt 4 ] && T=4; echo "[railway] cores=$CORES server-threads=$T maxmemory=$MM appendonly=everysec owner=$(stat -c %u:%g /data)"; exec keydb-server /etc/keydb/keydb.conf --always-show-logo no --port 6379 --bind 0.0.0.0 :: --requirepass "$KEYDB_PASSWORD" --dir /data --appendonly yes --appendfsync everysec --server-threads "$T" --maxmemory "$MM" --maxmemory-policy noeviction'`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/keydb-or-just-updated-redis-alternative-)
