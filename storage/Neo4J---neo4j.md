# Deploy Neo4J on Railway

2026 Neo4j template with adjustable heap, plugins, etc

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/neo4j)

## About

Neo4j is a graph database designed for connected data, relationship-heavy queries, knowledge graphs, recommendation systems, fraud analysis, and graph-assisted AI applications. It
  stores and queries data as nodes and relationships, which makes it a strong fit when links between entities matter as much as the entities themselves.
  citeturn0search4turn1search0

  ## About Hosting Neo4j

  Hosting Neo4j well means handling a few operational basics correctly from day one: persistent storage, initial authentication, explicit memory sizing, and a decision about whether
  Bolt should remain private or be exposed externally. This template keeps the runtime close to the official Neo4j container while adapting it to Railway’s deployment model with
  attached volumes, private networking, optional TCP proxying, and configurable startup variables. It also gives users a clean path to override the Neo4j image version, memory
  settings, and plugin selection before launch. citeturn0search8turn0search9turn1search0turn1search1turn1search2

  ## Common Use Cases

  - Knowledge graphs and graph-enhanced retrieval for AI applications. citeturn0search4
  - Recommendation, fraud detection, and identity-resolution workloads built on highly connected data. citeturn0search4
  - RDF and semantic-web projects with optional plugins such as n10s, plus graph analytics with Graph Data Science. citeturn1search2turn2search1

  ## Dependencies for Neo4j Hosting

  - The official Neo4j Docker image, pinned to a specific version for predictable deployments. citeturn1search0
  - Railway volume storage and private networking, with optional TCP Proxy support for external Bolt access. citeturn0search9turn1search3turn1search7turn1search2

  ### Deployment Dependencies

  - Neo4j Operations Manual. citeturn1search0turn1search1turn1search2
  - Neo4j APOC documentation. citeturn2search1
  - Railway template, variables, and config-as-code documentation. citeturn0search8turn0search9turn3search0

  ### Implementation Details

  This template uses a pinned upstream Neo4j image and a thin Railway-aware wrapper that derives NEO4J_AUTH from a generated password, binds HTTP to Railway’s dynamic port, uses a
  single attached /data volume for persistence, and supports multiple plugins through a friendly comma-separated variable. Railway recommends generated secrets, reference variables,
  attached volumes for stateful services, and GitHub-backed templates for update notifications, while Neo4j documents Docker-based configuration, memory tuning, and plugin activation
  through environment variables. citeturn0search8turn0search9turn3search0turn1search0turn1search2

  ## Why Deploy Neo4j on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to
  vertically and horizontally scale it.

  By deploying Neo4j on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on
  Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gb-neo4j-railway-template | [GBVAI/gb-neo4j-railway-template](https://github.com/GBVAI/gb-neo4j-railway-template) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `NEO4J_PASSWORD` | (secret) |
| `NEO4J_PLUGINS_LIST` | apoc,n10s,graph-data-science |
| `NEO4J_server_memory_heap_max__size` | 4G |
| `NEO4J_server_memory_pagecache_size` | 4G |
| `NEO4J_server_memory_heap_initial__size` | 1G |
| `NEO4J_dbms_memory_transaction_total_max` | 1G |

## Configuration

- **Volume:** `/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/neo4j)
