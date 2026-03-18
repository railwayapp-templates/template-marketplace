# Deploy xtdb on Railway

A single node XTDB deployment

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/i-rqKj)

## About

XTDB is an open-source, bitemporal database designed to handle complex and regulated data. This template brings up a single XTDB (v2) node deployment with Kafka and MinIO as Object Storage. You likely want to scale the number of XTDB nodes and number of MinIO buckets for a production setup. 

Github: https://github.com/xtdb/xtdb

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| minio-console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Web service |
| kafka | `confluentinc/cp-kafka:7.7.1` | Database |
| minio | `minio/minio` | Database |
| xtdb-railway | [FiV0/xtdb-railway](https://github.com/FiV0/xtdb-railway) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | minio-console | 9090 |
| `PASSWORD` | minio-console | (secret) |
| `K_PORT` | kafka | 29092 |
| `CLUSTER_ID` | kafka | 1 |
| `KAFKA_NODE_ID` | kafka | 1 |
| `KAFKA_LISTENERS` | kafka | PLAINTEXT://kafka:29092,CONTROLLER://kafka:29093,PLAINTEXT_HOST://0.0.0.0:9092 |
| `KAFKA_PROCESS_ROLES` | kafka | broker,controller |
| `KAFKA_ADVERTISED_LISTENERS` | kafka | PLAINTEXT://kafka:29092,PLAINTEXT_HOST://localhost:9092 |
| `KAFKA_CONTROLLER_QUORUM_VOTERS` | kafka | 1@kafka:29093 |
| `KAFKA_CONTROLLER_LISTENER_NAMES` | kafka | CONTROLLER |
| `KAFKA_INTER_BROKER_LISTENER_NAME` | kafka | PLAINTEXT |
| `KAFKA_LISTENER_SECURITY_PROTOCOL_MAP` | kafka | CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT |
| `KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR` | kafka | 1 |
| `MINIO_ROOT_USER` | minio | (secret) |
| `MINIO_PRIVATE_PORT` | minio | 9000 |
| `MINIO_ROOT_PASSWORD` | minio | (secret) |
| `AWS_REGION` | xtdb-railway | aws-iso-global |
| `SECRET_KEY` | xtdb-railway | (secret) |
| `HEALTH_PORT` | xtdb-railway | 8080 |
| `XTDB_LOG_TOPIC` | xtdb-railway | xt-log |
| `XTDB_S3_BUCKET` | xtdb-railway | xtdb-bucket |
| `AWS_S3_FORCE_PATH_STYLE` | xtdb-railway | true |

## Configuration

- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "mkdir -p /data/xtdb-bucket && exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/live`
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/xtdb`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/i-rqKj)
