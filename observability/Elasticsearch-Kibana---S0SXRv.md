# Deploy Elasticsearch-Kibana on Railway

Elasticsearch is a search engine based on the Lucene library.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/S0SXRv)

## About

Elasticsearch and Kibana are typically deployed together to form the heart of the Elastic Stack (formerly known as ELK).  
- **Elasticsearch** indexes and stores structured or unstructured data and provides a robust search engine.  
- **Kibana** connects to Elasticsearch to visualize data through interactive dashboards, charts, and maps.

Hosting them on Railway means you don’t need to manage infrastructure. You can spin up both services using Docker images, with persistent volumes for Elasticsearch and resource-optimized containers for Kibana. This setup is ideal for observability pipelines, centralized logging, application analytics, and search features in your app stack.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Elasticsearch | `elasticsearch:9.0.2` | Web service |
| Kibana | `kibana:9.0.2` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Elasticsearch | 9200 |
| `node.name` | Elasticsearch | elasticsearch |
| `ES_JAVA_OPTS` | Elasticsearch | -Xms1g -Xmx1g |
| `discovery.type` | Elasticsearch | single-node |
| `ELASTIC_PASSWORD` | Elasticsearch | (secret) |
| `ELASTIC_USERNAME` | Elasticsearch | (secret) |
| `bootstrap.memory_lock` | Elasticsearch | true |
| `xpack.security.enabled` | Elasticsearch | false |
| `xpack.security.enrollment.enabled` | Elasticsearch | false |
| `PORT` | Kibana | 5601 |
| `SERVER_HOST` | Kibana | 0.0.0.0 |
| `SERVER_NAME` | Kibana | kibana |
| `ELASTICSEARCH_PASSWORD` | Kibana | (secret) |
| `ELASTICSEARCH_USERNAME` | Kibana | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/esdata`

**Category:** Observability

[View on Railway →](https://railway.com/template/S0SXRv)
