# Deploy Milvus on Railway

Vector database for storing embeddings and finding similar items

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/milvus-1)

## About

Milvus is an open-source vector database built for similarity search over embeddings. It stores billions of vectors alongside scalar metadata, indexes them for approximate nearest-neighbour lookup, and answers top-k queries in milliseconds with filtering and hybrid full-text search. Teams building retrieval-augmented generation, semantic search, recommendations and image retrieval use it as the retrieval layer behind their models.

Deploy Milvus on Railway and the whole standalone stack arrives wired together: the Milvus server, an etcd service for metadata, a Railway object storage bucket for segment and index data, and Attu — the official web console — as the only publicly reachable service. Your application connects privately at `milvus.railway.internal:19530` while you administer everything through Attu over HTTPS. Authentication is on before first boot, so the database is never exposed with its shipped default password.

![Milvus, etcd and Attu services with object storage on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787648127/milvus-architecture.png)

A vector database solves a problem relational stores handle badly: finding the rows whose embeddings are *closest* to a query embedding, over collections far too large to scan. Milvus separates storage from compute and supports HNSW, IVF, DiskANN and quantised indexes, trading recall against memory. Self-hosting matters when embeddings are sensitive, when per-query pricing on a managed service dominates the bill, or when retrieval belongs beside the app.

Key features:

- Dense, sparse, binary and multi-vector fields in one collection, with hybrid search and reranking
- Built-in BM25 full-text search, so keyword and semantic retrieval share one query path
- Metadata filtering evaluated inside the index scan rather than after it
- Partitions, role-based access control and per-collection privileges
- SDKs for Python, Node.js, Java, Go and C#, plus a RESTful API

This deployment runs Milvus in **standalone** mode, packing the coordinator, proxy, query, data and streaming components into one process — the shape Milvus documents for Docker, since the distributed shape is Kubernetes-only. Standalone needs the same external dependencies as a cluster: **etcd** for schemas, credentials and segment metadata, and **object storage** for the binlogs. A Railway bucket rather than a MinIO container keeps your vector data on durable storage, not one attached disk.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| milvus | `milvusdb/milvus:v2.6.22` | Database |
| attu | `zilliz/attu:v2.6` | Web service |
| etcd | `quay.io/coreos/etcd:v3.5.25` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | milvus | 9091 | Health check and metrics port |
| `LOG_LEVEL` | milvus | info | Server log verbosity |
| `MINIO_REGION` | milvus | - | Bucket placement region |
| `ETCD_ROOTPATH` | milvus | by-dev | Key prefix for Milvus metadata |
| `MINIO_USE_IAM` | milvus | false | Use static keys, not instance roles |
| `ETCD_ENDPOINTS` | milvus | - | Private etcd address |
| `MINIO_ROOT_PATH` | milvus | files | Key prefix inside the bucket |
| `MINIO_BUCKET_NAME` | milvus | - | Bucket holding vector data |
| `MINIO_ACCESS_KEY_ID` | milvus | - | Object storage access key |
| `MINIO_CLOUD_PROVIDER` | milvus | aws | S3 signature v4 mode |
| `MILVUS_BUCKET_ENDPOINT` | milvus | - | Bucket endpoint, parsed at startup |
| `MINIO_USE_VIRTUAL_HOST` | milvus | false | Path-style bucket addressing |
| `MINIO_SECRET_ACCESS_KEY` | milvus | (secret) | Object storage secret key |
| `COMMON_SECURITY_DEFAULTROOTPASSWORD` | milvus | (secret) | Password for root, first boot only |
| `COMMON_SECURITY_AUTHORIZATIONENABLED` | milvus | true | Require credentials on every request |
| `PORT` | attu | 3000 | Health check port |
| `MILVUS_URL` | attu | - | Milvus address prefilled on the login screen |
| `SERVER_PORT` | attu | 3000 | Console HTTP listener |
| `ATTU_LOG_LEVEL` | attu | info | Console log verbosity |
| `PORT` | etcd | 2379 | Health check and client port |
| `ETCD_DATA_DIR` | etcd | /var/lib/etcd/data | Data directory on the volume |
| `ETCD_SNAPSHOT_COUNT` | etcd | 50000 | Writes between raft snapshots |
| `ETCD_MAX_REQUEST_BYTES` | etcd | 10485760 | Largest accepted request |
| `ETCD_LISTEN_CLIENT_URLS` | etcd | http://[::]:2379 | Dual-stack client listener |
| `ETCD_QUOTA_BACKEND_BYTES` | etcd | 4294967296 | Metadata store size limit |
| `ETCD_AUTO_COMPACTION_MODE` | etcd | revision | Compact by revision count |
| `ETCD_ADVERTISE_CLIENT_URLS` | etcd | - | Address advertised to clients |
| `ETCD_AUTO_COMPACTION_RETENTION` | etcd | 1000 | Revisions retained before compaction |

## Configuration

- **Start command:** `/tini -s -- /bin/bash -c 'E="$MILVUS_BUCKET_ENDPOINT"; case "$E" in https://*) MINIO_USE_SSL=true; MINIO_PORT=443; E="${E#https://}";; http://*) MINIO_USE_SSL=false; MINIO_PORT=80; E="${E#http://}";; *) MINIO_USE_SSL=false; MINIO_PORT=9000;; esac; MINIO_ADDRESS="${E%%/*}"; export MINIO_ADDRESS MINIO_PORT MINIO_USE_SSL; CQ=max; CP=100000; read -r CQ CP < /sys/fs/cgroup/cpu.max; if [ "$CQ" != "max" ]; then N=$(( (CQ + CP - 1) / CP )); if [ "$N" -lt 1 ]; then N=1; fi; export GOMAXPROCS="$N" OMP_NUM_THREADS="$N"; fi; echo "railway-start: storage=$MINIO_ADDRESS:$MINIO_PORT ssl=$MINIO_USE_SSL gomaxprocs=${GOMAXPROCS:-host}"; exec milvus run standalone'`
- **Healthcheck:** `/healthz`
- **Volume:** `/var/lib/milvus`
- **Healthcheck:** `/api/v1/healthy`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`
- **Volume:** `/var/lib/etcd`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/milvus-1)
