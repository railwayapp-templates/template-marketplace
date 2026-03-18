# Deploy Serverless Redis on Railway

High Performance HTTP server for Redis with Upstash compatibility.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/serverless-redis)

## About

Serverless Redis is a high-performance HTTP server that wraps Redis with an Upstash-compatible REST API. Built with Rust and Axum, it lets you use Upstash client libraries with your own Redis instance, giving you full control over your data.

This service runs a lightweight Rust HTTP server that bridges HTTP clients to your Redis instance. It handles bearer token authentication, supports single commands and pipelines, and uses connection pooling for performance. Deploy it once and access Redis from anywhere using simple HTTP requests—perfect for serverless functions and edge computing where TCP connections aren't available.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| luggapugga/serverless-redis:latest | `ghcr.io/luggapugga/serverless-redis:latest` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SR_TOKEN` | luggapugga/serverless-redis:latest | (secret) | The token to authenticate with |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/serverless-redis)
