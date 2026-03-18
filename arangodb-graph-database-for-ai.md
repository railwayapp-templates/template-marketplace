# Deploy ArangoDB: Graph Database for AI on Railway

Graph-native reasoning, vector search, and full-text insights.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/arangodb-graph-database-for-ai)

## About

ArangoDB is a multi-model database system that combines graph, document, and key-value data models in one core, making it ideal for AI applications that require flexible data relationships and complex queries.

Hosting ArangoDB on Railway provides a scalable, multi-model database solution perfect for modern AI and machine learning applications. ArangoDB's native graph processing capabilities combined with its AQL query language enable complex data relationships and pattern matching essential for recommendation engines, knowledge graphs, and network analysis. The deployment uses Docker containers for easy management and includes persistent volume storage to ensure your data remains safe across restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| arangodb | `arangodb:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8529 | ArangoDB port for webUI |
| `ARANGO_ROOT_PASSWORD` | (secret) | ArangoDB root password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/arangodb3`

**Category:** Other

[View on Railway →](https://railway.com/template/arangodb-graph-database-for-ai)
