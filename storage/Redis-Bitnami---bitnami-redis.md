# Deploy Redis (Bitnami) on Railway

Redis key-value data store

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bitnami-redis)

## About

Redis is a popular open-source in-memory data structure store that provides high-performance caching, session storage, and real-time data processing capabilities. It is widely used for web applications, microservices architectures, and various enterprise solutions that require fast data access and real-time features.

Hosting Redis gives you access to a high-performance in-memory database capable of handling concurrent connections and managing data persistence. Redis offers flexible data structure support, comprehensive authentication systems, and efficient memory allocation. The database excels at sub-millisecond response times, advanced data structures like sets and hashes, and built-in pub/sub messaging. Redis deployments benefit from scalable CPU, RAM, and storage resources while supporting enterprise-grade network security through Railway's private network capabilities. Railway provides automated backup systems and comprehensive logging to support your database operations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `railwayapp/redis:8.2` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `REDISHOST` | - | Railway Private Domain Name. |
| `REDISPORT` | 6379 | Port to connect to Redis. |
| `REDISUSER` | default | Default user to connect to Redis. |
| `REDIS_URL` | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | no | Disable writing to AOF file. |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/bitnami-redis)
