# Deploy Elasticsearch engine on Railway

Elasticsearch: Open source search & analytics for speed, scale, and AI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/elasticsearch-engine)

## About

Elasticsearch is an open-source, distributed search and analytics engine built on Apache Lucene. It stores structured data, unstructured content, and vector embeddings in a single system with efficient columnar storage. Elasticsearch supports full-text search, hybrid and vector search, real-time analytics, and AI-driven applications — making it ideal for application search, log analysis, observability, and semantic retrieval.

![Lightning-fast search performance with Apache Lucene](https://zyugzloemocjcxmspsso.supabase.co/storage/v1/object/public/static-assets/illustration-lightening-fast-search-performance-apache-lucene.png)

Deploying Elasticsearch requires careful configuration of JVM heap settings, persistent storage for indices, and security credentials. This Railway template handles all of that automatically — it deploys Elasticsearch as a single-node cluster with X-Pack security enabled, a persistent volume for index data, and anonymous read access for monitoring. The template uses a custom entrypoint to manage data directory permissions on Railway's infrastructure, so your cluster starts reliably on every deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| elasticsearch | [protemplate/elasticsearch-railway](https://github.com/protemplate/elasticsearch-railway) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 9200 |
| `ES_JAVA_OPTS` | -Xms500m -Xmx4g |
| `ELASTIC_PASSWORD` | (secret) |
| `ELASTIC_USERNAME` | (secret) |

## Configuration

- **Volume:** `/esdata`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/template/elasticsearch-engine)
