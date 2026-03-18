# Deploy Elasticsearch on Railway

Elastic is a scalable search and analytics engine for fast data queries

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/elasticsearch)

## About

Elasticsearch is a distributed, RESTful search and analytics engine designed for horizontal scalability and near real-time search capabilities. It allows you to store, search, and analyze large volumes of data quickly. Built on top of Apache Lucene, Elasticsearch is commonly used for log and event data analysis, full-text search, and handling complex queries in a wide variety of use cases, including web search engines, enterprise search, and data analytics platforms.

Elasticsearch runs as a Java application requiring JVM configuration, memory management, and persistent storage for index data. The service handles HTTP requests for indexing and searching while managing cluster state, shard allocation, and data replication in the background. You'll need to configure heap memory allocation, manage disk storage for indices, and handle JVM garbage collection tuning. The application maintains index mappings, handles query execution, and manages data distribution across nodes requiring careful resource monitoring and capacity planning.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Elasticsearch | [railwayapp-templates/elasticsearch](https://github.com/railwayapp-templates/elasticsearch) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9200 | Port that Elasticsearch will run on |
| `ES_JAVA_OPTS` | -Xms500m -Xmx4g | The minimum and max heap size that Elasticsearch can use |
| `ELASTIC_PASSWORD` | (secret) | Password for Elasticsearch |
| `ELASTIC_USERNAME` | (secret) | Username for Elasticsearch |

## Configuration

- **Healthcheck:** `/_cluster/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/esdata`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/template/elasticsearch)
