# Deploy Dragonfly on Railway

A data store built for modern workloads

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dragonfly)

## About

<p align="center">
  <a href="https://dragonflydb.io">
    <img src="https://github.com/dragonflydb/dragonfly/raw/main/.github/images/logo-full.svg" width="350" alt="Dragonfly">
  </a>
</p>

## The world's most efficient in-memory data store

Dragonfly is a drop-in Redis® replacement that is optimized for data-intensive, low latency applications. Applications built on Dragonfly get the full speed, reliability, and scalability that modern cloud hardware makes possible, allowing them to deliver incredible experiences to their users while reducing both costs and complexity.

Fully compatible with Redis and Memcached APIs, Dragonfly requires no code changes to adopt. Compared to legacy in-memory datastores, Dragonfly delivers 25X more throughput, higher cache hit rates with lower tail latency, and can run on up to 80% less resources for the same sized workload.

Dragonfly currently supports ~185 Redis commands and all Memcached commands besides cas. Almost on par with the Redis 5 API, Dragonfly's next milestone will be to stabilize basic functionality and implement the replication API. If there is a command you need that is not implemented yet, please open an issue.

## Overview

- Dragonfly is deployed with their [ghcr.io/dragonflydb/dragonfly](https://github.com/dragonflydb/dragonfly/pkgs/container/dragonfly) Docker image

- A volume is mounted to the service to persist data between builds.

- TCP proxying is configured to allow accessing the database from anywhere.

## How to use

Reference the `DRAGONFLY_PRIVATE_URL` variable in your service, and then use the environment variable in your application. e.g.

```
DRAGONFLY_URL=${{Dragonfly.DRAGONFLY_PRIVATE_URL}}
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Dragonfly | `ghcr.io/dragonflydb/dragonfly` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DRAGONFLY_URL` | - | URL to connect to Dragonfly |
| `DRAGONFLY_HOST` | - | Railway private domain name |
| `DRAGONFLY_PORT` | 6379 | Port to connect to Dragonfly over the private network |
| `DRAGONFLY_USER` | (secret) | Default user to connect to Dragonfly |
| `DRAGONFLY_PASSWORD` | (secret) | Password to connect to Dragonfly |
| `DRAGONFLY_PUBLIC_URL` | - | URL to connect to Dragonfly over the public network |
| `DRAGONFLY_PUBLIC_HOST` | - | Railway public domain name |
| `DRAGONFLY_PUBLIC_PORT` | - | Port to connect to Dragonfly Publically |

## Configuration

- **Start command:** `/bin/sh -c "exec dragonfly --logtostderr --requirepass=${DRAGONFLY_PASSWORD} --bind '::'"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/dragonfly)
