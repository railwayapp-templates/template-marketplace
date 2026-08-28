# Deploy Opensearch on Railway

Search engine and dashboards for querying your own data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opensearch-analytics)

## About

OpenSearch is an Apache-2.0 search and analytics engine built on Apache Lucene, forked from Elasticsearch 7.10 and now governed by the OpenSearch Software Foundation under the Linux Foundation. It stores JSON documents, indexes every field, and answers full-text, filter, aggregation and k-NN vector queries over a REST API. Teams use it for product search, log analytics, security analytics and AI retrieval — the same jobs Elasticsearch does, without a licence that changes underneath them.

This template lets you self-host OpenSearch on Railway with the security plugin switched on from the first boot. Two services are deployed: an **opensearch** node holding the data on a persistent volume, and **opensearch-dashboards**, the visualisation and administration UI, which is the only service with a public URL. Dashboards reaches the node over Railway's private network, so the search API is never exposed to the internet. A managed object storage bucket is attached as a snapshot repository with a daily snapshot policy, so the cluster has a real backup rather than one volume.

![Diagram of the OpenSearch and Dashboards services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787787250/opensearch-architecture.png)

OpenSearch is a distributed document store with a query engine on top: you index JSON, it builds inverted indexes and doc values, and you query it over HTTP. Self-host it when you want the whole feature set without per-node licensing, when your data cannot leave your infrastructure, or when a managed search service costs more than the workload warrants.

- Full-text search with BM25 relevance, analysers, synonyms and highlighting
- Aggregations, alerting, anomaly detection and index lifecycle management
- k-NN vector search for semantic search and retrieval-augmented generation
- Role-based access control, tenants and audit logging
- SQL and PPL query interfaces alongside the JSON query DSL
- Snapshot and restore to S3-compatible object storage

The **opensearch** service is the engine and the only stateful component; its volume holds the Lucene indexes, the security configuration and the certificates it generates for itself. **opensearch-dashboards** is stateless — index patterns, visualisations and dashboards are all written back into the cluster. The bucket holds snapshots and nothing else.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| opensearch-dashboards | [gridalpha/opensearch-railway](https://github.com/gridalpha/opensearch-railway) | Web service |
| opensearch | [gridalpha/opensearch-railway](https://github.com/gridalpha/opensearch-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | opensearch-dashboards | 5601 | HTTP server listening port |
| `NODE_OPTIONS` | opensearch-dashboards | --max-old-space-size=1024 | Node heap ceiling |
| `OPENSEARCH_HOSTS` | opensearch-dashboards | - | Private search node URL |
| `OPENSEARCH_PASSWORD` | opensearch-dashboards | (secret) | Service account password |
| `OPENSEARCH_USERNAME` | opensearch-dashboards | (secret) | Service account Dashboards uses |
| `DASHBOARDS_COOKIE_PASSWORD` | opensearch-dashboards | (secret) | Session cookie encryption key |
| `SNAPSHOT_RETENTION` | opensearch | 14d | Snapshot retention window |
| `SNAPSHOT_S3_BUCKET` | opensearch | - | Snapshot repository bucket |
| `SNAPSHOT_S3_REGION` | opensearch | - | Object storage region |
| `SNAPSHOT_S3_ENDPOINT` | opensearch | - | Object storage endpoint |
| `SNAPSHOT_SCHEDULE_CRON` | opensearch | 0 2 * * * | Daily snapshot time, UTC |
| `OPENSEARCH_ADMIN_USERNAME` | opensearch | (secret) | Admin username |
| `SNAPSHOT_S3_ACCESS_KEY_ID` | opensearch | - | Object storage access key |
| `DASHBOARDS_SERVICE_PASSWORD` | opensearch | (secret) | Dashboards service account password |
| `DISABLE_INSTALL_DEMO_CONFIG` | opensearch | true | Never install demo certificates or users |
| `SNAPSHOT_S3_SECRET_ACCESS_KEY` | opensearch | (secret) | Object storage secret key |
| `OPENSEARCH_INITIAL_ADMIN_PASSWORD` | opensearch | (secret) | Admin password, first boot only |
| `DISABLE_PERFORMANCE_ANALYZER_AGENT_CLI` | opensearch | true | Skip the extra profiling JVM |

## Configuration

- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/share/opensearch/data`

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/opensearch-analytics)
