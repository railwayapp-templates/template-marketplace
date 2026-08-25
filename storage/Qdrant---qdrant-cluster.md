# Deploy Qdrant on Railway

Vector database for storing embeddings and searching by similarity

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qdrant-cluster)

## About

Qdrant is an open-source vector database written in Rust that stores embeddings alongside arbitrary JSON payloads and answers nearest-neighbour queries in milliseconds. It is the retrieval layer behind retrieval-augmented generation, semantic search, recommendations and deduplication — anywhere an app needs "find the things most similar to this" rather than "the rows matching this WHERE clause". Its distinguishing feature is filtered vector search: payload conditions are applied *during* graph traversal, so "the ten closest documents for this tenant, tagged `policy`" stays fast instead of degrading into a post-filter scan.

Self-host Qdrant on Railway and this template gives you the shape Qdrant documents for production, not a single container. Three nodes join one Raft cluster over the private network, each with its own volume. A Caddy gateway holds the only public domain and round-robins the REST API across all three, so losing a node does not take the endpoint down. New collections default to six shards at replication factor two, and a managed object storage bucket holds snapshots, so a backup taken on one node restores from any of them.

![Diagram of three Qdrant nodes behind a Caddy gateway on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787332173/qdrant-architecture.png)

Qdrant is a purpose-built vector search engine, not an extension bolted onto a general-purpose database. Teams self-host it when embeddings become core to the product and a managed service is too expensive, too slow, or ruled out by data residency. Being a single static Rust binary with no JVM and no external coordinator, it is unusually cheap to run at a given scale.

Key features:

- **Filtered HNSW search** — payload conditions applied during traversal, not after
- **Hybrid and sparse vectors** — dense, sparse and multi-vector search with server-side fusion
- **Quantization** — scalar, binary and 4-bit modes that cut memory dramatically
- **JWT access control** — scoped read-only or collection-limited tokens

The three `qdrant-N` services are peers, not primaries and replicas: any accepts any request and forwards it to whichever peer holds the shard, which is why a round-robin load balancer is safe in front of them. Raft consensus on private port 6335 keeps topology and collection definitions consistent. The `gateway` health-checks each node and routes around unhealthy ones, holding no credential of its own. The bucket exists because a Railway volume attaches to one service — object storage is what makes a snapshot visible cluster-wide.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| qdrant-3 | `qdrant/qdrant:v1.19.0` | Database |
| qdrant-1 | `qdrant/qdrant:v1.19.0` | Database |
| gateway | [gridalpha/qdrant-gateway-railway](https://github.com/gridalpha/qdrant-gateway-railway) | Web service |
| qdrant-2 | `qdrant/qdrant:v1.19.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | qdrant-3 | 6333 | Port Railway health-checks |
| `QDRANT_URI` | qdrant-3 | http://qdrant-3.railway.internal:6335 | How peers reach this node |
| `QDRANT_BOOTSTRAP` | qdrant-3 | - | Peer this node joins through |
| `QDRANT__LOG_LEVEL` | qdrant-3 | INFO | Log verbosity |
| `QDRANT__SERVICE__HOST` | qdrant-3 | :: | Dual-stack bind, also moves the Raft listener |
| `QDRANT__CLUSTER__ENABLED` | qdrant-3 | true | Run in distributed mode |
| `QDRANT__SERVICE__API_KEY` | qdrant-3 | (secret) | Must match every peer |
| `QDRANT__SERVICE__JWT_RBAC` | qdrant-3 | true | Enable scoped JWT access tokens |
| `QDRANT__CLUSTER__P2P__PORT` | qdrant-3 | 6335 | Private Raft peer port |
| `QDRANT__SERVICE__GRPC_PORT` | qdrant-3 | 6334 | gRPC API port |
| `QDRANT__SERVICE__HTTP_PORT` | qdrant-3 | 6333 | REST API port |
| `QDRANT__TELEMETRY_DISABLED` | qdrant-3 | true | Disable upstream usage reporting |
| `QDRANT__STORAGE__STORAGE_PATH` | qdrant-3 | /qdrant/storage | Data directory on the volume |
| `QDRANT__SERVICE__READ_ONLY_API_KEY` | qdrant-3 | (secret) | Must match every peer |
| `QDRANT__SERVICE__ENFORCE_INTERNAL_AUTH` | qdrant-3 | true | Require the key on peer traffic |
| `QDRANT__STORAGE__COLLECTION__REPLICATION_FACTOR` | qdrant-3 | 2 | Shard copies per collection |
| `QDRANT__CLUSTER__CONSENSUS__BOOTSTRAP_TIMEOUT_SEC` | qdrant-3 | 60 | Longer join window |
| `QDRANT__CLUSTER__CONSENSUS__MAX_MESSAGE_QUEUE_SIZE` | qdrant-3 | 5000 | Raft backpressure limit |
| `QDRANT__STORAGE__COLLECTION__SHARD_NUMBER_PER_NODE` | qdrant-3 | 2 | Shards created per node |
| `QDRANT__STORAGE__SNAPSHOTS_CONFIG__S3_CONFIG__BUCKET` | qdrant-3 | - | Snapshot bucket name |
| `QDRANT__STORAGE__SNAPSHOTS_CONFIG__S3_CONFIG__REGION` | qdrant-3 | - | Bucket region |
| `QDRANT__STORAGE__SNAPSHOTS_CONFIG__SNAPSHOTS_STORAGE` | qdrant-3 | s3 | Snapshots to object storage |
| `QDRANT__STORAGE__SNAPSHOTS_CONFIG__S3_CONFIG__ACCESS_KEY` | qdrant-3 | - | Bucket access key |
| `QDRANT__STORAGE__SNAPSHOTS_CONFIG__S3_CONFIG__SECRET_KEY` | qdrant-3 | (secret) | Bucket secret key |
| `QDRANT__STORAGE__SNAPSHOTS_CONFIG__S3_CONFIG__ENDPOINT_URL` | qdrant-3 | - | S3-compatible endpoint |
| `PORT` | qdrant-1 | 6333 | Port Railway health-checks |
| `QDRANT_URI` | qdrant-1 | http://qdrant-1.railway.internal:6335 | How peers reach this node |
| `QDRANT__LOG_LEVEL` | qdrant-1 | INFO | Log verbosity |
| `QDRANT__SERVICE__HOST` | qdrant-1 | :: | Dual-stack bind, also moves the Raft listener |
| `QDRANT__CLUSTER__ENABLED` | qdrant-1 | true | Run in distributed mode |
| `QDRANT__SERVICE__API_KEY` | qdrant-1 | (secret) | Full-access key, api-key header |
| `QDRANT__SERVICE__JWT_RBAC` | qdrant-1 | true | Enable scoped JWT access tokens |
| `QDRANT__CLUSTER__P2P__PORT` | qdrant-1 | 6335 | Private Raft peer port |
| `QDRANT__SERVICE__GRPC_PORT` | qdrant-1 | 6334 | gRPC API port |
| `QDRANT__SERVICE__HTTP_PORT` | qdrant-1 | 6333 | REST API port |
| `QDRANT__TELEMETRY_DISABLED` | qdrant-1 | true | Disable upstream usage reporting |
| `QDRANT__STORAGE__STORAGE_PATH` | qdrant-1 | /qdrant/storage | Data directory on the volume |
| `QDRANT__SERVICE__READ_ONLY_API_KEY` | qdrant-1 | (secret) | Read-only access key |
| `QDRANT__SERVICE__ENFORCE_INTERNAL_AUTH` | qdrant-1 | true | Require the key on peer traffic |
| `QDRANT__STORAGE__COLLECTION__REPLICATION_FACTOR` | qdrant-1 | 2 | Shard copies per collection |
| `QDRANT__CLUSTER__CONSENSUS__BOOTSTRAP_TIMEOUT_SEC` | qdrant-1 | 60 | Longer join window |
| `QDRANT__CLUSTER__CONSENSUS__MAX_MESSAGE_QUEUE_SIZE` | qdrant-1 | 5000 | Raft backpressure limit |
| `QDRANT__STORAGE__COLLECTION__SHARD_NUMBER_PER_NODE` | qdrant-1 | 2 | Shards created per node |
| `QDRANT__STORAGE__SNAPSHOTS_CONFIG__S3_CONFIG__BUCKET` | qdrant-1 | - | Snapshot bucket name |
| `QDRANT__STORAGE__SNAPSHOTS_CONFIG__S3_CONFIG__REGION` | qdrant-1 | - | Bucket region |
| `QDRANT__STORAGE__SNAPSHOTS_CONFIG__SNAPSHOTS_STORAGE` | qdrant-1 | s3 | Snapshots to object storage |
| `QDRANT__STORAGE__SNAPSHOTS_CONFIG__S3_CONFIG__ACCESS_KEY` | qdrant-1 | - | Bucket access key |
| `QDRANT__STORAGE__SNAPSHOTS_CONFIG__S3_CONFIG__SECRET_KEY` | qdrant-1 | (secret) | Bucket secret key |
| `QDRANT__STORAGE__SNAPSHOTS_CONFIG__S3_CONFIG__ENDPOINT_URL` | qdrant-1 | - | S3-compatible endpoint |
| `PORT` | gateway | 8080 | Caddy listening port |
| `QDRANT_UPSTREAMS` | gateway | - | Nodes to load-balance across |
| `PORT` | qdrant-2 | 6333 | Port Railway health-checks |
| `QDRANT_URI` | qdrant-2 | http://qdrant-2.railway.internal:6335 | How peers reach this node |
| `QDRANT_BOOTSTRAP` | qdrant-2 | - | Peer this node joins through |
| `QDRANT__LOG_LEVEL` | qdrant-2 | INFO | Log verbosity |
| `QDRANT__SERVICE__HOST` | qdrant-2 | :: | Dual-stack bind, also moves the Raft listener |
| `QDRANT__CLUSTER__ENABLED` | qdrant-2 | true | Run in distributed mode |
| `QDRANT__SERVICE__API_KEY` | qdrant-2 | (secret) | Must match every peer |
| `QDRANT__SERVICE__JWT_RBAC` | qdrant-2 | true | Enable scoped JWT access tokens |
| `QDRANT__CLUSTER__P2P__PORT` | qdrant-2 | 6335 | Private Raft peer port |
| `QDRANT__SERVICE__GRPC_PORT` | qdrant-2 | 6334 | gRPC API port |
| `QDRANT__SERVICE__HTTP_PORT` | qdrant-2 | 6333 | REST API port |
| `QDRANT__TELEMETRY_DISABLED` | qdrant-2 | true | Disable upstream usage reporting |
| `QDRANT__STORAGE__STORAGE_PATH` | qdrant-2 | /qdrant/storage | Data directory on the volume |
| `QDRANT__SERVICE__READ_ONLY_API_KEY` | qdrant-2 | (secret) | Must match every peer |
| `QDRANT__SERVICE__ENFORCE_INTERNAL_AUTH` | qdrant-2 | true | Require the key on peer traffic |
| `QDRANT__STORAGE__COLLECTION__REPLICATION_FACTOR` | qdrant-2 | 2 | Shard copies per collection |
| `QDRANT__CLUSTER__CONSENSUS__BOOTSTRAP_TIMEOUT_SEC` | qdrant-2 | 60 | Longer join window |
| `QDRANT__CLUSTER__CONSENSUS__MAX_MESSAGE_QUEUE_SIZE` | qdrant-2 | 5000 | Raft backpressure limit |
| `QDRANT__STORAGE__COLLECTION__SHARD_NUMBER_PER_NODE` | qdrant-2 | 2 | Shards created per node |
| `QDRANT__STORAGE__SNAPSHOTS_CONFIG__S3_CONFIG__BUCKET` | qdrant-2 | - | Snapshot bucket name |
| `QDRANT__STORAGE__SNAPSHOTS_CONFIG__S3_CONFIG__REGION` | qdrant-2 | - | Bucket region |
| `QDRANT__STORAGE__SNAPSHOTS_CONFIG__SNAPSHOTS_STORAGE` | qdrant-2 | s3 | Snapshots to object storage |
| `QDRANT__STORAGE__SNAPSHOTS_CONFIG__S3_CONFIG__ACCESS_KEY` | qdrant-2 | - | Bucket access key |
| `QDRANT__STORAGE__SNAPSHOTS_CONFIG__S3_CONFIG__SECRET_KEY` | qdrant-2 | (secret) | Bucket secret key |
| `QDRANT__STORAGE__SNAPSHOTS_CONFIG__S3_CONFIG__ENDPOINT_URL` | qdrant-2 | - | S3-compatible endpoint |

## Configuration

- **Healthcheck:** `/livez`
- **Volume:** `/qdrant/storage`
- **Healthcheck:** `/gatewayz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/qdrant-cluster)
