# Deploy Milvus on Railway

Milvus Standalone: Cloud-native vector DB for scalable, fast ANN search.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/c7nLmV)

## About

Milvus is a high-performance vector database built for scale, powering AI applications by efficiently organizing and searching vast amounts of unstructured data like text, images, and multi-modal information with real-time streaming updates.

Hosting Milvus provides a scalable vector database solution for AI applications requiring efficient similarity search and retrieval. Built with Go and C++, Milvus offers CPU/GPU hardware acceleration and supports both distributed Kubernetes-native architecture for horizontal scaling and standalone mode for single machines. With support for various vector indexes, metadata filtering, and multi-tenancy options, you can handle billions of vectors with thousands of concurrent queries while maintaining high availability and performance for mission-critical AI workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| grpc-reverse-proxy | `ghcr.io/monotykamary/grpc-reverse-proxy:latest` | Web service |
| minio | `minio/minio:latest` | Database |
| etcd | `quay.io/coreos/etcd:v3.6.0` | Database |
| standalone | `milvusdb/milvus:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | grpc-reverse-proxy | 8080 | Host port that the proxy will run on |
| `SERVICE_URL` | grpc-reverse-proxy | - | The internal Milvus URL and port |
| `MINIO_ACCESS_KEY` | minio | minioadmin | Access key for MinIO object storage access, default credentials for admin user. |
| `MINIO_SECRET_KEY` | minio | (secret) | Secret key for MinIO object storage access, default credentials for admin user. |
| `ETCD_SNAPSHOT_COUNT` | etcd | 50000 | Number of etcd transactions after which a snapshot of the data is taken. |
| `ETCD_QUOTA_BACKEND_BYTES` | etcd | 4294967296 | Maximum size (in bytes) of the etcd database; 4GB in this case. |
| `ETCD_AUTO_COMPACTION_MODE` | etcd | revision | Etcd auto-compaction mode, set to 'revision' to compact based on historical revisions. |
| `ETCD_AUTO_COMPACTION_RETENTION` | etcd | 1000 | Number of historical revisions to retain when auto-compaction mode is 'revision'. |
| `PORT` | standalone | 9091 | Network port on which this application or service will listen for incoming connections. |
| `MINIO_ADDRESS` | standalone | - | Network address and port for connecting to the MinIO service, using a Railway private domain. |
| `ETCD_ENDPOINTS` | standalone | - | Network address(es) and port for connecting to the etcd service, using a Railway private domain. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `minio server /minio_data --console-address ":9001"`
- **Volume:** `/minio_data`
- **Start command:** `etcd -advertise-client-urls=http://etcd.railway.internal:2379 -listen-client-urls http://0.0.0.0:2379 --data-dir /etcd`
- **Volume:** `/etcd`
- **Start command:** `milvus run standalone`
- **Volume:** `/var/lib/milvus`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/c7nLmV)
