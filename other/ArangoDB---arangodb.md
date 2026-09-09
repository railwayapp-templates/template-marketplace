# Deploy ArangoDB on Railway

Graph database, document store, full-text search, one AQL query language

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/arangodb)

## About

ArangoDB is a multi-model database: documents, graphs and key-value pairs live in one storage engine, queried with one language, AQL. A single query can filter JSON documents, walk a graph several hops deep and join the two results — work that otherwise needs a document store and a separate graph database wired together in application code. Teams use it for knowledge graphs, recommendation engines, fraud detection and permission models.

This template lets you deploy ArangoDB on Railway as a real cluster, not a single container. Eight services come up pre-wired: `agent1`, `agent2` and `agent3` form the RAFT agency holding cluster configuration, `dbserver1` and `dbserver2` store the shards and replicate to each other, `coordinator1` and `coordinator2` answer AQL queries and serve the web interface, and a Caddy `gateway` puts one public HTTPS URL in front of both coordinators. Each ArangoDB service has its own volume; only the gateway is reachable from the internet, and it needs authentication.

![Diagram of the ArangoDB cluster services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788848802/arangodb-architecture.png)

Self-hosting ArangoDB makes sense when your data is graph-shaped but your workload is not purely graph — a catalogue with recommendation edges, permissions layered over user documents, a supply chain where both parts and routes are queried. It also keeps the data in your own infrastructure.

Key capabilities:

- **AQL**, one declarative language across documents, graphs and key-value access, with joins and multi-hop traversals in a single statement
- **Named graphs** with a visual browser, shortest-path, k-paths and pattern matching
- **ArangoSearch**, full-text search and BM25/TF-IDF ranking in the same engine
- **Sharding** with synchronous replication and automatic failover
- Official drivers for JavaScript, Java, Python, Go, PHP, Rust and .NET

The cluster splits into three roles. The **agency** is a small RAFT-replicated store holding the cluster plan — which shard lives where, which server is healthy. Three agents give it a quorum, so one can be redeployed without stopping writes. **DB-Servers** hold the shards; at a replication factor of two every shard has a leader on one and a follower on the other, and a failure promotes the follower. **Coordinators** hold no data — they parse AQL, fan work to the DB-Servers and merge results, so two behind the gateway spread load and survive a redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dbserver1 | `arangodb:3.12` | Database |
| gateway | `caddy:2-alpine` | Web service |
| agent3 | `arangodb:3.12` | Database |
| coordinator1 | `arangodb:3.12` | Database |
| dbserver2 | `arangodb:3.12` | Database |
| agent2 | `arangodb:3.12` | Database |
| coordinator2 | `arangodb:3.12` | Database |
| agent1 | `arangodb:3.12` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | dbserver1 | 8530 | DB-Server listener port |
| `AGENCY_EP1` | dbserver1 | - | Agency member 1 |
| `AGENCY_EP2` | dbserver1 | - | Agency member 2 |
| `AGENCY_EP3` | dbserver1 | - | Agency member 3 |
| `ARANGO_DATA_DIR` | dbserver1 | /var/lib/arangodb3/dbserver | Shard data directory on the volume |
| `ARANGO_JWT_SECRET` | dbserver1 | (secret) | Cluster-wide inter-node JWT secret |
| `ARANGO_MY_ADDRESS` | dbserver1 | tcp://dbserver1.railway.internal:8530 | Address this DB-Server advertises |
| `SKIP_DATABASE_INIT` | dbserver1 | 1 | Skip the image's single-instance init |
| `PORT` | gateway | 8080 | Public HTTP listener port |
| `CADDY_CONFIG` | gateway | {"apps":{"http":{"servers":{"srv0":{"listen":[":{env.PORT}"],"trusted_proxies":{"source":"static","ranges":["100.64.0.0/10","fd00::/8","152.233.0.0/17"]},"routes":[{"match":[{"path":["/healthz"]}],"handle":[{"handler":"static_response","status_code":200,"body":"ok"}]},{"handle":[{"handler":"reverse_proxy","upstreams":[{"dial":"coordinator1.railway.internal:8529"},{"dial":"coordinator2.railway.internal:8529"}],"load_balancing":{"selection_policy":{"policy":"round_robin"},"try_duration":"10s","try_interval":"500ms"},"health_checks":{"passive":{"fail_duration":"10s","max_fails":2,"unhealthy_status":[502,503]}}}]}]}}}}} | Round-robin load balancer over both coordinators |
| `COORDINATOR1_ENDPOINT` | gateway | - | First coordinator upstream |
| `COORDINATOR2_ENDPOINT` | gateway | - | Second coordinator upstream |
| `PORT` | agent3 | 8531 | Agency listener port |
| `AGENCY_EP1` | agent3 | - | Agency member 1 |
| `AGENCY_EP2` | agent3 | - | Agency member 2 |
| `AGENCY_EP3` | agent3 | tcp://agent3.railway.internal:8531 | Agency member 3 |
| `ARANGO_DATA_DIR` | agent3 | /var/lib/arangodb3/agent | Agency data directory on the volume |
| `ARANGO_JWT_SECRET` | agent3 | (secret) | Cluster-wide inter-node JWT secret |
| `ARANGO_MY_ADDRESS` | agent3 | tcp://agent3.railway.internal:8531 | Address this agent advertises |
| `SKIP_DATABASE_INIT` | agent3 | 1 | Skip the image's single-instance init |
| `PORT` | coordinator1 | 8529 | Coordinator listener port |
| `AGENCY_EP1` | coordinator1 | - | Agency member 1 |
| `AGENCY_EP2` | coordinator1 | - | Agency member 2 |
| `AGENCY_EP3` | coordinator1 | - | Agency member 3 |
| `ARANGO_DATA_DIR` | coordinator1 | /var/lib/arangodb3/coordinator | Coordinator data directory on the volume |
| `ARANGO_JWT_SECRET` | coordinator1 | (secret) | Cluster-wide inter-node JWT secret |
| `ARANGO_MY_ADDRESS` | coordinator1 | tcp://coordinator1.railway.internal:8529 | Address this coordinator advertises |
| `SKIP_DATABASE_INIT` | coordinator1 | 1 | Skip the image's single-instance init |
| `ARANGODB_DEFAULT_ROOT_PASSWORD` | coordinator1 | (secret) | root password, applied at cluster bootstrap |
| `PORT` | dbserver2 | 8530 | DB-Server listener port |
| `AGENCY_EP1` | dbserver2 | - | Agency member 1 |
| `AGENCY_EP2` | dbserver2 | - | Agency member 2 |
| `AGENCY_EP3` | dbserver2 | - | Agency member 3 |
| `ARANGO_DATA_DIR` | dbserver2 | /var/lib/arangodb3/dbserver | Shard data directory on the volume |
| `ARANGO_JWT_SECRET` | dbserver2 | (secret) | Cluster-wide inter-node JWT secret |
| `ARANGO_MY_ADDRESS` | dbserver2 | tcp://dbserver2.railway.internal:8530 | Address this DB-Server advertises |
| `SKIP_DATABASE_INIT` | dbserver2 | 1 | Skip the image's single-instance init |
| `PORT` | agent2 | 8531 | Agency listener port |
| `AGENCY_EP1` | agent2 | - | Agency member 1 |
| `AGENCY_EP2` | agent2 | tcp://agent2.railway.internal:8531 | Agency member 2 |
| `AGENCY_EP3` | agent2 | - | Agency member 3 |
| `ARANGO_DATA_DIR` | agent2 | /var/lib/arangodb3/agent | Agency data directory on the volume |
| `ARANGO_JWT_SECRET` | agent2 | (secret) | Cluster-wide inter-node JWT secret |
| `ARANGO_MY_ADDRESS` | agent2 | tcp://agent2.railway.internal:8531 | Address this agent advertises |
| `SKIP_DATABASE_INIT` | agent2 | 1 | Skip the image's single-instance init |
| `PORT` | coordinator2 | 8529 | Coordinator listener port |
| `AGENCY_EP1` | coordinator2 | - | Agency member 1 |
| `AGENCY_EP2` | coordinator2 | - | Agency member 2 |
| `AGENCY_EP3` | coordinator2 | - | Agency member 3 |
| `ARANGO_DATA_DIR` | coordinator2 | /var/lib/arangodb3/coordinator | Coordinator data directory on the volume |
| `ARANGO_JWT_SECRET` | coordinator2 | (secret) | Cluster-wide inter-node JWT secret |
| `ARANGO_MY_ADDRESS` | coordinator2 | tcp://coordinator2.railway.internal:8529 | Address this coordinator advertises |
| `SKIP_DATABASE_INIT` | coordinator2 | 1 | Skip the image's single-instance init |
| `ARANGODB_DEFAULT_ROOT_PASSWORD` | coordinator2 | (secret) | Same root password as coordinator1 |
| `PORT` | agent1 | 8531 | Agency listener port |
| `AGENCY_EP1` | agent1 | tcp://agent1.railway.internal:8531 | Agency member 1 |
| `AGENCY_EP2` | agent1 | - | Agency member 2 |
| `AGENCY_EP3` | agent1 | - | Agency member 3 |
| `ARANGO_DATA_DIR` | agent1 | /var/lib/arangodb3/agent | Agency data directory on the volume |
| `ARANGO_JWT_SECRET` | agent1 | (secret) | Cluster-wide inter-node JWT secret |
| `ARANGO_MY_ADDRESS` | agent1 | tcp://agent1.railway.internal:8531 | Address this agent advertises |
| `SKIP_DATABASE_INIT` | agent1 | 1 | Skip the image's single-instance init |

## Configuration

- **Start command:** `/bin/sh -c 'umask 077; printf %s "$ARANGO_JWT_SECRET" > /tmp/arangodb.jwt; mkdir -p "$ARANGO_DATA_DIR"; M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); case "$M" in ""|max) : ;; *) export ARANGODB_OVERRIDE_DETECTED_TOTAL_MEMORY="$M";; esac; set -- $(cat /sys/fs/cgroup/cpu.max 2>/dev/null || echo max 1); case "$1" in ""|max) : ;; *) C=$(( $1 / $2 )); [ "$C" -lt 1 ] && C=1; export ARANGODB_OVERRIDE_DETECTED_NUMBER_OF_CORES="$C";; esac; exec /entrypoint.sh arangod --cluster.my-role PRIMARY --cluster.my-address "$ARANGO_MY_ADDRESS" --cluster.agency-endpoint "$AGENCY_EP1" --cluster.agency-endpoint "$AGENCY_EP2" --cluster.agency-endpoint "$AGENCY_EP3" --server.endpoint "tcp://[::]:$PORT" --server.jwt-secret-keyfile /tmp/arangodb.jwt --database.directory "$ARANGO_DATA_DIR"'`
- **Healthcheck:** `/_admin/server/availability`
- **Volume:** `/var/lib/arangodb3`
- **Start command:** `/bin/sh -c 'printf %s "$CADDY_CONFIG" > /etc/caddy/config.json; caddy validate --config /etc/caddy/config.json || exit 1; exec caddy run --config /etc/caddy/config.json'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'umask 077; printf %s "$ARANGO_JWT_SECRET" > /tmp/arangodb.jwt; mkdir -p "$ARANGO_DATA_DIR"; M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); case "$M" in ""|max) : ;; *) export ARANGODB_OVERRIDE_DETECTED_TOTAL_MEMORY="$M";; esac; set -- $(cat /sys/fs/cgroup/cpu.max 2>/dev/null || echo max 1); case "$1" in ""|max) : ;; *) C=$(( $1 / $2 )); [ "$C" -lt 1 ] && C=1; export ARANGODB_OVERRIDE_DETECTED_NUMBER_OF_CORES="$C";; esac; exec /entrypoint.sh arangod --agency.activate true --agency.size 3 --agency.endpoint "$AGENCY_EP1" --agency.endpoint "$AGENCY_EP2" --agency.endpoint "$AGENCY_EP3" --agency.my-address "$ARANGO_MY_ADDRESS" --agency.supervision true --server.endpoint "tcp://[::]:$PORT" --server.jwt-secret-keyfile /tmp/arangodb.jwt --database.directory "$ARANGO_DATA_DIR"'`
- **Start command:** `/bin/sh -c 'umask 077; printf %s "$ARANGO_JWT_SECRET" > /tmp/arangodb.jwt; mkdir -p "$ARANGO_DATA_DIR"; M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); case "$M" in ""|max) : ;; *) export ARANGODB_OVERRIDE_DETECTED_TOTAL_MEMORY="$M";; esac; set -- $(cat /sys/fs/cgroup/cpu.max 2>/dev/null || echo max 1); case "$1" in ""|max) : ;; *) C=$(( $1 / $2 )); [ "$C" -lt 1 ] && C=1; export ARANGODB_OVERRIDE_DETECTED_NUMBER_OF_CORES="$C";; esac; exec /entrypoint.sh arangod --cluster.my-role COORDINATOR --cluster.my-address "$ARANGO_MY_ADDRESS" --cluster.agency-endpoint "$AGENCY_EP1" --cluster.agency-endpoint "$AGENCY_EP2" --cluster.agency-endpoint "$AGENCY_EP3" --server.endpoint "tcp://[::]:$PORT" --server.jwt-secret-keyfile /tmp/arangodb.jwt --database.directory "$ARANGO_DATA_DIR"'`

**Category:** Other

[View on Railway →](https://railway.com/deploy/arangodb)
