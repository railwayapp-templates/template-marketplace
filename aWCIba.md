# Deploy Temporal with S3 Archive on Railway

Temporal with S3 archive.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/aWCIba)

## About

Integrate Temporal with S3 for seamless workflow execution and durable archiving. This setup ensures reliable storage of workflow history, enabling scalability, fault tolerance, and efficient data retrieval for long-running processes in distributed systems.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Temporal UI | [omtera/temporal](https://github.com/omtera/temporal) (root: /ui/) | Web service |
| Temporal | [omtera/temporal](https://github.com/omtera/temporal) (root: /temporal/) | TCP service |
| Elasticsearch | [railwayapp-templates/elasticsearch](https://github.com/railwayapp-templates/elasticsearch) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Temporal UI | 8080 |
| `TEMPORAL_AUTH_ENABLED` | Temporal UI | false |
| `DB` | Temporal | postgres12 |
| `PORT` | Temporal | 7233 |
| `ES_USER` | Temporal | (secret) |
| `ENABLE_ES` | Temporal | true |
| `ES_VERSION` | Temporal | v7 |
| `POSTGRES_USER` | Temporal | (secret) |
| `PORT` | Elasticsearch | 9200 |
| `ES_JAVA_OPTS` | Elasticsearch | -Xms500m -Xmx4g |
| `ELASTIC_PASSWORD` | Elasticsearch | (secret) |
| `ELASTIC_USERNAME` | Elasticsearch | (secret) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 7233
- **Healthcheck:** `/_cluster/health`
- **Volume:** `/esdata`

**Category:** Other · **Languages:** TypeScript, JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/template/aWCIba)
