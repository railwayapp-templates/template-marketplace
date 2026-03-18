# Deploy n8n Enterprise-Ready Stack on Railway

🚀 Infinite Scaling n8n + worker + PostgreSQL HA + Redis + Python Runer

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-enterprise-ready-stack)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/YOUR_TEMPLATE_ID)

**n8n Enterprise-Ready Stack** is a production-grade, self-hosted workflow automation platform combining n8n with PostgreSQL HA and Redis for queue management. Deploy with a single click and get infinite horizontal scaling, automatic failover, and enterprise reliability.

---

Deploying n8n in production requires a robust database, a queue system for high-volume executions, and the ability to scale workers. This template provides:

- **PostgreSQL HA** with Primary-Replica replication
- **Redis** for queue-based execution and scaling
- **n8n Main Instance** serving web UI and webhooks
- **n8n Workers** processing executions in parallel
- **External Task Runner** for secure, isolated code execution (Python/JS)

Everything deploys automatically with proper networking, health checks, and restart policies.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres-18-replica | [icueth/n8n-PostgresHA-RedisHA](https://github.com/icueth/n8n-PostgresHA-RedisHA) (root: /postgresql-18-ha) | Database |
| n8n-worker | [icueth/n8n-PostgresHA-RedisHA](https://github.com/icueth/n8n-PostgresHA-RedisHA) (root: /n8n-worker) | Worker |
| postgres-18-proxy | [icueth/n8n-PostgresHA-RedisHA](https://github.com/icueth/n8n-PostgresHA-RedisHA) (root: /postgresql-18-ha) | TCP service |
| postgres-18-primary | [icueth/n8n-PostgresHA-RedisHA](https://github.com/icueth/n8n-PostgresHA-RedisHA) (root: /postgresql-18-ha) | Database |
| n8n | [icueth/n8n-PostgresHA-RedisHA](https://github.com/icueth/n8n-PostgresHA-RedisHA) (root: /n8n) | Web service |
| n8n-task-runner | [icueth/n8n-PostgresHA-RedisHA](https://github.com/icueth/n8n-PostgresHA-RedisHA) (root: /n8n-task-runner) | Worker |
| Redis-n8n | [icueth/n8n-PostgresHA-RedisHA](https://github.com/icueth/n8n-PostgresHA-RedisHA) (root: /redis) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ROLE` | postgres-18-replica | REPLICA | - |
| `POSTGRES_USER` | postgres-18-replica | (secret) | - |
| `POSTGRES_PASSWORD` | postgres-18-replica | (secret) | - |
| `N8N_LOG_LEVEL` | n8n-worker | - | --- Task Runners --- |
| `GENERIC_TIMEZONE` | n8n-worker | - | --- Database Configuration --- |
| `DB_POSTGRESDB_USER` | n8n-worker | (secret) | - |
| `N8N_ENCRYPTION_KEY` | n8n-worker | - | --- Logging --- |
| `DB_POSTGRESDB_PASSWORD` | n8n-worker | (secret) | - |
| `N8N_RUNNERS_AUTH_TOKEN` | n8n-worker | (secret) | - |
| `N8N_NATIVE_PYTHON_RUNNER` | n8n-worker | - | --- Worker Configuration --- |
| `DB_POSTGRESDB_SSL_ENABLED` | n8n-worker | - | --- Queue Configuration (Redis) --- |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n-worker | (secret) | --- Security --- |
| `N8N_CONCURRENCY_PRODUCTION_LIMIT` | n8n-worker | 10 | - |
| `NODE_ROLE` | postgres-18-proxy | PROXY | - |
| `POSTGRES_USER` | postgres-18-proxy | (secret) | - |
| `POSTGRES_PASSWORD` | postgres-18-proxy | (secret) | - |
| `NODE_ROLE` | postgres-18-primary | PRIMARY | - |
| `POSTGRES_USER` | postgres-18-primary | (secret) | - |
| `POSTGRES_PASSWORD` | postgres-18-primary | (secret) | - |
| `TZ` | n8n | Asia/Bangkok | - |
| `DB_TYPE` | n8n | postgresdb | - |
| `N8N_METRICS` | n8n | true | - |
| `WEBHOOK_URL` | n8n | - | --- Logging & Monitoring --- |
| `N8N_PROTOCOL` | n8n | https | - |
| `N8N_LOG_LEVEL` | n8n | info | - |
| `EXECUTIONS_MODE` | n8n | queue | - |
| `GENERIC_TIMEZONE` | n8n | Asia/Bangkok | --- Database Configuration --- |
| `N8N_RUNNERS_MODE` | n8n | external | - |
| `N8N_SECURE_COOKIE` | n8n | true | --- Host & Protocol --- |
| `DB_POSTGRESDB_PORT` | n8n | 5432 | - |
| `DB_POSTGRESDB_USER` | n8n | (secret) | - |
| `N8N_ENCRYPTION_KEY` | n8n | 16a372354ccce4f012d70c17f1a1085b | - |
| `N8N_RUNNERS_ENABLED` | n8n | true | - |
| `EXECUTIONS_DATA_PRUNE` | n8n | true | - |
| `N8N_TEMPLATES_ENABLED` | n8n | true | --- Execution Data Management --- |
| `QUEUE_BULL_REDIS_PORT` | n8n | 6379 | - |
| `DB_POSTGRESDB_DATABASE` | n8n | n8n | - |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | - |
| `N8N_RUNNERS_AUTH_TOKEN` | n8n | (secret) | - |
| `EXECUTIONS_DATA_MAX_AGE` | n8n | 168 | - |
| `N8N_DIAGNOSTICS_ENABLED` | n8n | false | - |
| `N8N_NATIVE_PYTHON_RUNNER` | n8n | true | --- Worker Configuration --- |
| `DB_POSTGRESDB_SSL_ENABLED` | n8n | false | --- Queue Configuration (Redis) --- |
| `N8N_HIRING_BANNER_ENABLED` | n8n | false | --- Templates --- |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n | (secret) | - |
| `QUEUE_HEALTH_CHECK_ACTIVE` | n8n | true | --- Security & Authentication --- |
| `EXECUTIONS_DATA_SAVE_ON_ERROR` | n8n | all | - |
| `N8N_USER_MANAGEMENT_JWT_SECRET` | n8n | (secret) | - |
| `EXECUTIONS_DATA_SAVE_ON_SUCCESS` | n8n | all | - |
| `N8N_RUNNERS_BROKER_LISTEN_ADDRESS` | n8n | 0.0.0.0 | - |
| `N8N_VERSION_NOTIFICATIONS_ENABLED` | n8n | false | - |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | n8n | true | - |
| `EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS` | n8n | true | --- Task Runners --- |
| `N8N_RUNNERS_AUTH_TOKEN` | n8n-task-runner | (secret) | - |
| `REDIS_PASSWORD` | Redis-n8n | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 5432
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/n8n-enterprise-ready-stack)
