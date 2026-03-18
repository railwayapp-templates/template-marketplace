# Deploy Authorizer on Railway

Open-source authentication and authorization solution for your business.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/authorizer)

## About

## Overview

Authorizer is an open-source authentication and authorization solution that comes with easy to integrate frontend SDKs while also allowing you to bring your own database. You can think of it as a self-hosted alternative to [Auth0](https://auth0.com/).

## Highlights

- Deploy production-ready [authorizer.dev](https://authorizer.dev/) instance with PostgreSQL / MySQL and Redis for free and build with it in 30seconds
- One-click deploys with the required PostgreSQL and Redis databases automatically provisioned

## Learn More

- [Authorizer Environment Variables](https://docs.authorizer.dev/core/env)
- [GitHub](https://github.com/authorizerdev/authorizer/releases)
- [DockerHub](https://hub.docker.com/r/lakhansamani/authorizer)
- [Deploying Authorizer on Railway [Video]](https://www.youtube.com/watch?v=lSDKbKmyBD0)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| authorizer | [authorizerdev/authorizer-railway](https://github.com/authorizerdev/authorizer-railway) | Web service |

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
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication · **Tags:** authentication, authorization · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/authorizer)
