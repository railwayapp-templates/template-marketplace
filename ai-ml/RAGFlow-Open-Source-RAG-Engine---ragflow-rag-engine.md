# Deploy RAGFlow | Open Source RAG Engine on Railway

Self-host RAGFlow. Chat with your PDFs, contracts, papers & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ragflow-rag-engine)

## About

RAGFlow is an open-source retrieval-augmented generation engine built around deep document understanding — it ingests PDFs, Word docs, scanned images, and tables, chunks them with the DeepDoc parser, indexes the embeddings in Elasticsearch, and serves grounded LLM Q&amp;A with traceable citations.

This Railway template self-hosts a complete RAGFlow stack with MySQL, Redis, MinIO object storage, and Elasticsearch vector index pre-wired so you can deploy RAGFlow on Railway in one click and start uploading your own knowledge base immediately.

![RAGFlow Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1778334659/197c7615-1f53-4519-909f-dd65afa2eec9.png)

RAGFlow combines a high-quality document parser (DeepDoc) with classical IR scoring and modern dense retrieval, then layers grounded answer generation with explicit citations on top. Unlike chunk-and-pray RAG stacks, every answer is traced back to the exact paragraph in the original document so users can verify before trusting.

Key features of self-hosted RAGFlow:

- **DeepDoc parser** — handles PDFs, DOCX, XLSX, PPTX, scanned images, HTML, Markdown, and tables with layout-aware chunking
- **Hybrid retrieval** — Elasticsearch BM25 + dense vector search with rerankers
- **Grounded citations** — every answer references the source chunk
- **Multi-tenant** — each user/team has isolated knowledge bases
- **Agent workflows** — visual flow builder for multi-step retrieval pipelines
- **OpenAI-compatible API** — drop-in replacement for chat completions with RAG

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| MinIO | `quay.io/minio/minio:latest` | Database |
| Elasticsearch | `elasticsearch:8.11.3` | Database |
| RAGFlow | `infiniflow/ragflow:v0.25.2` | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `MINIO_ROOT_USER` | MinIO | (secret) | MinIO root username |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | MinIO root password (consumers reference this) |
| `ES_JAVA_OPTS` | Elasticsearch | -Xms1g -Xmx1g | JVM heap (1 GB) |
| `cluster.name` | Elasticsearch | ragflow-es | Cluster identifier |
| `discovery.type` | Elasticsearch | single-node | Single-node cluster mode |
| `ELASTIC_PASSWORD` | Elasticsearch | (secret) | elastic user password (consumers reference this) |
| `xpack.security.enabled` | Elasticsearch | true | Enable basic auth |
| `xpack.security.http.ssl.enabled` | Elasticsearch | false | Plain HTTP — RAGFlow connects http:// |
| `xpack.security.transport.ssl.enabled` | Elasticsearch | false | No transport TLS in single-node |
| `TZ` | RAGFlow | UTC | Container timezone |
| `PORT` | RAGFlow | 80 | Public HTTP port (web UI) |
| `DEVICE` | RAGFlow | cpu | Inference device (Railway has no GPUs) |
| `ES_HOST` | RAGFlow | - | Elasticsearch private hostname |
| `ES_PORT` | RAGFlow | 9200 | Elasticsearch HTTP port |
| `MEM_LIMIT` | RAGFlow | 8073741824 | Soft memory cap for parser workers in bytes |
| `DOC_ENGINE` | RAGFlow | elasticsearch | Vector backend selector |
| `MINIO_HOST` | RAGFlow | - | MinIO hostname (no port — RAGFlow appends :9000) |
| `MINIO_USER` | RAGFlow | (secret) | MinIO root user reference |
| `MYSQL_HOST` | RAGFlow | - | MySQL hostname reference |
| `MYSQL_PORT` | RAGFlow | - | MySQL port |
| `MYSQL_USER` | RAGFlow | (secret) | MySQL user (root) |
| `REDIS_HOST` | RAGFlow | - | Redis private hostname |
| `REDIS_PORT` | RAGFlow | 6379 | Redis port |
| `MYSQL_DBNAME` | RAGFlow | railway | Database name (Railway default) |
| `STACK_VERSION` | RAGFlow | 8.11.3 | Elasticsearch version pin |
| `SVR_HTTP_PORT` | RAGFlow | 9380 | Internal API server port |
| `MINIO_PASSWORD` | RAGFlow | (secret) | MinIO root password reference |
| `MYSQL_PASSWORD` | RAGFlow | (secret) | MySQL root password |
| `REDIS_PASSWORD` | RAGFlow | (secret) | Redis auth password |
| `ELASTIC_PASSWORD` | RAGFlow | (secret) | Elasticsearch elastic-user password |
| `REGISTER_ENABLED` | RAGFlow | 1 | Allow new user signups (set 0 after onboarding) |
| `MYSQLHOST` | MySQL | - | MySQL internal hostname |
| `MYSQLPORT` | MySQL | 3306 | MySQL service port |
| `MYSQLUSER` | MySQL | root | Default MySQL root username |
| `MYSQL_URL` | MySQL | - | Internal MySQL connection string |
| `MYSQLDATABASE` | MySQL | - | Database name reference variable |
| `MYSQLPASSWORD` | MySQL | (secret) | MySQL password reference |
| `MYSQL_DATABASE` | MySQL | railway | Default database name created |
| `MYSQL_PUBLIC_URL` | MySQL | - | Public MySQL connection URL |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root user password credential |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `minio server /data --console-address :9001`
- **Volume:** `/usr/share/elasticsearch/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ragflow-rag-engine)
