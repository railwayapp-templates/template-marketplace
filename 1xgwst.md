# Deploy Opensearch on Railway

OpenSearch is a scalable, open-source search and analytics suite.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/1xgwst)

## About

OpenSearch and OpenSearch Dashboards are designed to be deployed together as a unified solution for indexing, querying, and visualizing data.  
- **OpenSearch** provides a distributed search and analytics engine that supports full-text search, filtering, aggregations, and more.  
- **OpenSearch Dashboards** offers a modern UI to interact with OpenSearch, explore indices, build visualizations, and manage alerts.

Hosting OpenSearch on Railway removes the burden of infrastructure configuration. You can deploy both services using Docker, attach persistent volumes for storage, and configure resources as needed. This stack is ideal for observability, logging, metrics, and full-text search in modern applications.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Opensearch | `opensearchproject/opensearch:latest` | Web service |
| Opensearch-dashboards | `opensearchproject/opensearch-dashboards:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Opensearch | 9200 |
| `node.name` | Opensearch | opensearch-node |
| `cluster.name` | Opensearch | opensearch-cluster |
| `discovery.type` | Opensearch | single-node |
| `OPENSEARCH_JAVA_OPTS` | Opensearch | -Xms512m -Xmx512m |
| `bootstrap.memory_lock` | Opensearch | true |
| `DISABLE_SECURITY_PLUGIN` | Opensearch | true |
| `DISABLE_INSTALL_DEMO_CONFIG` | Opensearch | true |
| `PORT` | Opensearch-dashboards | 5601 |
| `DISABLE_SECURITY_DASHBOARDS_PLUGIN` | Opensearch-dashboards | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/share/opensearch/data`

**Category:** Observability

[View on Railway →](https://railway.com/template/1xgwst)
