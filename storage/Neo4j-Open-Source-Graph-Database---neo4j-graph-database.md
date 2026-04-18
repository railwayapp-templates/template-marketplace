# Deploy Neo4j | Open Source Graph Database on Railway

Self-host Neo4j. Graph database with ACID, vector search & GraphRAG

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/neo4j-graph-database)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/neo4j-graph-database?referralCode=QXdhdr&utm_medium=integration&utm_source=template&utm_campaign=generic)

Deploy Neo4j, the world's leading open-source graph database, on Railway with persistent storage and full Bolt protocol access. Self-host Neo4j on Railway to get native graph storage, ACID transactions, and the Cypher query language running in minutes. This template deploys a single Neo4j Community Edition service with a volume for data persistence, an HTTP domain for Neo4j Browser, and a TCP proxy for Bolt driver connections.

Neo4j is a native graph database that stores relationships as first-class citizens, making traversals of deeply connected data orders of magnitude faster than SQL joins. Unlike relational databases that rely on expensive join operations, Neo4j's index-free adjacency means every node directly references its neighbors.

Key features:
- **Cypher query language** — declarative, SQL-like, ASCII-art pattern syntax (now part of the GQL/ISO standard)
- **ACID transactions** with full consistency guarantees
- **APOC library** — ~450 procedures for data integration, algorithms, and conversion
- **Vector search** with metadata filters for GenAI/GraphRAG applications
- **Graph Data Science** — 65+ algorithms including PageRank, community detection, and pathfinding
- **Official drivers** for Python, Java, JavaScript, Go, C#/.NET, and community drivers for Ruby, PHP, Rust

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Neo4j | `neo4j:5.26-community` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NEO4J_AUTH` | - | Initial admin username and password |
| `NEO4J_PLUGINS` | ["apoc"] | Auto-install APOC plugin at startup |
| `NEO4J_server_memory_heap_max__size` | 512m | JVM maximum heap allocation |
| `NEO4J_server_memory_pagecache_size` | 512m | Page cache for graph data |
| `NEO4J_server_bolt_advertised__address` | - | Bolt driver connection address |
| `NEO4J_server_default__listen__address` | 0.0.0.0 | Bind to all interfaces for Railway proxy |
| `NEO4J_server_memory_heap_initial__size` | 512m | JVM initial heap allocation |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/neo4j-graph-database)
