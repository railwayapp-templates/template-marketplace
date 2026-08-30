# Deploy Citus on Railway

Distributed PostgreSQL for scalable apps, sharding, and parallel queries.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/citus)

## About

Citus is an open-source PostgreSQL extension that transforms PostgreSQL into a distributed database. It enables horizontal scaling through sharding, parallel query execution, and distributed tables while preserving the familiar PostgreSQL ecosystem, SQL syntax, drivers, and tooling.

Hosting Citus on Railway lets you run a distributed PostgreSQL cluster without manually provisioning multiple servers.

This template uses a coordinator and three worker nodes. The coordinator acts as the main PostgreSQL entry point and manages distributed metadata, while the worker nodes store distributed table shards and execute queries in parallel.

Each node uses persistent storage, and internal cluster communication runs through Railway's private network. Only the coordinator needs to be exposed to external PostgreSQL clients.

This architecture is suitable for applications that have outgrown a single PostgreSQL instance and need horizontal scaling while retaining PostgreSQL compatibility.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| citus-coordinator | `citusdata/citus:14.1.0` | Database |
| citus-worker-3 | `citusdata/citus:14.1.0` | Database |
| citus-worker-1 | `citusdata/citus:14.1.0` | Database |
| citus-worker-2 | `citusdata/citus:14.1.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | citus-coordinator | 5432 | PostgreSQL listening port |
| `POSTGRES_DB` | citus-coordinator | postgres | Initial PostgreSQL database |
| `POSTGRES_USER` | citus-coordinator | (secret) | PostgreSQL administrator user |
| `POSTGRES_PASSWORD` | citus-coordinator | (secret) | Shared password for the whole Citus cluster |
| `PORT` | citus-worker-3 | 5432 | PostgreSQL port |
| `POSTGRES_DB` | citus-worker-3 | - | Shared initial database |
| `POSTGRES_USER` | citus-worker-3 | (secret) | Shared PostgreSQL user |
| `POSTGRES_PASSWORD` | citus-worker-3 | (secret) | Shared cluster password |
| `PORT` | citus-worker-1 | 5432 | PostgreSQL port |
| `POSTGRES_DB` | citus-worker-1 | - | Shared initial database |
| `POSTGRES_USER` | citus-worker-1 | (secret) | Shared PostgreSQL user |
| `POSTGRES_PASSWORD` | citus-worker-1 | (secret) | Shared cluster password |
| `PORT` | citus-worker-2 | 5432 | PostgreSQL port |
| `POSTGRES_DB` | citus-worker-2 | - | Shared initial database |
| `POSTGRES_USER` | citus-worker-2 | (secret) | Shared PostgreSQL user |
| `POSTGRES_PASSWORD` | citus-worker-2 | (secret) | Shared cluster password |

## Configuration

- **Start command:** `/bin/bash -c 'export PATH="/usr/lib/postgresql/18/bin:$PATH"; docker-entrypoint.sh postgres & PG_PID=$!; until pg_isready -h 127.0.0.1 -p 5432 -U "$POSTGRES_USER"; do sleep 2; done; until pg_isready -h citus-worker-1.railway.internal -p 5432 -U "$POSTGRES_USER"; do sleep 2; done; until pg_isready -h citus-worker-2.railway.internal -p 5432 -U "$POSTGRES_USER"; do sleep 2; done; until pg_isready -h citus-worker-3.railway.internal -p 5432 -U "$POSTGRES_USER"; do sleep 2; done; psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "CREATE EXTENSION IF NOT EXISTS citus;" -c "SELECT citus_set_coordinator_host(\$\$citus-coordinator.railway.internal\$\$, 5432);" -c "SELECT citus_add_node(\$\$citus-worker-1.railway.internal\$\$, 5432) WHERE NOT EXISTS (SELECT 1 FROM pg_dist_node WHERE nodename = \$\$citus-worker-1.railway.internal\$\$ AND nodeport = 5432);" -c "SELECT citus_add_node(\$\$citus-worker-2.railway.internal\$\$, 5432) WHERE NOT EXISTS (SELECT 1 FROM pg_dist_node WHERE nodename = \$\$citus-worker-2.railway.internal\$\$ AND nodeport = 5432);" -c "SELECT citus_add_node(\$\$citus-worker-3.railway.internal\$\$, 5432) WHERE NOT EXISTS (SELECT 1 FROM pg_dist_node WHERE nodename = \$\$citus-worker-3.railway.internal\$\$ AND nodeport = 5432);"; wait "$PG_PID"'`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/citus)
