# Deploy Valkey | (Just Updated) Redis Alternative, Crash-Safe Data, Memory Capped on Railway

Valkey Redis fork. Password on, AOF every second, memory capped, data kept

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/valkey-or-just-updated-redis-alternative)

## About

Valkey is the Linux Foundation's open-source fork of Redis. It speaks the Redis protocol, so existing
clients, queues, rate limiters and caches connect to it unchanged, and it keeps the dataset in memory
for sub-millisecond reads.

This template runs Valkey 9.1 as a single service from a digest-pinned official image: the Redis port
on a Railway TCP proxy, and a Railway volume holding an append-only file that is flushed every second.

- **A crash does not erase your data.** A stock Valkey container saves a snapshot only every hour
  (and only after a change), so a hard kill, such as an out-of-memory kill or a node failure, loses
  everything written since. This template turns on the append-only file with a one-second flush, so a
  hard kill loses at most the last second.
- **A password is required from the first connection.** It is generated per deploy; anonymous
  clients are rejected with `NOAUTH`.
- **Memory and threads follow your plan.** The start command reads the container's memory and CPU
  limits and sets `maxmemory` to 70% of the memory limit, leaving headroom for rewrites, with the
  `noeviction` policy, so a full instance refuses writes instead of being killed. It also sets the I/O
  thread count from the container's cores, not the host's.
- **Two ways in.** Services in the same project use the private URL; clients elsewhere use the TCP
  proxy URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| valkey | `valkey/valkey:9.1.2-trixie@sha256:418652cfb58ef879d4978c33553735d7147016032d5aefaa14c828e611eb9dfd` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `VALKEY_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'set -e; M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); Q=$(cut -d" " -f1 /sys/fs/cgroup/cpu.max 2>/dev/null || echo max); if [ "$M" != max ]; then MM=$((M / 100 * 70)); else MM=0; fi; if [ "$Q" != max ]; then CORES=$(( (Q + 99999) / 100000 )); else CORES=$(nproc); fi; if [ "$CORES" -ge 4 ]; then IOT=$CORES; else IOT=1; fi; [ "$IOT" -gt 8 ] && IOT=8; echo "[railway] cores=$CORES io-threads=$IOT maxmemory=$MM appendonly=everysec owner=$(stat -c %u:%g /data)"; exec docker-entrypoint.sh valkey-server --port 6379 --bind "* -::*" --requirepass "$VALKEY_PASSWORD" --dir /data --appendonly yes --appendfsync everysec --save "900 1 300 100 60 10000" --maxmemory "$MM" --maxmemory-policy noeviction --io-threads "$IOT"'`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/valkey-or-just-updated-redis-alternative)
