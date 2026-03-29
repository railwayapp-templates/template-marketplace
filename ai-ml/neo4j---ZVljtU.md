# Deploy neo4j on Railway

Creates a Neo4j graph database and volume for persistent storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ZVljtU)

## About

Hosting Neo4j GraphDB involves setting up a graph database server with proper memory configuration, authentication, and network access. This template provides a pre-configured Neo4j instance with bulk data import capabilities, configurable memory settings, and automatic TCP address generation for easy connection from your applications.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Neo4j Graph Database (Metal-Ready) | `neo4j:5.26-community-bullseye` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 7687 | The port to connect to via Bolt protocol. |
| `NEO4J_AUTH` | none | The auth string for initial password setting. |
| `NEO4J_server_memory_heap_max__size` | 2g | The max heap size for Neo4j. |
| `NEO4J_server_memory_pagecache_size` | 2g | The page cache size for Neo4j |
| `NEO4J_server_memory_heap_initial__size` | 2g | The initial heap size for Neo4j. |

## Configuration

- **Healthcheck:** `/dbms/cluster/status`
- **TCP Proxies:** 7687
- **Volume:** `/var/lib/neo4j/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ZVljtU)
