# Deploy tidepool on Railway

Deploy and Host tidepool with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/tidepool)

## About

Tidepool is a fast, S3-native vector database for scalable similarity search. It combines HNSW/IVF vector indexing with BM25 full-text search, enabling hybrid semantic and keyword queries. Designed for cost-effective cloud deployment using object storage as the primary data store.

Tidepool deploys as two stateless services: a query service for read-only vector search and an ingest service for writes and background compaction. Both services connect to S3-compatible object storage (like Railway Object Storage) as the source of truth. The architecture eliminates distributed consensus complexity—services scale horizontally by simply adding replicas that read from the same S3 bucket. Optional persistent volumes at /data enable segment caching for reduced S3 reads and faster queries.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tidepool-ingest | `ghcr.io/milannair/tidepool-ingest:0.1.2` | Web service |
| Redis | `redis:8.4.0` | Database |
| tidepool-query | `ghcr.io/milannair/tidepool-query:0.1.2` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `AWS_SECRET_ACCESS_KEY` | tidepool-ingest | (secret) |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `AWS_SECRET_ACCESS_KEY` | tidepool-query | (secret) |

## Configuration

- **Start command:** `/tidepool-ingest`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/tidepool-query`

**Category:** Starters

[View on Railway →](https://railway.com/template/tidepool)
