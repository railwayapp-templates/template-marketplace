# Deploy FalkorDB on Railway

Graph database for storing and querying connected data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/falkordb-graph)

## About

FalkorDB is an ultra-fast property-graph database that stores data as sparse adjacency matrices and queries it with OpenCypher over the Redis wire protocol. It is the successor to RedisGraph, built by the same team, and serves as the knowledge-graph layer behind GraphRAG pipelines, AI agent memory, fraud detection and recommendations — anywhere queries are about *relationships* rather than rows. Official drivers exist for Python, JavaScript, Java, Go, Rust, PHP and C#.

Deploy FalkorDB on Railway and you get two services. `falkordb` runs the database with the bundled FalkorDB Browser, a visual Cypher workbench served over HTTPS on the generated Railway domain, and exposes the database on a TCP proxy for external clients. `falkordb-replica` runs the same engine as a read-only replica streaming changes from the primary over the private network — a hot standby, and somewhere to send heavy reads. Each keeps data on its own volume with AOF persistence on, and the whole stack is password-protected from first boot — no default credentials exist.

![Diagram of the FalkorDB and read replica services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789460454/falkordb-architecture.webp)

A graph database stores entities as nodes and their connections as first-class edges, so "which suppliers are three hops away" is a traversal, not a pile of joins. FalkorDB is unusual in how it does that: graphs are held as sparse matrices and traversals evaluated as linear algebra over GraphBLAS, keeping multi-hop queries fast enough for a request handler or an LLM retrieval step. Teams self-host it to keep customer data out of a vendor cloud, or because a managed graph service costs more than the workload justifies.

- OpenCypher with FalkorDB's own extensions
- Full-text, vector and range indexes in one engine, so GraphRAG needs no second store
- Multi-tenant: thousands of separate graphs in one instance
- Built-in graph algorithms, user-defined functions and bulk loading
- RDB snapshots plus AOF logging, and Redis replication

The Railway architecture is deliberately small. `falkordb` is the single writer: it owns every graph, serves the Browser on port 3000 and the database protocol on port 6379, and persists to `/var/lib/falkordb/data`. `falkordb-replica` runs the browser-less `falkordb-server` image and connects as a Redis replica, holding a continuously updated copy on its own volume. Replication is asynchronous and single-primary.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| falkordb | `falkordb/falkordb:v4.20.4` | TCP service |
| falkordb-replica | `falkordb/falkordb-server:v4.20.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | falkordb | 3000 | FalkorDB Browser HTTP port |
| `AUTH_URL` | falkordb | - | Public Browser URL |
| `AUTH_SECRET` | falkordb | (secret) | Browser session signing key |
| `NEXTAUTH_URL` | falkordb | - | Legacy alias of AUTH_URL |
| `FALKORDB_HOST` | falkordb | falkordb.railway.internal | Private hostname for peers |
| `FALKORDB_PORT` | falkordb | 6379 | Database protocol port |
| `ENCRYPTION_KEY` | falkordb | - | Encrypts stored Browser credentials |
| `ALLOWED_ORIGINS` | falkordb | - | CORS allow-list for the Browser API |
| `AUTH_TRUST_HOST` | falkordb | true | Trust Railway's proxy headers |
| `FALKORDB_PASSWORD` | falkordb | (secret) | Database password and Browser login |
| `FALKORDB_PUBLIC_URL` | falkordb | - | Public TCP proxy connection string |
| `FALKORDB_PRIVATE_URL` | falkordb | - | Private connection string |
| `FALKORDB_PASSWORD` | falkordb-replica | (secret) | Must match the primary's password |
| `FALKORDB_REPLICAOF` | falkordb-replica | - | Primary to replicate from |
| `FALKORDB_REPLICA_PRIVATE_URL` | falkordb-replica | - | Read-only connection string |

## Configuration

- **Start command:** `/bin/sh -c 'if [ -r /sys/fs/cgroup/cpu.max ]; then read CQ CP < /sys/fs/cgroup/cpu.max; else CQ=max; CP=100000; fi; if [ "$CQ" = "max" ]; then N=4; else N=$((CQ/CP)); fi; if [ "$N" -lt 1 ]; then N=1; fi; MM=; if [ -r /sys/fs/cgroup/memory.max ]; then read MB < /sys/fs/cgroup/memory.max; if [ "$MB" != "max" ]; then MM=$((MB/10*7)); fi; fi; case "$FALKORDB_ARGS" in ""|"MAX_QUEUED_QUERIES 25 TIMEOUT 1000 RESULTSET_SIZE 10000") FALKORDB_ARGS="THREAD_COUNT $N OMP_THREAD_COUNT $N MAX_QUEUED_QUERIES 100 RESULTSET_SIZE 10000";; esac; if [ -z "$REDIS_ARGS" ]; then REDIS_ARGS="--requirepass $FALKORDB_PASSWORD --appendonly yes --appendfsync everysec"; if [ -n "$MM" ]; then REDIS_ARGS="$REDIS_ARGS --maxmemory $MM --maxmemory-policy noeviction"; fi; if [ -n "$FALKORDB_REPLICAOF" ]; then REDIS_ARGS="$REDIS_ARGS --replicaof $FALKORDB_REPLICAOF --masterauth $FALKORDB_PASSWORD --replica-read-only yes"; fi; fi; export FALKORDB_ARGS REDIS_ARGS; echo "[railway] THREAD_COUNT=$N MAXMEMORY=${MM:-unset} REPLICAOF=${FALKORDB_REPLICAOF:-none}"; exec /var/lib/falkordb/bin/run.sh'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/var/lib/falkordb/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/falkordb-graph)
