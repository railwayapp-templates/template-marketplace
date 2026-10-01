# Deploy FalkorDB | (Just Updated) Graph Database for AI, Survives Crashes on Railway

FalkorDB graph DB for AI. Password on from boot, data kept, TCP proxy ready

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/falkordb-or-just-updated-graph-database-)

## About

FalkorDB is a low-latency graph database that speaks the Redis protocol and answers openCypher
queries. It is the store behind GraphRAG and agent-memory stacks: entities and relationships in a
graph, queried in milliseconds, from any Redis client.

This template runs FalkorDB 6.0 as a single service from a digest-pinned official image: the Redis
port on a Railway TCP proxy, the FalkorDB Browser on a public domain, and all data on a Railway
volume with append-only persistence.

- **A password is required from the first connection.** A stock `falkordb/falkordb` container has
  no password, so anyone who can reach port 6379 can read, write and delete every graph. Here a
  password is generated per deploy and anonymous connections are rejected.
- **Data survives redeploys.** The append-only file lives on the attached volume; a graph written
  before a redeploy was read back after it.
- **Memory and threads follow your plan.** The start command reads the container's memory and CPU
  limits and passes `maxmemory` (60% of the limit) and the query thread count, instead of the
  host's figures that Railway containers report.
- **Two ways in.** Services in the same project use the private URL; clients elsewhere use the TCP
  proxy URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| falkordb | `falkordb/falkordb:6.0.0@sha256:92fbda814970a648b1fd80835bff221766bccd0f0ce958bc58a62976fea06620` | TCP service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `FALKORDB_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'set -e; M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); Q=$(cut -d" " -f1 /sys/fs/cgroup/cpu.max 2>/dev/null || echo max); MM=""; if [ "$M" != max ]; then MM="--maxmemory $((M / 100 * 60))"; fi; if [ "$Q" != max ]; then CORES=$(( (Q + 99999) / 100000 )); else CORES=$(nproc); fi; export PORT=3000 REDIS_ARGS="--requirepass $FALKORDB_PASSWORD --appendonly yes --appendfsync everysec $MM" FALKORDB_ARGS="MAX_QUEUED_QUERIES 25 TIMEOUT 1000 RESULTSET_SIZE 10000 THREAD_COUNT $CORES"; echo "[railway] cores=$CORES memory.max=$M redis-args=$MM owner=$(stat -c %u:%g /var/lib/falkordb/data)"; exec /var/lib/falkordb/bin/run.sh'`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/var/lib/falkordb/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/falkordb-or-just-updated-graph-database-)
