# Deploy Milvus-REST-API on Railway

Milvus DB with native features and REST APIs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/milvus-rest-api)

## About

A custom REST API proxy that simplifies interaction with Milvus, the world's most popular open-source vector database. This template deploys a complete production-ready stack enabling hybrid search combining semantic understanding, keyword matching, and visual similarity in a single query.

This Railway template deploys a complete 5-service architecture in one click: Milvus Standalone (core vector database engine), etcd (metadata and service coordination), Minio (object storage for vectors and indexes), gRPC reverse proxy (network routing), and the custom REST API proxy. All services launch together, fully configured and networked, providing sub-10 millisecond response times for vector searches. The REST API proxy abstracts complex gRPC calls into simple HTTP endpoints, making it easy to integrate Milvus with workflow automation tools like n8n, AI agents, and custom applications.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| etcd | `quay.io/coreos/etcd:v3.6.0` | Database |
| milvus-rest-proxy | [flex123/milvus-rest-proxy](https://github.com/flex123/milvus-rest-proxy) | Web service |
| standalone | `milvusdb/milvus:latest` | Web service |
| minio | `minio/minio:latest` | Database |
| grpc-reverse-proxy | `ghcr.io/monotykamary/grpc-reverse-proxy:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `ETCD_SNAPSHOT_COUNT` | etcd | 5000 |
| `ETCD_QUOTA_BACKEND_BYTES` | etcd | 4294967296 |
| `ETCD_AUTO_COMPACTION_MODE` | etcd | revision |
| `ETCD_AUTO_COMPACTION_RETENTION` | etcd | 1000 |
| `MILVUS_PORT` | milvus-rest-proxy | 443 |
| `PORT` | standalone | 9091 |
| `MINIO_ACCESS_KEY` | minio | minioadmin |
| `MINIO_SECRET_KEY` | minio | (secret) |
| `PORT` | grpc-reverse-proxy | 8080 |

## Configuration

- **Start command:** `etcd -advertise-client-urls=http://etcd.railway.internal:2379 -listen-client-urls http://0.0.0.0:2379 --data-dir /etcd`
- **Volume:** `/etcd`
- **Start command:** `MILVUS_HOST=grpc-reverse-proxy-production-039b.up.railway.app bash start.sh`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `milvus run standalone`
- **Volume:** `/var/lib/milvus`
- **Start command:** `minio server /minio_data --console-address ":9001"`
- **Volume:** `/minio_data`

**Category:** Other · **Languages:** Python, Shell

[View on Railway →](https://railway.com/deploy/milvus-rest-api)
