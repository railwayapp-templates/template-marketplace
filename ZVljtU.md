# Deploy neo4j on Railway

Creates a Neo4j graph database + volume (upd 5/9/25 works with Metal now!).

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/ZVljtU)

## About

(5/9/24 updated to work with Metal!)

This template starts an instance of Neo4j with attached storage. This is a very basic configuration that allows client (such as Neo4j Desktop) to connect via Bolt to the TCP proxy. 

The NEO4J_AUTH variable configures the initial password for the default user "neo4j".

Neo4j tends to overestimate the memory requirements when deployed via Docker, so he memory size variables are required. They can be tweaked depending on the size of your application.

WARNING: This cannot be run on a Trial account because the VMs are too small to support running Neo4j.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| neo4j | `neo4j:5.26-community-bullseye` | Database |

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

[View on Railway →](https://railway.com/template/ZVljtU)
