# Deploy curatedotfun-rss-service on Railway

Lightweight, scalable, easy-to-deploy RSS feed service

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/pfvWZK)

## About

A lightweight, scalable RSS feed service built with Hono.js and Upstash Redis. This service allows you to create and manage RSS feeds programmatically through a simple REST API. It's designed to work seamlessly with the `@curatedotfun/rss` plugin in the curate.fun ecosystem.

Deploy and configure your RSS feed in the curate.config.json.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rss-service-template | [potlock/rss-service-template](https://github.com/potlock/rss-service-template) | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `API_SECRET` | rss-service-template | (secret) | - |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Blogs · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/template/pfvWZK)
