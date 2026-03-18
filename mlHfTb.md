# Deploy Abacus on Railway

A highly-scalable and stateless counting API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/mlHfTb)

## About

This API allows you to create simple numeric counters. IaaS, Integer as a Service.

The API can be boiled down to:

- Create & Increment a counter
- View a counter's data

All counters are “unlisted” - accessible if you know the key but not publicly listed anywhere.

Want to track the number of hits a page had? Sure.
Want to know the number of users that clicked on the button “Press me”? There you go.

API documentation is available at https://jasoncameron.dev/abacus.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| abacus | [JasonLovesDoggo/abacus](https://github.com/JasonLovesDoggo/abacus) | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | abacus | 8080 | - |
| `TESTING` | abacus | false | - |
| `REDIS_DB` | abacus | 0 | - |
| `REDIS_PASSWORD` | abacus | (secret) | - |
| `REDIS_USERNAME` | abacus | (secret) | - |
| `RATELIMIT_ENABLED` | abacus | true | - |
| `API_ANALYTICS_ENABLED` | abacus | false | - |
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

**Category:** Other · **Languages:** Go, JavaScript, Dockerfile, Python

[View on Railway →](https://railway.com/template/mlHfTb)
