# Deploy Neo4j GraphDB + Browser Bulk Insert on Railway

Deploy a fully managed Neo4j instance on Railway with ease.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/neo4j-graphdb-browser-bulk-insert)

## About

Neo4j GraphDB + Browser Bulk Insert is a ready-to-deploy template that allows developers to instantly spin up a fully functional graph database with a built-in browser interface. It enables one-click access to Neo4j without any configuration and supports easy bulk data insertion directly from the web interface.

With this template, you can deploy a Neo4j Graph Database and a browser-based bulk insert interface seamlessly on entity. Once deployed, you can access the Neo4j dashboard instantly, log in without any additional setup, and manage your data visually. The browser interface allows for quick and efficient bulk uploads
perfect for developers and data teams who need to rapidly prototype, test, or deploy graph-based applications. This setup removes the need for manual configuration or server management, making it ideal for quick experimentation or production environments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| neo4j | `neo4j:5.25.1` | Database |
| data-insert | [sukrutnrvd/neo4j-data-insert-browser](https://github.com/sukrutnrvd/neo4j-data-insert-browser) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NEO4J_AUTH` | neo4j | - | Username and password for neo4j database access |
| `DB_PASSWORD` | neo4j | (secret) | - |
| `NEO4J_PLUGINS` | neo4j | ["apoc"] | List of neo4j plugins. Please provide array of strings |
| `NEO4J_dbms_logs_http_enabled` | neo4j | true | Enables HTTP traffic logging for REST and Bolt-over-HTTP connections. |
| `NEO4J_server_logs_gc_enabled` | neo4j | true | Enables logging of JVM Garbage Collection (GC) events for performance monitoring. |
| `NEO4J_server_memory_heap_max__size` | neo4j | 1g | Please do not update this value if you on a hobby plan or trial. For more info visit https://neo4j.com/docs/operations-manual/current/configuration/configuration-settings/#config_server.memory.heap.max_size |
| `NEO4J_server_memory_pagecache_size` | neo4j | 4g | Please do not update this value if you on a hobby plan or trial. For more info visit https://neo4j.com/docs/operations-manual/current/configuration/configuration-settings/#config_server.memory.pagecache.size |
| `NEO4J_server_memory_heap_initial__size` | neo4j | 1g | Please do not update this value if you on a hobby plan or trial. For more info visit https://neo4j.com/docs/operations-manual/current/configuration/configuration-settings/" # config_server.memory.heap.initial_size |
| `NEO4J_db_logs_query_transaction_enabled` | neo4j | VERBOSE | Enables detailed transaction logging for queries (very verbose output). |
| `PORT` | data-insert | 8080 | - |

## Configuration

- **TCP Proxies:** 7687
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/template/neo4j-graphdb-browser-bulk-insert)
