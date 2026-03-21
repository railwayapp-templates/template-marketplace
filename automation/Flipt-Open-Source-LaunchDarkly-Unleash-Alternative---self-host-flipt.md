# Deploy Flipt | Open Source LaunchDarkly & Unleash Alternative on Railway

Self-host Flipt. Feature flags, A/B testing, Progressive Rollouts, gRPC

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/self-host-flipt)

## About

Flipt is a performance-focused, open-source feature flag platform that lets development teams control feature rollouts, run A/B tests, and toggle code paths dynamically — without redeploying applications. Built in Go as a single binary, it's designed for teams who want full ownership of their flag data with no vendor lock-in or per-seat pricing. 

Self-host Flipt on Railway with this one-click template and get a production-ready stack pre-wired with PostgreSQL for persistent flag storage and Redis for sub-millisecond evaluation caching — all connected via private networking out of the box.

![Flipt Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1774030056/flipt_dashboard_syku1s.png)

Flipt is an enterprise-ready, Git-native feature management platform written in Go. It stores flag configuration in PostgreSQL (this template) or directly in Git repositories as YAML, and evaluates flags over both gRPC and REST APIs. Key features include:

- **Flag types**: Boolean flags, multivariate flags, and percentage rollouts
- **Targeting rules**: Segment users by custom constraints and attributes
- **OpenFeature support**: Compatible with the vendor-neutral OpenFeature evaluation standard
- **SDKs**: Client-side (JS/TS, React, Android) and server-side (Go, Python, Ruby, Java, .NET, PHP, Node)
- **Redis caching**: Millisecond-level evaluation latency at scale
- **REST + gRPC APIs**: Evaluate flags from any language or framework
- **Web UI**: React-based dashboard for non-CLI flag management

In this template, Flipt connects to PostgreSQL over Railway's private network for flag storage and to Redis for caching evaluated responses. The cache TTL is set to 60 seconds by default.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Flipt | `flipt/flipt:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Flipt | 8080 | HTTP server listening port |
| `FLIPT_DB_URL` | Flipt | - | Postgres database connection string |
| `FLIPT_CACHE_TTL` | Flipt | 60s | Cache time-to-live duration |
| `FLIPT_LOG_LEVEL` | Flipt | info | Application logging level setting |
| `FLIPT_CACHE_BACKEND` | Flipt | redis | Cache backend type configuration |
| `FLIPT_CACHE_ENABLED` | Flipt | true | Enable caching for performance improvement |
| `FLIPT_CACHE_REDIS_HOST` | Flipt | - | Redis host for cache backend |
| `FLIPT_CACHE_REDIS_PORT` | Flipt | - | Redis port for cache backend |
| `FLIPT_CACHE_REDIS_PASSWORD` | Flipt | (secret) | Redis password for cache auth |
| `FLIPT_META_TELEMETRY_ENABLED` | Flipt | false | Disable anonymous usage telemetry |
| `FLIPT_AUTHENTICATION_REQUIRED` | Flipt | false | Require authentication for all requests |
| `FLIPT_AUTHENTICATION_METHODS_TOKEN_ENABLED` | Flipt | (secret) | Enable token-based authentication method |
| `FLIPT_AUTHENTICATION_METHODS_TOKEN_BOOTSTRAP_TOKEN` | Flipt | (secret) | Bootstrap token for initial authentication |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/self-host-flipt)
