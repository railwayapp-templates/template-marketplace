# Deploy Graphiti + Neo4j on Railway

Build Real-Time Knowledge Graphs for AI Agents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/graphiti-neo4j)

## About

Graphiti + Neo4j provides a robust, time-aware knowledge graph system
for AI applications. Graphiti extracts structured facts, entities,
relationships, and temporal context from text, while Neo4j stores this
evolving knowledge graph efficiently. Together, they enable long‑term AI
memory, graph‑based reasoning, and hybrid semantic search.

Hosting Graphiti with Neo4j on Railway delivers a fully managed,
scalable environment for AI memory systems. Railway automatically
handles service deployment, networking, environment variables, logs, and
scaling so you can focus on building your AI logic instead of server
management. The included template provisions a Graphiti API server and a
connected Neo4j graph database, making it easy to ingest data through
Graphiti's episode API, run extraction pipelines, and perform semantic +
graph-based search over your knowledge. This setup is ideal for building
production-grade agent memory systems, chatbots with evolving knowledge,
or applications that require rich relationship modeling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| neo4j | `neo4j:5.26.2` | Database |
| graphiti | `zepai/graphiti:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_USER` | neo4j | (secret) | - |
| `NEO4J_AUTH` | neo4j | - | Username and password for neo4j database access |
| `DB_PASSWORD` | neo4j | (secret) | - |
| `NEO4J_PLUGINS` | neo4j | ["apoc"] | List of neo4j plugins. Please provide array of strings |
| `NEO4J_dbms_logs_http_enabled` | neo4j | true | Enables HTTP traffic logging for REST and Bolt-over-HTTP connections. |
| `NEO4J_server_logs_gc_enabled` | neo4j | true | Enables logging of JVM Garbage Collection (GC) events for performance monitoring. |
| `NEO4J_server_memory_heap_max__size` | neo4j | 1g | Please do not update this value if you on a hobby plan or trial. For more info visit https://neo4j.com/docs/operations-manual/current/configuration/configuration-settings/#config_server.memory.heap.max_size |
| `NEO4J_server_memory_pagecache_size` | neo4j | 4g | Please do not update this value if you on a hobby plan or trial. For more info visit https://neo4j.com/docs/operations-manual/current/configuration/configuration-settings/#config_server.memory.pagecache.size |
| `NEO4J_server_memory_heap_initial__size` | neo4j | 1g | Please do not update this value if you on a hobby plan or trial. For more info visit https://neo4j.com/docs/operations-manual/current/configuration/configuration-settings/" # config_server.memory.heap.initial_size |
| `NEO4J_db_logs_query_transaction_enabled` | neo4j | VERBOSE | Enables detailed transaction logging for queries (very verbose output). |
| `PORT` | graphiti | 8000 | - |
| `NEO4J_USER` | graphiti | (secret) | - |
| `db_backend` | graphiti | neo4j | - |
| `NEO4J_PASSWORD` | graphiti | (secret) | - |
| `OPENAI_API_KEY` | graphiti | (secret) | - |

## Configuration

- **TCP Proxies:** 7687
- **Volume:** `/data`
- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/template/graphiti-neo4j)
