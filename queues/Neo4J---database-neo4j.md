# Deploy Neo4J on Railway

Graph database for storing and querying connected data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/database-neo4j)

## About

Neo4j is a native graph database. It stores nodes and the relationships between them as first-class records, so traversing a connection is a pointer hop rather than a join. That suits anything where the shape of the connections *is* the data: recommendation engines, fraud rings, identity graphs, and the knowledge graphs behind GraphRAG systems. Queries use Cypher, a pattern language where `(:Person)-[:WORKS_ON]-&gt;(:Project)` means what it looks like. Community Edition is open source under GPL-3.0.

Self-host Neo4j here with a persistent volume, memory tuning that adapts to whatever plan you put it on, and the APOC procedure library preloaded. Two services deploy: **Neo4j** itself, and a small **Gateway** built on Caddy that owns the public domain. Neo4j speaks on two ports — 7474 for the query workspace and HTTP Query API, 7687 for Bolt — and a Railway domain maps to one port, so the gateway splits traffic by protocol: WebSocket upgrades reach Bolt, everything else the UI. One HTTPS URL covers both, and a TCP proxy exposes raw Bolt to drivers outside Railway.

![Diagram of the Neo4j and Caddy gateway services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787299386/neo4j-architecture.png)

Self-hosting Neo4j makes sense when the graph holds data you would rather keep off a managed cloud, when you want it beside the app querying it, or when an instance priced by memory footprint stops paying for itself.

- **Cypher** — a declarative pattern-matching query language, now standardised as GQL
- **Index-free adjacency** — traversal cost does not grow with database size
- **ACID transactions** — full guarantees, not eventual consistency
- **APOC** — 450+ procedures for algorithms, import, refactoring and schema introspection
- **HTTP Query API** — run Cypher over HTTPS from any language, no driver
- **Drivers** — Python, JavaScript, Java, .NET and Go, plus LangChain and LlamaIndex

**Neo4j** is the database: store, transaction logs and credentials live on the volume at `/data`, and it listens on 7474 and 7687 inside the private network only. **Gateway** is the Caddy proxy holding the public domain, and it pins the forwarded host and protocol headers so the addresses Neo4j advertises cannot be spoofed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Neo4j | `neo4j:2026` | Database |
| Gateway | `caddy:2-alpine` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Neo4j | 7474 | Health check target port |
| `BOLT_URL` | Neo4j | - | Private Bolt connection string |
| `NEO4J_AUTH` | Neo4j | - | Initial credentials, empty store only |
| `BOLT_PASSWORD` | Neo4j | (secret) | Password for the neo4j user |
| `BOLT_USERNAME` | Neo4j | (secret) | Database username for consumers |
| `NEO4J_PLUGINS` | Neo4j | ["apoc"] | Loads bundled APOC Core library |
| `QUERY_API_URL` | Neo4j | - | Cypher HTTP API endpoint |
| `NEO4J_server_bolt_advertised__address` | Neo4j | - | Bolt address given to clients |
| `PORT` | Gateway | 8080 | Caddy listening port |
| `NEO4J_HOST` | Gateway | - | Private hostname of Neo4j service |

## Configuration

- **Start command:** `/bin/sh -c 'M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || cat /sys/fs/cgroup/memory/memory.limit_in_bytes 2>/dev/null || echo max); case "$M" in ""|*[!0-9]*) M=8589934592;; esac; MB=$((M/1048576)); [ "$MB" -gt 131072 ] && MB=131072; H=$((MB*35/100)); P=$((MB*30/100)); [ "$H" -lt 512 ] && H=512; [ "$H" -gt 31744 ] && H=31744; [ "$P" -lt 256 ] && P=256; export NEO4J_server_memory_heap_initial__size="${H}m"; export NEO4J_server_memory_heap_max__size="${H}m"; export NEO4J_server_memory_pagecache_size="${P}m"; echo "railway: cgroup ${MB}MB -> heap ${H}m pagecache ${P}m"; exec tini -s -g -- /startup/docker-entrypoint.sh neo4j'`
- **Healthcheck:** `/`
- **TCP Proxies:** 7687
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'H="$NEO4J_HOST"; case "$H" in ""|:*) H=neo4j.railway.internal;; esac; P="${PORT:-8080}"; printf "%s\n" "{" "admin off" "auto_https off" "servers {" "trusted_proxies static 100.64.0.0/10 fd00::/8" "}" "}" "" ":$P {" "handle /healthz {" "respond 200" "}" "@ws header Upgrade *ebsocket*" "handle @ws {" "reverse_proxy $H:7687" "}" "handle {" "reverse_proxy $H:7474 {" "header_up X-Forwarded-Host {host}" "header_up X-Forwarded-Proto https" "}" "}" "}" > /etc/caddy/Caddyfile; caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile; exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Queues

[View on Railway →](https://railway.com/deploy/database-neo4j)
