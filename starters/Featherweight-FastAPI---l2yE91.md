# Deploy Featherweight (FastAPI) on Railway

A lightweight FastAPI starter, with some batteries included.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/l2yE91)

## About

## 🪶 Featherweight Template

_A lightweight FastAPI starter that packs a punch, with some batteries included._

**Get more done with less** by relying on powerful open-source tools to do the heavy lifting.

- FastAPI generates and handles REST endpoints compliant with HTTP spec
- Automatic API doc generation with OpenAPI
- Request & Response validation powered by Pydantic
- Great type support with the native Python type hint system
- Lightning fast caching with Redis
- Built-in and configurable rate limiting to prevent API abuse

Rather than starting with a template that requires you to rip all sorts of things out, this template starts with a minimal amount of code in a flat directory to let you kick the tires and expand from there.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis` | Database |
| featherweight | [gillkyle/featherweight](https://github.com/gillkyle/featherweight) | Web service |

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

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python

[View on Railway →](https://railway.com/deploy/l2yE91)
