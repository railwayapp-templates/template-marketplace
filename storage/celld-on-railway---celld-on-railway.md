# Deploy celld-on-railway on Railway

celld.dev (open source impl of Durable Objects + workers) on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/celld-on-railway)

## About

[celld](https://celld.dev/) is a self-hosted runtime for Cloudflare Workers and Durable Objects.

This Railway template deploys a single-node celld fleet with:

- the official `ghcr.io/denoland/celld` image
- a Railway Storage Bucket for durable fleet state
- a Railway Volume for node-local working state
- Public Networking for Worker HTTP traffic
- Private Networking for celld peer/control traffic

A **cell** is celld's equivalent of a Durable Object: a named stateful object with private SQLite-backed state, HTTP handling, alarms, WebSockets, and durable persistence.

---

A celld fleet consists of one or more runtime nodes connected to the same object-storage bucket.

The bucket is the durable source of truth for:

- Worker deployments
- Durable Object / cell SQLite replicas
- ownership records
- node leases
- fleet metadata
- peer authentication material

The Railway service runs the Worker runtime and keeps active cells in memory. Inactive cells do not require dedicated containers; they are restored from durable storage when they receive work.

```text
Internet
   │
   ▼
Railway HTTPS
   │
   ▼
celld-node-1:8080
   │
   ▼
Worker runtime
   │
   ├── Cell:alice → SQLite
   ├── Cell:bob   → SQLite
   └── Cell:room  → SQLite
            │
            ▼
   Railway Storage Bucket
```

The template creates:

```text
Railway Project
├── celld-node-1
│   ├── public listener :8080
│   ├── private listener :8081
│   └── volume at /var/lib/celld
└── celld-fleet-bucket
```

The node runs approximately:

```bash
celld \
  --bucket "$CELLD_BUCKET_NAME" \
  --endpoint "$S3_ENDPOINT" \
  --region "$AWS_REGION" \
  --listen 0.0.0.0:8080 \
  --internal-listen 0.0.0.0:8081 \
  --advertise "$RAILWAY_PRIVATE_DOMAIN:8081"
```

Port `8080` serves public Worker traffic. Port `8081` is only for celld peer/operator traffic and should remain private.

The node advertises itself over Railway Private Networking as:

```text
celld-node-1.railway.internal:8081
```

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| celld-node-1 | `ghcr.io/denoland/celld:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AWS_REGION` | - | Region of the Railway Storage Bucket used by celld for durable state and coordination. Automatically inherited from celld-fleet-bucket. |
| `CELLD_WATCH` | - | Local directory used by celld for node-local state and replication working files. Keep this on the attached persistent volume. |
| `S3_ENDPOINT` | - | S3-compatible endpoint for the Railway Storage Bucket used by celld. Automatically inherited from celld-fleet-bucket. |
| `CELLD_WORKERS` | - | Number of stateless Worker isolates celld can run concurrently on this node. Increase for more request concurrency; higher values use more CPU and memory. |
| `AWS_ACCESS_KEY_ID` | - | Access key for the Railway Storage Bucket used by celld. Automatically inherited from celld-fleet-bucket. |
| `CELLD_BUCKET_NAME` | - | Name of the Railway Storage Bucket that stores celld deployments, Durable Object state, ownership records, and fleet metadata. |
| `AWS_SECRET_ACCESS_KEY` | (secret) | Secret access key for the Railway Storage Bucket used by celld. Automatically inherited from celld-fleet-bucket. |

## Configuration

- **Start command:** `/bin/sh -c 'exec /usr/local/bin/celld --bucket "$CELLD_BUCKET_NAME" --endpoint "$S3_ENDPOINT" --region "$AWS_REGION" --listen 0.0.0.0:8080 --internal-listen 0.0.0.0:8081 --advertise "$RAILWAY_PRIVATE_DOMAIN:8081"'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/celld`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/celld-on-railway)
