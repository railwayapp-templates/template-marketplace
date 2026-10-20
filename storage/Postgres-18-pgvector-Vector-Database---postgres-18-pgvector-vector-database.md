# Deploy Postgres 18 + pgvector Vector Database on Railway

Drop-in Postgres with pgvector, pooling and backups for RAG and embeddings.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgres-18-pgvector-vector-database)

## About

pgvector adds vector similarity search to PostgreSQL, so embeddings live next to the rest of your data and are queried with SQL. This community template runs PostgreSQL 18 with pgvector 0.8 on Railway's own Postgres image, with PgBouncer connection pooling and daily backups to a Railway Bucket.

A production pgvector database needs more than the extension. Index builds are fast only when the HNSW graph fits in `maintenance_work_mem`, parallel builds need enough shared memory, many app instances need a connection pooler, and the data needs off-volume backups. This template keeps Railway's Postgres service layout and variables, so it is a drop-in replacement, and adds those pieces: the `vector` extension is created on first boot, memory and parallel workers are sized from the container's limits at every start, `/dev/shm` is raised for parallel index builds, PgBouncer pools connections in transaction mode, and a cron job writes verified `pg_dump` backups with retention.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Postgres Backup | [baranberkay96/pgvector-railway](https://github.com/baranberkay96/pgvector-railway) (branch: main) (root: /services/backup) | Worker |
| PgBouncer | `edoburu/pgbouncer:v1.26.1-p0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot; the vector and pg_stat_statements extensions are created in it. |
| `DATABASE_URL` | Postgres | - | Direct connection over the private network. Use it for migrations, index builds and session features (LISTEN/NOTIFY, advisory locks, SET). |
| `PG_CPU_LIMIT` | Postgres | auto | CPUs the tuning plans for (parallel workers). auto = the container CPU quota capped at 8; set a number to override. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot. |
| `PGVECTOR_TUNING` | Postgres | auto | auto = size memory and parallelism from the container limits at every boot (pgvector-tuning.conf); off = Postgres and Railway defaults. |
| `DATABASE_POOL_URL` | Postgres | - | Pooled connection through PgBouncer (transaction mode, private network only). Use it for application queries. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, generated at deploy (letters only, so it is URL-safe). Changing it later needs ALTER USER as well. |
| `PG_MEMORY_LIMIT_MB` | Postgres | auto | RAM the tuning plans for. auto = the container limit capped at 8192 MB; set a number (e.g. 16384) after raising the service's memory. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Connection from outside Railway through the TCP proxy (egress is billed). Add sslmode=require for psql/libpq; the certificate is self-signed. |
| `PGAPPNAME` | Postgres Backup | pgvector-backup | application_name shown in pg_stat_activity while a backup runs. |
| `BACKUP_PREFIX` | Postgres Backup | postgres | Folder in the bucket; each run writes {prefix}/{UTC timestamp}/. |
| `BACKUP_KEEP_MIN` | Postgres Backup | 3 | Always keep at least this many complete runs, whatever their age. |
| `BACKUP_DATABASES` | Postgres Backup | - | Databases to dump, comma-separated. Empty = every database that accepts connections. |
| `BACKUP_S3_BUCKET` | Postgres Backup | - | Railway Bucket that stores the backups. |
| `BACKUP_S3_REGION` | Postgres Backup | - | Bucket region. |
| `PGCONNECT_TIMEOUT` | Postgres Backup | 10 | Seconds before a connection attempt gives up (the job retries while Postgres starts). |
| `BACKUP_COMPRESSION` | Postgres Backup | zstd:3 | pg_dump --compress value for the custom-format dumps (zstd:3, gzip:6, lz4, none). |
| `BACKUP_S3_ENDPOINT` | Postgres Backup | - | Bucket S3 endpoint. |
| `BACKUP_WAIT_SECONDS` | Postgres Backup | 300 | How long a run waits for Postgres to accept connections before failing. |
| `BACKUP_RETENTION_DAYS` | Postgres Backup | 14 | Delete complete runs older than this many days. |
| `BACKUP_S3_ACCESS_KEY_ID` | Postgres Backup | - | Bucket access key. |
| `BACKUP_S3_FORCE_PATH_STYLE` | Postgres Backup | false | Keep false: Railway Buckets use virtual-hosted-style URLs. true only for buckets whose Credentials tab says path-style. |
| `BACKUP_S3_SECRET_ACCESS_KEY` | Postgres Backup | (secret) | Bucket secret key. |
| `DB_HOST` | PgBouncer | - | Postgres private hostname that PgBouncer forwards to. |
| `DB_PORT` | PgBouncer | - | Postgres port. |
| `DB_USER` | PgBouncer | (secret) | Postgres superuser; written to PgBouncer's userlist and used as auth_user, so other roles can log in through the pool too. |
| `AUTH_TYPE` | PgBouncer | scram-sha-256 | Client authentication; matches Postgres' SCRAM password encryption. |
| `POOL_MODE` | PgBouncer | transaction | transaction = a server connection per transaction (best multiplexing). Use session for apps that need session state. |
| `ADMIN_USERS` | PgBouncer | - | Users allowed to run SHOW POOLS / SHOW STATS on the pgbouncer admin database. |
| `DB_PASSWORD` | PgBouncer | (secret) | Password of that user (kept in sync by reference). |
| `LISTEN_ADDR` | PgBouncer | * | Listen on all IPv4 and IPv6 addresses (Railway's private network can be IPv6-only). |
| `LISTEN_PORT` | PgBouncer | 6432 | PgBouncer port on the private network. |
| `MAX_CLIENT_CONN` | PgBouncer | 1000 | Maximum client connections to PgBouncer. |
| `DATABASE_POOL_URL` | PgBouncer | - | Pooled connection string for your apps (also exposed on the Postgres service). No TLS: it stays on the private network. |
| `DEFAULT_POOL_SIZE` | PgBouncer | 20 | Server connections per database/user pair; keep the total under Postgres max_connections (500 on Railway's image). |
| `MAX_PREPARED_STATEMENTS` | PgBouncer | 200 | Protocol-level prepared statements tracked per connection, so drivers that prepare statements work in transaction mode. 0 disables. |

## Configuration

- **Start command:** `/usr/bin/tini -g -- /bin/bash -c 'set -e; D="${PGDATA%/}"; F="$D/pgvector-tuning.conf"; C="$D/postgresql.conf"; I=/docker-entrypoint-initdb.d; X=/tmp/pgvector-tuning.conf; echo "CREATE EXTENSION IF NOT EXISTS vector; CREATE EXTENSION IF NOT EXISTS pg_stat_statements;" > $I/zz-pgvector-extensions.sql; k() { v=$1; if [ $v -lt $2 ]; then v=$2; fi; if [ $v -gt $3 ]; then v=$3; fi; echo $v; }; n() { case "$1" in ""|*[!0-9]*) echo $2 ;; *) echo $1 ;; esac; }; w() { echo "$1 = $2" >> $X; }; if [ "${PGVECTOR_TUNING:-auto}" = off ]; then rm -f $F $I/zz-pgvector-conf.sh; echo "pgvector-tune: PGVECTOR_TUNING=off, Postgres defaults apply"; else H=$(( $(n "$(grep -m 1 MemTotal /proc/meminfo | tr -s " " | cut -d " " -f 2)" 1048576) / 1024 )); M=$(( $(n "$(cat /sys/fs/cgroup/memory.max 2>/dev/null)" $((H * 1048576))) / 1048576 )); if [ $M -gt $H ]; then M=$H; fi; B=$(k $(n "$PG_MEMORY_LIMIT_MB" $(k $M 256 8192)) 256 4194304); N=$(nproc); read -r Q P 2>/dev/null < /sys/fs/cgroup/cpu.max || Q=max; case "$Q" in ""|*[!0-9]*) ;; *) N=$(k $(( (Q + P - 1) / P )) 1 $N) ;; esac; N=$(k $(n "$PG_CPU_LIMIT" $(k $N 1 8)) 1 256); S=$(( $(n "$(df -Pk /dev/shm 2>/dev/null | tail -n 1 | tr -s " " | cut -d " " -f 2)" 65536) / 1024 )); SB=$(k $((B / 4)) 128 1048576); MW=$(k $((B / 4)) 64 2048); PM=$(k $((N - 1)) 0 4); PW=$(k $N 2 256); PG=$(k $((N / 2)) 0 2); FIT=$((S * 3 / 4)); if [ $FIT -lt 128 ]; then PM=0; fi; if [ $PM -gt 0 ]; then MW=$(k $MW 64 $FIT); fi; if [ $S -lt 256 ]; then PG=0; fi; echo "# pgvector template: rewritten at every boot from budget ${B}MB (container ${M}MB), ${N} cpus, /dev/shm ${S}MB; ALTER SYSTEM overrides it" > $X; w shared_buffers ${SB}MB; w effective_cache_size $((B * 3 / 4))MB; w maintenance_work_mem ${MW}MB; w autovacuum_work_mem $(k $((B / 16)) 64 $MW)MB; w work_mem $(k $((B / 512)) 4 64)MB; w max_worker_processes $(k $((PW + 4)) 8 512); w max_parallel_workers $PW; w max_parallel_workers_per_gather $PG; w max_parallel_maintenance_workers $PM; w random_page_cost 1.1; w effective_io_concurrency 200; w track_io_timing on; chmod 644 $X; if [ -f $D/PG_VERSION ] && [ -f $C ]; then install -o postgres -g postgres -m 600 $X $F; grep -qsF "include_if_exists = pgvector-tuning.conf" $C || echo "include_if_exists = pgvector-tuning.conf" >> $C; sync $F $C 2>/dev/null || true; else echo "cp $X $F && chmod 600 $F && { grep -qsF pgvector-tuning.conf $C || echo include_if_exists = pgvector-tuning.conf >> $C; }" > $I/zz-pgvector-conf.sh; fi; echo "pgvector-tune: $(paste -sd " " $X)"; fi; exec /usr/local/bin/wrapper.sh "$@"' pgvector-start postgres -p 5432 -c listen_addresses=*`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Tags:** postgres, postgresql, pgvector, vector-database, embeddings · **Languages:** Shell, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/postgres-18-pgvector-vector-database)
