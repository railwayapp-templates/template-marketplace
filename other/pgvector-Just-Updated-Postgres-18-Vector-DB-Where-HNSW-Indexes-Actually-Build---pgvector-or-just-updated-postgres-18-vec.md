# Deploy pgvector | (Just Updated) Postgres 18 Vector DB Where HNSW Indexes Actually Build on Railway

Postgres 18 + pgvector, tuned per plan, HNSW indexes that actually build

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgvector-or-just-updated-postgres-18-vec)

## About

pgvector turns PostgreSQL into a vector database: store embeddings alongside your
relational data and query them with exact or approximate nearest-neighbour search,
using the same SQL, the same transactions and the same backups you already have.

This template ships PostgreSQL 18 with the pgvector extension **already created**, a
per-deploy generated superuser password, a persistent volume, a public TCP proxy, and
server settings sized from the container's real CPU and memory limits — including the
one setting without which HNSW index builds fail outright on Railway.

The upstream `pgvector/pgvector` image is a stock PostgreSQL image with the extension
compiled in. It does not create the extension, does not tune PostgreSQL, and inherits
PostgreSQL's conservative defaults, which are written for a machine much smaller than a
Railway container.

Two of those defaults matter here.

**HNSW index builds fail on Railway at stock settings.** PostgreSQL allocates the
parallel index build's shared segment in `/dev/shm`, which is about 61 MB inside a
Railway container, and sizes that request from `maintenance_work_mem`. A parallel HNSW
build therefore ends in:

```
ERROR:  could not resize shared memory segment ... No space left on device
```

The failure only appears once the table grows past roughly 8 MB — the point at which
PostgreSQL starts planning parallel workers — so a tutorial-sized table indexes fine and
a real corpus does not. This template sets `dynamic_shared_memory_type=mmap`, which puts
that segment on the volume instead of in `/dev/shm`, so the build runs with parallelism
intact. Measured on a live deploy with 50,000 × 384-dimension vectors: stock errors out,
this template builds the index.

**Nothing is sized for the plan.** `shared_buffers`, `effective_cache_size`,
`maintenance_work_mem` and `work_mem` are read from `/sys/fs/cgroup` at boot, and the
parallel worker counts from the CPU quota rather than the host's core count, which a
container reports incorrectly. The chosen values are printed in the deploy log:

```
[railway] mem=7629MB cpu=8 shared_buffers=1907MB effective_cache_size=4577MB maintenance_work_mem=1525MB work_mem=64MB dsm=mmap
```

Everything else is standard PostgreSQL operation: the data directory lives on a Railway
volume, the superuser password is generated per deploy, and the database is reachable
from outside Railway through a TCP proxy and from inside the project over the private
network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgvector | `pgvector/pgvector@sha256:78bf48b801e792f99e3ac62b5036fd3876e9be48afda16c1e331af1c75ceb2ff` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'unset PGHOST PGPORT PGUSER PGPASSWORD PGDATABASE;M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null); M=${M:-max}; [ "$M" = max ] && M=2147483648;MB=$((M/1048576));SB=$((MB/4)); [ "$SB" -lt 128 ] && SB=128;EC=$((MB*3/5)); [ "$EC" -lt 256 ] && EC=256;MW=$((MB/5)); [ "$MW" -lt 64 ] && MW=64; [ "$MW" -gt 2048 ] && MW=2048;WM=$((MB/64)); [ "$WM" -lt 4 ] && WM=4; [ "$WM" -gt 64 ] && WM=64;set -- $(cat /sys/fs/cgroup/cpu.max 2>/dev/null); Q=${1:-max}; P=${2:-100000};if [ "$Q" = max ]; then C=2; else C=$((Q/P)); fi;[ "$C" -lt 1 ] && C=1;PM=$((C/2)); [ "$PM" -lt 1 ] && PM=1; [ "$PM" -gt 4 ] && PM=4;mkdir -p /docker-entrypoint-initdb.d;printf "%s\n" "CREATE EXTENSION IF NOT EXISTS vector;" "\\c template1" "CREATE EXTENSION IF NOT EXISTS vector;" > /docker-entrypoint-initdb.d/10-vector.sql;echo "[railway] mem=${MB}MB cpu=$C shared_buffers=${SB}MB effective_cache_size=${EC}MB maintenance_work_mem=${MW}MB work_mem=${WM}MB dsm=mmap"; exec docker-entrypoint.sh postgres -c dynamic_shared_memory_type=mmap -c shared_buffers=${SB}MB -c effective_cache_size=${EC}MB -c maintenance_work_mem=${MW}MB -c work_mem=${WM}MB -c max_worker_processes=$C -c max_parallel_workers=$C -c max_parallel_workers_per_gather=$PM -c max_parallel_maintenance_workers=$PM'`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/pgvector-or-just-updated-postgres-18-vec)
