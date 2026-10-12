# Deploy TimescaleDB | (Just Updated) Postgres 17 Time-Series DB, Extension Enabled, Data Survives Redeploys on Railway

Postgres 17 + TimescaleDB, hypertables ready, data survives redeploys

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/timescaledb-or-just-updated-postgres-17-)

## About

TimescaleDB is PostgreSQL extended for time-series data: hypertables that partition automatically by time, continuous aggregates, compression and retention policies, all queried with plain SQL. This template runs the official `timescale/timescaledb` image (PostgreSQL 17 with the extension preinstalled) as a single service from a digest-pinned image, with the database port on a Railway TCP proxy and a Railway volume holding the data.

- **The extension is ready on first boot.** The image enables `timescaledb` in the default database, so `create_hypertable(...)` works immediately.
- **A password is set from the first boot.** `POSTGRES_PASSWORD` is generated per deploy and a database named `railway` is created. Clients with the wrong password are refused.
- **Your data survives redeploys.** The volume is mounted at `/var/lib/postgresql` and PGDATA stays at its default subdirectory, so the `lost+found` folder Railway puts at the volume root never lands inside the data directory. The start command runs as root so the root-owned volume is writable, and prints the user id and mount owner in the deploy log so you can confirm it.
- **Memory and CPU follow your plan.** `shared_buffers`, `effective_cache_size`, `work_mem` and the worker counts are computed from the container's cgroup limits, not from the host's RAM, and the same figures feed `timescaledb-tune`.
- **Two ways in.** Services in the same project use the private URL; clients elsewhere use the TCP proxy URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| timescaledb | `timescale/timescaledb@sha256:b346edcdb51a1fd6020e3965e0bd1c9f3406fa6d5fbce1e28f4852587ef934e2` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'unset PGHOST PGPORT PGUSER PGPASSWORD PGDATABASE;M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null); M=${M:-max}; [ "$M" = max ] && M=2147483648;MB=$((M/1048576));SB=$((MB/4)); [ "$SB" -lt 128 ] && SB=128;EC=$((MB*3/5)); [ "$EC" -lt 256 ] && EC=256;MW=$((MB/5)); [ "$MW" -lt 64 ] && MW=64; [ "$MW" -gt 2048 ] && MW=2048;WM=$((MB/64)); [ "$WM" -lt 4 ] && WM=4; [ "$WM" -gt 64 ] && WM=64;set -- $(cat /sys/fs/cgroup/cpu.max 2>/dev/null); Q=${1:-max}; P=${2:-100000};if [ "$Q" = max ]; then C=2; else C=$((Q/P)); fi;[ "$C" -lt 1 ] && C=1;PM=$((C/2)); [ "$PM" -lt 1 ] && PM=1; [ "$PM" -gt 4 ] && PM=4;export POSTGRES_USER=postgres POSTGRES_DB=railway TS_TUNE_MEMORY=${MB}MB TS_TUNE_NUM_CPUS=$C;echo "[railway] uid=$(id -u) owner=$(stat -c %u:%g /var/lib/postgresql) mem=${MB}MB cpu=$C shared_buffers=${SB}MB effective_cache_size=${EC}MB maintenance_work_mem=${MW}MB work_mem=${WM}MB dsm=mmap"; exec docker-entrypoint.sh postgres -c dynamic_shared_memory_type=mmap -c shared_buffers=${SB}MB -c effective_cache_size=${EC}MB -c maintenance_work_mem=${MW}MB -c work_mem=${WM}MB -c max_worker_processes=$C -c max_parallel_workers=$C -c max_parallel_workers_per_gather=$PM -c max_parallel_maintenance_workers=$PM'`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/timescaledb-or-just-updated-postgres-17-)
