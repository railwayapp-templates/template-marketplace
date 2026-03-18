# Deploy milvus-standalone on Railway

railway for milvus standalone

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/milvus-standalone)

## About

Milvus is an open-source vector database designed for AI applications, enabling efficient similarity search and analytics on massive-scale embedding vectors. This template deploys Milvus v2.4.17 in standalone mode with embedded etcd, persistent storage, password authentication, and automatic health monitoring.

Deploying Milvus Standalone on Railway provides a production-ready vector database infrastructure without the complexity of manual configuration. This template includes embedded etcd for metadata management, Railway Volume integration for persistent data storage, configurable password authentication, and automatic health checks with restart policies. The deployment exposes a public gRPC endpoint on port 19530, making it immediately accessible for AI applications requiring semantic search, recommendation systems, or RAG (Retrieval-Augmented Generation) implementations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| milvus-railway | [xkos/milvus-railway](https://github.com/xkos/milvus-railway) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DEPLOY_MODE` | STANDALONE |
| `MILVUS_PORT` | 19530 |
| `ETCD_DATA_DIR` | /var/lib/milvus/etcd |
| `ETCD_USE_EMBED` | true |
| `ETCD_CONFIG_PATH` | /milvus/configs/embedEtcd.yaml |
| `MILVUS_ETCD_PORT` | 2379 |
| `MILVUS_GRPC_PORT` | 19530 |
| `COMMON_STORAGETYPE` | local |
| `MILVUS_METRICS_PORT` | 9091 |
| `MILVUS_ROOT_PASSWORD` | (secret) |

## Configuration

- **Volume:** `/var/lib/milvus`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/milvus-standalone)
