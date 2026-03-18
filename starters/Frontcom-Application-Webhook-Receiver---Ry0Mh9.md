# Deploy Front.com Application Webhook Receiver on Railway

Application Webhook receiver for Front

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Ry0Mh9)

## About

A Front Application Webhook processing application template optimized for deployment on Railway.

This template provides a robust foundation for handling events received from an Application Webhook with payload validation, integrity checking and built-in queue processing to allow you to process events asynchronously at scale.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis:7.2.5` | Database |
| Front Application Webhook | [dugjason/front-application-webhook-railway-tpl](https://github.com/dugjason/front-application-webhook-railway-tpl) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `PORT` | Front Application Webhook | 3000 | - |
| `REDIS_USER` | Front Application Webhook | (secret) | - |
| `REDIS_PASSWORD` | Front Application Webhook | (secret) | - |
| `FRONT_APP_SECRET` | Front Application Webhook | (secret) | Add your Front Application secret |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/Ry0Mh9)
