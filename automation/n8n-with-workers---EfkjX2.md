# Deploy n8n with workers on Railway

A complete setup for n8n with workers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/EfkjX2)

## About

Instantly create a n8n instance in queue mode with a worker. This allows for infinite horizontal scaling. Simply increase the number of replicas for the n8n worker instance, and n8n will distribute the work across them.

You can also setup webhook processors by configuring a load balancer.

https://docs.n8n.io/hosting/scaling/queue-mode/#webhook-processors

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n worker | `n8nio/n8n` | Worker |
| Redis | `bitnami/redis` | Database |
| n8n main instance | [Tudulabs/n8n3](https://github.com/Tudulabs/n8n3) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | n8n worker | 5679 | - |
| `DB_TYPE` | n8n worker | postgresdb | - |
| `N8N_METRICS` | n8n worker | true | - |
| `N8N_LOG_LEVEL` | n8n worker | debug | - |
| `N8N_AI_ENABLED` | n8n worker | false | - |
| `EXECUTIONS_MODE` | n8n worker | queue | - |
| `N8N_AI_PROVIDER` | n8n worker | openai | - |
| `DB_POSTGRESDB_PORT` | n8n worker | 5432 | - |
| `DB_POSTGRESDB_USER` | n8n worker | (secret) | - |
| `EXECUTIONS_TIMEOUT` | n8n worker | -1 | - |
| `EXECUTIONS_DATA_PRUNE` | n8n worker | true | - |
| `N8N_AI_OPENAI_API_KEY` | n8n worker | (secret) | - |
| `DB_POSTGRESDB_PASSWORD` | n8n worker | (secret) | - |
| `EXECUTIONS_TIMEOUT_MAX` | n8n worker | 3600 | - |
| `EXECUTIONS_DATA_MAX_AGE` | n8n worker | 336 | - |
| `QUEUE_HEALTH_CHECK_PORT` | n8n worker | 5680 | - |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n worker | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | n8n worker | (secret) | - |
| `QUEUE_HEALTH_CHECK_ACTIVE` | n8n worker | TRUE | - |
| `EXECUTIONS_DATA_SAVE_ON_ERROR` | n8n worker | all | - |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | n8n worker | 10000 | - |
| `EXECUTIONS_DATA_SAVE_ON_SUCCESS` | n8n worker | all | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | n8n worker | TRUE | - |
| `EXECUTIONS_DATA_SAVE_ON_PROGRESS` | n8n worker | false | - |
| `EXECUTIONS_DATA_HARD_DELETE_BUFFER` | n8n worker | 1 | - |
| `EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS` | n8n worker | true | - |
| `EXECUTIONS_DATA_PRUNE_HARD_DELETE_INTERVAL` | n8n worker | 15 | - |
| `EXECUTIONS_DATA_PRUNE_SOFT_DELETE_INTERVAL` | n8n worker | 60 | - |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | - | Port to connect to Redis, used by the Data panel. |
| `REDISUSER` | Redis | default | Default user to connect to Redis, needed for the Data panel. |
| `REDIS_URL` | Redis | - | URL to connect to Redis, used for Data panel. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis, needed for the Data panel. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PRIVATE_URL` | Redis | - | URL to connect to Redis over private network. |
| `PORT` | n8n main instance | 5678 | - |
| `N8N_METRICS` | n8n main instance | true | Whether to enable the /metrics endpoint. |
| `WEBHOOK_URL` | n8n main instance | - | the URL of your main n8n service |
| `N8N_LOG_LEVEL` | n8n main instance | debug | Log output level. info, warn, error, verbose, debug |
| `N8N_AI_ENABLED` | n8n main instance | false | Whether AI features are enabled (true) or not (false). Enables Ask AI for the HTTP node. |
| `EXECUTIONS_MODE` | n8n main instance | queue | - |
| `N8N_AI_PROVIDER` | n8n main instance | openai | The AI provider to use. Currently, n8n only supports OpenAI. |
| `N8N_USER_FOLDER` | n8n main instance | /n8n/volume | - |
| `DB_POSTGRESDB_PORT` | n8n main instance | 5432 | - |
| `DB_POSTGRESDB_USER` | n8n main instance | (secret) | - |
| `EXECUTIONS_TIMEOUT` | n8n main instance | -1 | Sets a default timeout (in seconds) to all workflows after which n8n stops their execution. Users can override this for individual workflows up to the duration set in EXECUTIONS_TIMEOUT_MAX. Set EXECUTIONS_TIMEOUT to -1 to disable. |
| `N8N_ENCRYPTION_KEY` | n8n main instance | - | Provide a custom key used to encrypt credentials in the n8n database. By default n8n generates a random key on first launch. |
| `EXECUTIONS_DATA_PRUNE` | n8n main instance | true | Maximum number of executions to keep in the database. 0 = no limit |
| `N8N_AI_OPENAI_API_KEY` | n8n main instance | (secret) | Your OpenAI API key. |
| `DB_POSTGRESDB_PASSWORD` | n8n main instance | (secret) | - |
| `EXECUTIONS_TIMEOUT_MAX` | n8n main instance | 3600 | The maximum execution time (in seconds) that users can set for an individual workflow. |
| `EXECUTIONS_DATA_MAX_AGE` | n8n main instance | 336 | The execution age (in hours) before it's deleted. |
| `QUEUE_BULL_REDIS_PASSWORD` | n8n main instance | (secret) | - |
| `QUEUE_BULL_REDIS_USERNAME` | n8n main instance | (secret) | - |
| `EXECUTIONS_DATA_SAVE_ON_ERROR` | n8n main instance | all | Whether n8n saves execution data on error. |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | n8n main instance | 10000 | Maximum number of executions to keep in the database. 0 = no limit |
| `EXECUTIONS_DATA_SAVE_ON_SUCCESS` | n8n main instance | all | Whether n8n saves execution data on success. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | n8n main instance | TRUE | To properly allow private networking to the database |
| `EXECUTIONS_DATA_SAVE_ON_PROGRESS` | n8n main instance | false | Whether to save progress for each node executed (true) or not (false). |
| `EXECUTIONS_DATA_HARD_DELETE_BUFFER` | n8n main instance | 1 | How old (hours) the finished execution data has to be to get hard-deleted. By default, this buffer excludes recent executions as the user may need them while building a workflow. |
| `EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS` | n8n main instance | true | Whether to save data of executions when started manually. |
| `EXECUTIONS_DATA_PRUNE_HARD_DELETE_INTERVAL` | n8n main instance | 15 | How often (minutes) execution data should be hard-deleted. |
| `EXECUTIONS_DATA_PRUNE_SOFT_DELETE_INTERVAL` | n8n main instance | 60 | How often (minutes) execution data should be soft-deleted. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |

## Configuration

- **Start command:** `n8n worker --concurrency=10`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Healthcheck:** `healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/n8n/volume`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/EfkjX2)
