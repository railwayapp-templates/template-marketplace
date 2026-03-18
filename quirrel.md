# Deploy Quirrel on Railway

A simple job queue service

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/quirrel)

## About

## Overview

Quirrel makes job queues simple as cake, enabling features like delayed execution, and cron scheduling.

## Highlights

- First-class support selected frameworks NextJS and Blitz
- End-to-end encryption
- Open source codebase

## Learn More

View the official [Quirrel](https://quirrel.dev/) website.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| quirrel | [quirrel-dev/quirrel-on-railway](https://github.com/quirrel-dev/quirrel-on-railway) | Web service |
| Redis | `bitnami/redis` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PASSPHRASES` | quirrel | - | A 32 character secret. |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Queues · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/quirrel)
