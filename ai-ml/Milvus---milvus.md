# Deploy Milvus on Railway

Scalable vector database for GenAI applications and semantic search.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/milvus)

## About

Milvus is an open-source, high-performance vector database built for GenAI applications, semantic search, embeddings, recommendation systems, and Retrieval-Augmented Generation (RAG). It is designed to handle large-scale vector workloads while providing SDK and API access for modern AI applications.

Hosting Milvus on Railway gives you a self-hosted vector database that can run alongside AI agents, backend services, embedding pipelines, and RAG applications.

This template runs Milvus in standalone mode with persistent Railway storage. A dedicated **etcd** service stores Milvus metadata, while a **Railway Storage Bucket** provides S3-compatible object storage without requiring a separate MinIO deployment.

Milvus uses its embedded Woodpecker message queue for standalone workloads, keeping the stack smaller while still separating metadata, local state, and object storage into the appropriate components.

> The built-in Milvus WebUI is available through port 9091 and can be accessed at https://your-milvus-domain/webui/, while applications and SDK clients connect to the main Milvus service through port 19530.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| milvus | `milvusdb/milvus` | Web service |
| etcd | `quay.io/coreos/etcd:v3.5.25` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | milvus | 9091 | Milvus WebUI and management port |
| `MQ_TYPE` | milvus | woodpecker | Use Milvus embedded Woodpecker message queue |
| `MINIO_PORT` | milvus | 443 | HTTPS port used by Railway Storage Bucket |
| `MINIO_REGION` | milvus | - | Railway Storage Bucket region |
| `MINIO_ADDRESS` | milvus | storage.railway.app | Base S3-compatible host used by Railway Storage Bucket |
| `MINIO_USE_SSL` | milvus | true | Use HTTPS when connecting to Railway Storage Bucket |
| `ETCD_ENDPOINTS` | milvus | - | Private etcd endpoint used by Milvus metadata services |
| `MINIO_BUCKET_NAME` | milvus | - | Railway Storage Bucket name |
| `MINIO_ACCESS_KEY_ID` | milvus | - | Railway Storage Bucket access key |
| `MINIO_USE_VIRTUAL_HOST` | milvus | true | Use virtual-hosted-style S3 requests |
| `MINIO_SECRET_ACCESS_KEY` | milvus | (secret) | Railway Storage Bucket secret access key |
| `ETCD_NAME` | etcd | default | Name of this single etcd member |
| `ETCD_DATA_DIR` | etcd | /var/lib/etcd | Persistent etcd data directory |
| `ETCD_SNAPSHOT_COUNT` | etcd | 50000 | Create an internal snapshot after 50000 committed transactions |
| `ETCD_INITIAL_CLUSTER` | etcd | - | Single-node etcd cluster definition |
| `ETCD_LISTEN_PEER_URLS` | etcd | http://0.0.0.0:2380 | Listen for etcd peer traffic |
| `ETCD_LISTEN_CLIENT_URLS` | etcd | http://0.0.0.0:2379 | Listen for client connections on all interfaces |
| `ETCD_QUOTA_BACKEND_BYTES` | etcd | 4294967296 | Set the etcd backend quota to 4 GiB |
| `ETCD_AUTO_COMPACTION_MODE` | etcd | revision | Use revision-based automatic compaction |
| `ETCD_ADVERTISE_CLIENT_URLS` | etcd | - | Private client URL advertised to Milvus |
| `ETCD_INITIAL_CLUSTER_STATE` | etcd | new | Bootstrap this deployment as a new etcd cluster |
| `ETCD_AUTO_COMPACTION_RETENTION` | etcd | 1000 | Retain the latest 1000 revisions before compaction |
| `ETCD_INITIAL_ADVERTISE_PEER_URLS` | etcd | - | Private peer URL advertised by this etcd member |

## Configuration

- **Start command:** `milvus run standalone`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/milvus`
- **Start command:** `/usr/local/bin/etcd`
- **Volume:** `/var/lib/etcd`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/milvus)
