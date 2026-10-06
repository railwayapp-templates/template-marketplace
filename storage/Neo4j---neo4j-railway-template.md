# Deploy Neo4j on Railway

A graph database built for connected data and relationship-driven apps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/neo4j-railway-template)

## About

Neo4j is a graph database designed for connected data, relationship-heavy applications, knowledge graphs, recommendation systems, fraud detection, GraphRAG, and other workloads where relationships between data are as important as the data itself.

Hosting Neo4j on Railway gives you a managed environment for running a persistent graph database without manually maintaining the underlying server infrastructure.

Neo4j provides both a browser-based administration interface and the Bolt protocol used by applications, drivers, and development tools.

This Railway template exposes both interfaces after deployment:

| Endpoint | Purpose |
|---|---|
| 🌐 **HTTP Public Endpoint** | Access Neo4j Browser and the web interface |
| 🔌 **TCP Public Endpoint** | Connect applications and Neo4j drivers through Bolt |

This makes the deployment usable immediately from both a browser and external applications.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| neo4j | `neo4j:2026.09.0` | Database |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `NEO4J_AUTH` | Credentials used to sign in to Neo4j |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 7687
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/neo4j-railway-template)
