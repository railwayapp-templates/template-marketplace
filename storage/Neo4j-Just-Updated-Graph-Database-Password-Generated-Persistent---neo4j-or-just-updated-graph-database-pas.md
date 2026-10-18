# Deploy Neo4j | (Just Updated) Graph Database, Password Generated, Persistent on Railway

Neo4j graph DB with generated password, Query API and volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/neo4j-or-just-updated-graph-database-pas)

## About

Neo4j is the most widely used open-source graph database. It stores data as nodes and relationships and is queried with Cypher. This template runs Neo4j Community with a persistent volume, a generated password, and a public HTTPS endpoint for the Query API.

This template runs the official `neo4j` image (pinned by digest). Data lives on a volume mounted at `/data`, so graphs survive redeploys. Authentication is enabled at boot: the username is `neo4j` and the password is the `GRAPH_PASSWORD` variable, generated for you at deploy time. The HTTP port is bound to Railway's `$PORT`; Bolt listens on 7687 inside the project network and is published to your other services as `GRAPH_BOLT_URL`. The JVM is capped to the container (heap and page cache sized explicitly, `ActiveProcessorCount=2`) so it does not read the host's resources.

Agent contract:

- Base URL: `https://`
- Username: `neo4j`
- Password variable: `GRAPH_PASSWORD`
- Bolt URL variable (private network): `GRAPH_BOLT_URL`
- Health path: `/`
- Query endpoint: `POST /db/neo4j/query/v2` (HTTP basic auth)

```bash
curl -s -u neo4j:$GRAPH_PASSWORD -X POST https:///db/neo4j/query/v2 \
  -H 'content-type: application/json' \
  -d '{"statement":"CREATE (n:Note {text:\"hello\"}) RETURN n.text AS text"}'
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| neo4j | `neo4j@sha256:0a6e7aedf54a531f76286032d4365ead65b11cca05e4a15cdf23b8e53d6db02b` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `GRAPH_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'export NEO4J_AUTH="neo4j/$GRAPH_PASSWORD" NEO4J_ACCEPT_LICENSE_AGREEMENT=no NEO4J_server_http_listen__address="0.0.0.0:$PORT" NEO4J_server_bolt_listen__address=0.0.0.0:7687 NEO4J_server_memory_heap_initial__size=512m NEO4J_server_memory_heap_max__size=1g NEO4J_server_memory_pagecache_size=512m JAVA_TOOL_OPTIONS=-XX:ActiveProcessorCount=2; echo "neo4j uid=$(id -u) data_owner=$(stat -c %u:%g /data) pids.max=$(cat /sys/fs/cgroup/pids.max 2>/dev/null)"; exec /startup/docker-entrypoint.sh neo4j'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/neo4j-or-just-updated-graph-database-pas)
