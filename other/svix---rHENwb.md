# Deploy svix on Railway

svix-webhooks based on official Dockerfile

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rHENwb)

## About

[Svix](https://www.svix.com/) is an enterprise-ready webhook service that simplifies the process of sending webhooks for developers. Rather than building and maintaining complex webhook infrastructure, developers can make a single API call to Svix, which then handles all critical aspects of webhook delivery:

Key Features:
- Reliable deliverability with automatic retries
- Built-in security features including webhook signature verification
- Support for both symmetric (default, faster) and asymmetric signatures
- Comprehensive webhook management and monitoring
- Support for multiple databases (PostgreSQL) and message queues (Redis)

The project provides official client libraries for multiple programming languages:
- Go
- Python
- TypeScript/JavaScript
- Java
- Kotlin
- Ruby
- C# (.NET)
- Rust
- PHP

Technical Details:
- Server written in Rust
- Requires PostgreSQL for storage
- Optional Redis dependency (v6.2.0+) for task queue and caching
- Configurable via environment variables, .env files, or config.toml
- Support for OpenTelemetry for tracing and monitoring
- Built-in SSRF protection against internal IP addresses
- JWT-based authentication system
- Operational webhooks feature for monitoring system events


The project is open source under the MIT license and maintains active community support through:
- GitHub Issues for bug reports and feature requests
- Community Forum for discussions
- Slack community for real-time chat

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis:7.2.5` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| svix-server | `svix/svix-server:latest` | Web service |

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
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | svix-server | 8071 | - |
| `SVIX_JWT_SECRET` | svix-server | (secret) | - |
| `SVIX_QUEUE_TYPE` | svix-server | redis | - |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `svix-server --run-migrations`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/rHENwb)
