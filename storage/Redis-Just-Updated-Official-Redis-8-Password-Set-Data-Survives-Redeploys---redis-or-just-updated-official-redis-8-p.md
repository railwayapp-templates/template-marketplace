# Deploy Redis | (Just Updated) Official Redis 8, Password Set, Data Survives Redeploys on Railway

Official Redis 8, password set, AOF on a volume, TCP proxy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redis-or-just-updated-official-redis-8-p)

## About

Redis is the in-memory data store behind caches, queues, rate limiters and session stores. This
template runs the official Redis 8 image as a single service from a digest-pinned image, with the
port on a Railway TCP proxy and a Railway volume holding the persistence files.

- **A password is required from the first connection.** `REDIS_PASSWORD` is generated per deploy;
  unauthenticated clients get `NOAUTH Authentication required`.
- **Your data survives redeploys.** The data directory `/data` is a Railway volume with append-only
  persistence (`appendfsync everysec`) plus RDB snapshots. The start command fixes the volume's
  ownership at boot and prints the mount owner in the deploy log so you can confirm it.
- **Memory and threads follow your plan.** `maxmemory` is set to 70% of the container's memory
  limit and I/O threads to the container's CPU count, read from the cgroup rather than the host.
  The eviction policy is `noeviction`, so Redis refuses writes instead of silently dropping keys.
- **Two ways in.** Services in the same project use the private URL; clients elsewhere use the TCP
  proxy URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:8.8.3@sha256:eb1aa641bc5380ed14442398e45a5a51aeaaac919fab811e4f134eb77c71dd2d` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `REDIS_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'set -e; M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); Q=$(cut -d" " -f1 /sys/fs/cgroup/cpu.max 2>/dev/null || echo max); if [ "$M" != max ]; then MM=$((M / 100 * 70)); else MM=0; fi; if [ "$Q" != max ]; then CORES=$(( (Q + 99999) / 100000 )); else CORES=$(nproc); fi; if [ "$CORES" -ge 4 ]; then IOT=$CORES; else IOT=1; fi; [ "$IOT" -gt 8 ] && IOT=8; echo "[railway] cores=$CORES io-threads=$IOT maxmemory=$MM appendonly=everysec owner=$(stat -c %u:%g /data)"; chown -R redis:redis /data; exec docker-entrypoint.sh redis-server --port 6379 --bind "* -::*" --requirepass "$REDIS_PASSWORD" --dir /data --appendonly yes --appendfsync everysec --save "900 1 300 100 60 10000" --maxmemory "$MM" --maxmemory-policy noeviction --io-threads "$IOT"'`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/redis-or-just-updated-official-redis-8-p)
