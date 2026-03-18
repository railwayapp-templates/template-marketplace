# Deploy Abacus on Railway

[Updated Mar '26] Host Latest Version of Abacus on Railway with one click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/abacus)

## About

**What is Abacus?**  
Abacus is a modern, open-source integer counter API (“Integer as a Service”) that lets developers track numeric events—such as website hits, button clicks, or custom metrics—using simple, unlisted counters. Abacus provides a lightweight, serverless-compatible solution for tracking usage analytics, feature adoption, or any integer-based metric via HTTP, with CORS and scalable backend.

Hosting Abacus on Railway enables developers to quickly launch their own real-time API for tracking counters and analytics events. Simply deploy the Abacus Docker image or Node.js service to Railway, configure a key-value backend like Valkey (or Redis), and set up your domains/namespaces. Railway automates infrastructure, persistent storage, environment management, security, and scaling needs. Developers can expose secure HTTPS endpoints for increment, get, reset, and badge SVG rendering, all with high-performance serverless infrastructure and built-in rate limiting.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| abacus | [Shinyduo/abacus-railway](https://github.com/Shinyduo/abacus-railway) | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | abacus | 8080 |
| `TESTING` | abacus | false |
| `REDIS_DB` | abacus | 0 |
| `REDIS_PASSWORD` | abacus | (secret) |
| `REDIS_USERNAME` | abacus | (secret) |
| `RATELIMIT_ENABLED` | abacus | true |
| `API_ANALYTICS_ENABLED` | abacus | false |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other · **Languages:** Go, JavaScript, Dockerfile, Python

[View on Railway →](https://railway.com/template/abacus)
