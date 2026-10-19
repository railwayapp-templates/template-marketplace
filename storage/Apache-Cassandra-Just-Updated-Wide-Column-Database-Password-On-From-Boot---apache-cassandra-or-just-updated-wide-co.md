# Deploy Apache Cassandra | (Just Updated) Wide-Column Database, Password On From Boot on Railway

Wide-column NoSQL database. Password on from boot, data on a volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apache-cassandra-or-just-updated-wide-co)

## About

Apache Cassandra is a distributed wide-column NoSQL database built for high write throughput and linear scale. It is queried with CQL. This template runs a single Cassandra 5.0 node with a persistent volume, password authentication switched on from the first boot, and a public TCP endpoint for CQL clients.

This template runs the official `cassandra` image (pinned by digest). Data lives on a volume mounted at `/var/lib/cassandra`, so keyspaces survive redeploys. `PasswordAuthenticator` and `CassandraAuthorizer` are enabled at boot, and the default `cassandra/cassandra` login is replaced with the generated `CASSANDRA_PASSWORD` within seconds of the node accepting connections. The JVM is capped to the container (1 GB heap, `ActiveProcessorCount=2`) so it does not size itself from the host's cores. Allow roughly a minute on first boot before CQL answers.

Agent contract:

- CQL host (public): `CASSANDRA_PUBLIC_HOST`, port `CASSANDRA_PUBLIC_PORT` (TCP proxy to 9042)
- CQL host (private network): `CASSANDRA_PRIVATE_HOST`, port `9042`
- Username: `cassandra`
- Password variable: `CASSANDRA_PASSWORD`
- No HTTP health path; check readiness by a CQL login

```bash
docker run --rm --entrypoint cqlsh cassandra:5.0 $CASSANDRA_PUBLIC_HOST $CASSANDRA_PUBLIC_PORT \
  -u cassandra -p "$CASSANDRA_PASSWORD" \
  -e "CREATE KEYSPACE IF NOT EXISTS app WITH replication = {'class':'SimpleStrategy','replication_factor':1}; DESCRIBE KEYSPACES;"
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cassandra | `cassandra:5.0@sha256:8870ec4d9608abe9160a7d09b51a0f0c13c6a95ea0610266ea58eb7d30a144de` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `CASSANDRA_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'set -e; export MAX_HEAP_SIZE=1G HEAP_NEWSIZE=256M JVM_EXTRA_OPTS=-XX:ActiveProcessorCount=2; Y=/etc/cassandra/cassandra.yaml; sed -i -E "s/^authenticator:.*/authenticator: PasswordAuthenticator/; s/^authorizer:.*/authorizer: CassandraAuthorizer/" $Y; echo "[railway] cassandra uid=$(id -u) data_owner=$(stat -c %u:%g /var/lib/cassandra) pids.max=$(cat /sys/fs/cgroup/pids.max 2>/dev/null)"; SQ=$(printf "\047"); ( for i in $(seq 1 180); do if cqlsh -u cassandra -p "$CASSANDRA_PASSWORD" -e "SELECT now() FROM system.local" >/dev/null 2>&1; then echo "[railway] password active"; break; fi; if cqlsh -u cassandra -p cassandra -e "ALTER ROLE cassandra WITH PASSWORD = ${SQ}${CASSANDRA_PASSWORD}${SQ}" >/dev/null 2>&1; then echo "[railway] default password replaced"; break; fi; sleep 5; done ) & exec docker-entrypoint.sh cassandra -f'`
- **TCP Proxies:** 9042
- **Volume:** `/var/lib/cassandra`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/apache-cassandra-or-just-updated-wide-co)
