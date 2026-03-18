# Deploy Cassandra on Railway

Deploy and Host Cassandra with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/cassandra)

## About

Apache Cassandra is a highly scalable, distributed NoSQL database designed for handling large amounts of data across commodity servers. It provides high availability with no single point of failure, linear scalability, and excellent performance for write-heavy workloads with eventual consistency.

Hosting Cassandra involves deploying a distributed database system that can scale horizontally across multiple nodes. This template uses the Bitnami Cassandra Docker image, which simplifies configuration through environment variables and provides better security defaults. The deployment includes authentication setup, persistent storage configuration, and network accessibility.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Cassandra | `cassandra:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MAX_HEAP_SIZE` | 4G |

## Configuration

- **TCP Proxies:** 9042
- **Volume:** `/var/lib/cassandra`

**Category:** Storage

[View on Railway →](https://railway.com/template/cassandra)
