# Deploy Neo4j GraphDB on Railway

Deploy a fully managed Neo4j instance on Railway with ease.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/asEF1B)

## About

Neo4j GraphDB is a native graph database that stores data as nodes and relationships rather than tables. It excels at traversing deeply connected data, making it ideal for recommendation engines, fraud detection, knowledge graphs, and any use case where relationships between entities matter as much as the data itself.

Hosting Neo4j GraphDB involves running a persistent graph database server with proper authentication, memory tuning, and network access. This template ships a pre-configured Neo4j 2026.04 (Community Edition) instance with bulk CSV data import at build time, adjustable heap and page cache memory, and automatic data seeding on first boot — so a Railway volume won't wipe your imported dataset on redeploy.

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

[View on Railway →](https://railway.com/deploy/asEF1B)
