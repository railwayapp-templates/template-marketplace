# Deploy Neo4j | Open Source Graph Database with Cypher on Railway

Graph database with Cypher, APOC plugins and external Bolt access

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/neo4j-or-open-source-graph-database-with)

## About

Neo4j is the world's most widely adopted graph database, storing data as nodes and relationships so connected queries stay fast no matter how deep they go.

This template runs the official `neo4j:5.26.29-community` image — the current LTS release — with no custom build in between, so you get upstream Neo4j and upstream security updates. The APOC procedure library is installed on boot, the database lives on a persistent Railway volume mounted at `/data`, and the JVM heap and page cache are pinned so the container behaves predictably inside its memory limit instead of guessing from the cgroup.

Both ways in are wired up: Neo4j Browser is served over your public Railway domain on port 7474, and the Bolt protocol is exposed through a Railway TCP proxy on 7687. The advertised addresses are set to those endpoints, so Browser connects to your actual database and any Bolt driver — Python, JavaScript, Go, Java — connects from outside the project without extra configuration. A random password is generated at deploy time; nothing ships with a default credential.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Neo4j | `neo4j:5.26.29-community` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NEO4J_AUTH` | - | Initial credentials as user/password. Generated on deploy; change it later with ALTER CURRENT USER SET PASSWORD. |
| `NEO4J_PLUGINS` | ["apoc"] | Plugins installed on first boot. APOC is the standard procedure library. |
| `NEO4J_server_memory_heap_max__size` | 512m | JVM heap maximum. Raise together with the page cache for larger graphs. |
| `NEO4J_server_memory_pagecache_size` | 512m | Page cache holding graph data in memory. Size it to your working set. |
| `NEO4J_server_bolt_advertised__address` | - | Bolt address advertised to drivers and Neo4j Browser. Points at the Railway TCP proxy. |
| `NEO4J_server_default__listen__address` | :: | Bind address. Railway's private network is IPv6-only, so :: is required. |
| `NEO4J_server_http_advertised__address` | - | Public HTTPS address of Neo4j Browser. |
| `NEO4J_server_memory_heap_initial__size` | 512m | JVM heap initial size. Keep equal to the maximum to avoid resizing pauses. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 7687
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/neo4j-or-open-source-graph-database-with)
