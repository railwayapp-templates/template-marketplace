# Deploy Neo4j GraphDB on Railway

Deploy a fully managed Neo4j instance on Railway with ease.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/asEF1B)

## About

Neo4j GraphDB is a native graph database that stores data in nodes and relationships, making it perfect for complex queries and relationship-heavy data. It's widely used for social networks, recommendation systems, fraud detection, and knowledge graphs.

Hosting Neo4j GraphDB involves setting up a graph database server with proper memory configuration, authentication, and network access. This template provides a pre-configured Neo4j instance with bulk data import capabilities, configurable memory settings, and automatic TCP address generation for easy connection from your applications.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| neo4j | [sukrutnrvd/neo4j-template](https://github.com/sukrutnrvd/neo4j-template) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DB_PASSWORD` | (secret) | Must be at least 8 characters or it will crash during the deployment phase. |
| `HEAP_MAX_SIZE` | 1g | Please do not update this value if you on a hobby plan or trial. For more info visit https://neo4j.com/docs/operations-manual/current/configuration/configuration-settings/#config_server.memory.heap.max_size |
| `NEO4J_PLUGINS` | ["apoc"] | List of neo4j plugins. Please provide array of strings |
| `NODE_CSV_URLS` | - | Bulk insert only supported for csv files for now. You can provide your csv files by seperating them with comma. |
| `PAGECACHE_SIZE` | 4g | Please do not update this value if you on a hobby plan or trial. For more info visit https://neo4j.com/docs/operations-manual/current/configuration/configuration-settings/#config_server.memory.pagecache.size |
| `HEAP_INITIAL_SIZE` | 1g | Please do not update this value if you on a hobby plan or trial. For more info visit https://neo4j.com/docs/operations-manual/current/configuration/configuration-settings/#config_server.memory.heap.initial_size |
| `RELATION_CSV_URLS` | - | Bulk insert only supported for csv files for now. You can provide your csv files by seperating them with comma. |

## Configuration

- **TCP Proxies:** 7687
- **Volume:** `/data`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/asEF1B)
