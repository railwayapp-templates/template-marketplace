# Deploy Milvus on Railway

Authenticated Milvus v2.6 REST API with etcd and MinIO.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/c7nLmV)

## About

Milvus is an open-source vector database for similarity search, embeddings, retrieval-augmented generation, recommendation, and other high-dimensional workloads.

This template deploys Milvus Standalone `v2.6.21` with persistent etcd `v3.6.14`, MinIO `RELEASE.2025-09-07T16-13-09Z`, and a Caddy `2.11.4` REST proxy. Only the REST proxy receives a public domain; Milvus, etcd, and MinIO communicate through Railway private networking.

Milvus authentication is enabled with a generated root password. Milvus data, etcd metadata, and MinIO objects each use a separate persistent volume, and generated MinIO credentials are passed through Railway references.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| milvus-rest-proxy | `ghcr.io/monotykamary/grpc-reverse-proxy:v2.11.4-r3` | Web service |
| minio | `minio/minio:RELEASE.2025-09-07T16-13-09Z` | Database |
| etcd | `quay.io/coreos/etcd:v3.6.14` | Database |
| standalone | `milvusdb/milvus:v2.6.21` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | milvus-rest-proxy | 8080 | Internal Caddy REST proxy port. |
| `SERVICE_URL` | milvus-rest-proxy | - | Private Milvus HTTP/gRPC endpoint used for REST forwarding. |
| `PORT` | minio | 9000 | Private MinIO API and health port. |
| `MINIO_ROOT_USER` | minio | (secret) | Generated MinIO access key. |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | Generated MinIO secret key. |
| `PORT` | etcd | 2379 | Private etcd API and health port. |
| `ETCD_SNAPSHOT_COUNT` | etcd | 50000 | Number of etcd transactions after which a snapshot of the data is taken. |
| `ETCD_QUOTA_BACKEND_BYTES` | etcd | 4294967296 | Maximum size (in bytes) of the etcd database; 4GB in this case. |
| `ETCD_AUTO_COMPACTION_MODE` | etcd | revision | Etcd auto-compaction mode, set to 'revision' to compact based on historical revisions. |
| `ETCD_AUTO_COMPACTION_RETENTION` | etcd | 1000 | Number of historical revisions to retain when auto-compaction mode is 'revision'. |
| `PORT` | standalone | 9091 | Private Milvus health port. |
| `MINIO_REGION` | standalone | us-east-1 | MinIO S3 region. |
| `MINIO_ADDRESS` | standalone | - | Private MinIO endpoint. |
| `MINIO_USE_SSL` | standalone | false | Use Railway private HTTP for MinIO. |
| `ETCD_ENDPOINTS` | standalone | - | Private etcd endpoint. |
| `MINIO_ACCESS_KEY_ID` | standalone | - | MinIO access key reference. |
| `MINIO_SECRET_ACCESS_KEY` | standalone | (secret) | MinIO secret key reference. |
| `COMMON_SECURITY_DEFAULTROOTPASSWORD` | standalone | (secret) | Generated password for the Milvus root user. |
| `COMMON_SECURITY_AUTHORIZATIONENABLED` | standalone | true | Require credentials for Milvus API requests. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `minio server /minio_data --console-address ":9001"`
- **Healthcheck:** `/minio/health/live`
- **Volume:** `/minio_data`
- **Start command:** `etcd -advertise-client-urls=http://etcd.railway.internal:2379 -listen-client-urls http://0.0.0.0:2379 --data-dir /etcd`
- **Volume:** `/etcd`
- **Start command:** `milvus run standalone`
- **Healthcheck:** `/healthz`
- **Volume:** `/var/lib/milvus`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/c7nLmV)
