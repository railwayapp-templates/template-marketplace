# Deploy BullMQ with BullBoard on Railway

A queueing solution with a dashboard to visualize, monitor, retry and...

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/odzp-I)

## About

## Overview

BullMQ is a Node.js library that implements a fast and robust queue system built on top of Redis that helps in resolving many modern age micro-services architectures.

This template deploys a robust queueing system on Railway using BullMQ and Redis.

## Highlights

- A queueing system with BullMQ and Redis
- A dashboard built with `bull-board`
- A Fastify server to trigger jobs via an `/add-job` API endpoint

## Learn More

- [BullMQ](https://bullmq.io/)
- [Queues on Railway](https://blog.railway.app/p/queues)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis` | Database |
| queue-service | [railwayapp-templates/fastify-bullmq](https://github.com/railwayapp-templates/fastify-bullmq) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | - | Port to connect to Redis, used by the Data panel. |
| `REDISUSER` | Redis | default | Default user to connect to Redis, needed for the Data panel. |
| `REDIS_URL` | Redis | - | URL to connect to Redis, used for Data panel. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis, needed for the Data panel. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PRIVATE_URL` | Redis | - | URL to connect to Redis over private network. |
| `REDISPASSWORD` | queue-service | (secret) | - |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Networking:** Public domain with automatic HTTPS

**Category:** Queues · **Tags:** queues, JavaScript, TypeScript · **Languages:** TypeScript

[View on Railway →](https://railway.com/template/odzp-I)
