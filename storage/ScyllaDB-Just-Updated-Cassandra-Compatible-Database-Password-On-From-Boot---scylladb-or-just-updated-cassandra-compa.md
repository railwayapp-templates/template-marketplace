# Deploy ScyllaDB | (Just Updated) Cassandra-Compatible Database, Password On From Boot on Railway

Cassandra-compatible database. Password on from boot, data on a volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/scylladb-or-just-updated-cassandra-compa)

## About

ScyllaDB is a Cassandra-compatible NoSQL database written in C++ for low-latency, high-throughput workloads. It is queried with CQL and works with standard Cassandra drivers. This template runs a single ScyllaDB 2025.1 node with a persistent volume, password authentication switched on from the first boot, and a public TCP endpoint for CQL clients.

This template runs the official `scylladb/scylla` image (pinned by digest). Data lives on a volume mounted at `/var/lib/scylla`, so keyspaces survive redeploys. `PasswordAuthenticator` and `CassandraAuthorizer` are enabled at boot, and the default `cassandra/cassandra` login is replaced with the generated `SCYLLA_PASSWORD` within seconds of the node accepting connections. The node is capped to 2 shards and 1.5 GB of memory (`--smp 2 --memory 1536M`) so it does not size itself from the host's cores or RAM. The listen addresses are pinned to the container's single IPv4 address, which avoids the image's dual-address startup crash. Allow a minute or two on first boot before CQL answers.

Agent contract:

- CQL host (public): `SCYLLA_PUBLIC_HOST`, port `SCYLLA_PUBLIC_PORT` (TCP proxy to 9042)
- CQL host (private network): `SCYLLA_PRIVATE_HOST`, port `9042`
- Username: `cassandra`
- Password variable: `SCYLLA_PASSWORD`
- No HTTP health path; check readiness by a CQL login

```bash
docker run --rm --entrypoint cqlsh scylladb/scylla:2025.1 $SCYLLA_PUBLIC_HOST $SCYLLA_PUBLIC_PORT \
  -u cassandra -p "$SCYLLA_PASSWORD" \
  -e "CREATE KEYSPACE IF NOT EXISTS app WITH replication = {'class':'SimpleStrategy','replication_factor':1}; DESCRIBE KEYSPACES;"
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| scylladb | `scylladb/scylla:2025.1@sha256:9eb53463bfed32356e1ba81eb6d9c606ffaa520ed804cc03b17713f4b4e7d84b` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SCYLLA_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'echo "[railway] scylla uid=$(id -u) data_owner=$(stat -c %u:%g /var/lib/scylla) pids.max=$(cat /sys/fs/cgroup/pids.max 2>/dev/null) mem.max=$(cat /sys/fs/cgroup/memory.max 2>/dev/null)"; IP=$(hostname -i | tr " " "\\n" | grep -E "^[0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+$" | head -1); echo "[railway] ip=$IP"; SQ=$(printf "\047"); ( for i in $(seq 1 180); do if cqlsh -u cassandra -p "$SCYLLA_PASSWORD" -e "SELECT now() FROM system.local" >/dev/null 2>&1; then echo "[railway] password active"; break; fi; if cqlsh -u cassandra -p cassandra -e "ALTER ROLE cassandra WITH PASSWORD = ${SQ}${SCYLLA_PASSWORD}${SQ}" >/dev/null 2>&1; then echo "[railway] default password replaced"; break; fi; sleep 5; done ) & exec /docker-entrypoint.py --listen-address "$IP" --rpc-address "$IP" --broadcast-address "$IP" --broadcast-rpc-address "$IP" --seeds "$IP" --smp 2 --memory 1536M --overprovisioned 1 --developer-mode 1 --authenticator PasswordAuthenticator --authorizer CassandraAuthorizer'`
- **TCP Proxies:** 9042
- **Volume:** `/var/lib/scylla`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/scylladb-or-just-updated-cassandra-compa)
