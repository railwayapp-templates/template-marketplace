# Deploy Weaviate on Railway

Pinecone Alternative. Open-source vector database for semantic search & RAG

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/weaviate-db)

## About

Weaviate is an open-source vector database that stores objects together with their vector embeddings, so you can search by meaning instead of by keyword. Teams building retrieval-augmented generation, semantic search and recommendation engines use it as the retrieval layer between their data and a language model. It speaks REST, GraphQL and gRPC, ships official Python, TypeScript, Go and Java clients, and is the most widely used self-hosted alternative to Pinecone.

This template lets you deploy Weaviate on Railway with vectorization already working. It runs two services: the database, and a private `t2v-transformers` container that turns text into embeddings on CPU. Because the vectorizer runs inside your project, you can self-host Weaviate and index text with no OpenAI key or third-party account. A volume holds the object store and HNSW index, and managed object storage is wired up as a backup target. API-key auth and role-based access control are enabled before the first boot, so the database is never exposed anonymously.

![Weaviate Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786745285/7914c428-fd45-43ae-8c31-a558af51dfba.png)

Weaviate solves the retrieval half of an AI application. Embedding models turn text or images into vectors; Weaviate stores them next to the original objects, indexes them with HNSW, and answers nearest-neighbour queries in milliseconds. Self-host it when your corpus is sensitive, when per-vector managed pricing stops making sense, or when retrieval should sit beside the app querying it.

Key features:

- Vector, keyword (BM25) and hybrid search in one query language
- Automatic vectorization at import — send text, Weaviate stores vectors
- Vectorizer and generative modules for OpenAI, Cohere, Google, AWS, Hugging Face, Mistral and local transformers
- Role-based access control with API-key and OIDC authentication
- On-demand backup and restore to S3-compatible object storage

The **Weaviate** service is the database and the only public one, serving REST and GraphQL over HTTPS and gRPC over a TCP proxy. **t2v-transformers** is a private CPU inference container running the `all-MiniLM-L6-v2` sentence-transformer, which Weaviate calls over the private network on import and on `nearText` queries. The **bucket** sits outside the request path, receiving only backup archives.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| t2v-transformers | `semitechnologies/transformers-inference:sentence-transformers-all-MiniLM-L6-v2-onnx` | Worker |
| weaviate | `semitechnologies/weaviate:1.38.9` | TCP service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | t2v-transformers | 8080 | Inference server port |
| `LOG_LEVEL` | t2v-transformers | info | Log verbosity |
| `ENABLE_CUDA` | t2v-transformers | 0 | Run inference on CPU |
| `PORT` | weaviate | 2112 | Port Railway health-checks |
| `AWS_REGION` | weaviate | - | Bucket region |
| `GOMAXPROCS` | weaviate | 8 | Cap Go threads to the CPU quota |
| `GOMEMLIMIT` | weaviate | 6GiB | Go heap ceiling below the RAM limit |
| `BACKUP_S3_PATH` | weaviate | backups | Key prefix inside the bucket |
| `ENABLE_MODULES` | weaviate | text2vec-transformers,backup-s3 | Vectorizer and backup modules |
| `BACKUP_S3_BUCKET` | weaviate | - | Backup bucket name |
| `CLUSTER_HOSTNAME` | weaviate | node1 | Stable node name across redeploys |
| `AWS_ACCESS_KEY_ID` | weaviate | - | Bucket access key |
| `BACKUP_S3_USE_SSL` | weaviate | true | Use TLS to the bucket |
| `BACKUP_S3_ENDPOINT` | weaviate | t3.storageapi.dev | Bare host, no scheme |
| `QUERY_DEFAULTS_LIMIT` | weaviate | 25 | Default result count per query |
| `AWS_SECRET_ACCESS_KEY` | weaviate | (secret) | Bucket secret key |
| `PERSISTENCE_DATA_PATH` | weaviate | /var/lib/weaviate | Data directory on the volume |
| `DEFAULT_VECTORIZER_MODULE` | weaviate | text2vec-transformers | Vectorizer for new collections |
| `AUTHORIZATION_RBAC_ENABLED` | weaviate | true | Enable role-based access control |
| `PROMETHEUS_MONITORING_PORT` | weaviate | 2112 | Metrics port |
| `TRANSFORMERS_INFERENCE_API` | weaviate | - | Private inference endpoint |
| `AUTHENTICATION_APIKEY_USERS` | weaviate | admin-user,readonly-user | Users matched to those keys |
| `DISK_USE_WARNING_PERCENTAGE` | weaviate | 80 | Warn at this disk usage |
| `AUTHENTICATION_APIKEY_ENABLED` | weaviate | true | Enable API key authentication |
| `AUTHORIZATION_RBAC_ROOT_USERS` | weaviate | admin-user | User granted the root role |
| `PROMETHEUS_MONITORING_ENABLED` | weaviate | true | Expose Prometheus metrics |
| `RAFT_ENABLE_ONE_NODE_RECOVERY` | weaviate | true | Recover single node after IP change |
| `AUTHENTICATION_DB_USERS_ENABLED` | weaviate | true | Allow managing users via the API |
| `AUTHENTICATION_APIKEY_ALLOWED_KEYS` | weaviate | - | Admin key, read-only key |
| `AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED` | weaviate | false | Require an API key |
| `EXPERIMENTAL_AUTHORIZATION_RBAC_READONLY_USERS` | weaviate | readonly-user | User granted the viewer role |

## Configuration

- **Healthcheck:** `/meta`
- **Healthcheck:** `/metrics`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 50051
- **Volume:** `/var/lib/weaviate`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/weaviate-db)
