# Deploy Dragonfly | (Just Updated) Redis Replacement, Snapshots Every 5 Min on Railway

Dragonfly Redis replacement. Password on, snapshots every 5 min, data kept

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dragonfly-or-just-updated-redis-replacem)

## About

Dragonfly is a multi-threaded, Redis-compatible in-memory datastore. It speaks the Redis protocol, so
existing clients, queues, rate limiters and caches connect to it unchanged, and it keeps a whole
dataset in memory across every core of the container.

This template runs Dragonfly 2.0 as a single service from a digest-pinned official image: the Redis
port on a Railway TCP proxy, and a Railway volume holding snapshots that are rewritten every five
minutes.

- **A crash does not erase your data.** A stock Dragonfly container saves only on a clean shutdown;
  after a hard kill (an out-of-memory kill, a node failure) it restarts empty. This template saves a
  snapshot to the volume every five minutes under a fixed file name, so a hard kill loses at most the
  last five minutes and the snapshots never pile up on the volume.
- **A password is required from the first connection.** It is generated per deploy; anonymous
  clients are rejected.
- **Memory and threads follow your plan.** The start command reads the container's memory limit and
  passes `maxmemory` (70% of it, leaving headroom for snapshots) and the thread count.
- **Two ways in.** Services in the same project use the private URL; clients elsewhere use the TCP
  proxy URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dragonfly | `ghcr.io/dragonflydb/dragonfly:v2.0.0@sha256:7426fdb31ddcf7bd9499b4205f36ebaa83b26149ba1609a0d5f8f474b3631233` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DRAGONFLY_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'set -e; M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); Q=$(cut -d" " -f1 /sys/fs/cgroup/cpu.max 2>/dev/null || echo max); if [ "$M" != max ]; then MM=$((M / 100 * 70)); else MM=0; fi; if [ "$Q" != max ]; then CORES=$(( (Q + 99999) / 100000 )); else CORES=$(nproc); fi; echo "[railway] cores=$CORES maxmemory=$MM snapshot=/data/dump every 5 min owner=$(stat -c %u:%g /data)"; exec entrypoint.sh dragonfly --logtostderr --requirepass "$DRAGONFLY_PASSWORD" --dir /data --dbfilename dump --snapshot_cron "*/5 * * * *" --proactor_threads "$CORES" --maxmemory "$MM"'`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/dragonfly-or-just-updated-redis-replacem)
