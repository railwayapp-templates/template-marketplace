# Deploy Serverless Redis on Railway

Redis HTTP Server (Upstash compatibility) 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hBFwO4)

## About

### Redis HTTP Server with Upstash compatibility

This template is an HTTP server that interacts with the Redis database via HTTP requests. It supports compatibility with Upstash, a cloud service that provides Redis.

### Technologies used:
- **Hono**: A lightweight framework for building high-performance HTTP servers in TypeScript. In this template, Hono is used to handle HTTP requests.
- **Nx**: A project management tool that helps organize code and dependencies. It is used to structure the application and run tasks such as build, testing, and deployment.

### Why use this template:
- Simple setup and high performance thanks to Hono.
- Nx helps manage the project and dependencies, making development more convenient.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| http | `ghcr.io/ikatsuba/serverless-redis:latest` | Database |
| Redis | `redis/redis-stack` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | http | :: | - |
| `PORT` | http | 8080 | Port |
| `SR_TOKEN` | http | (secret) | Super secret token |
| `REDIS_URL` | http | - | Private Redis URL |
| `PUBLIC_URL` | http | - | Public URL |
| `PRIVATE_URL` | http | - | Private URL |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | http | true | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/hBFwO4)
