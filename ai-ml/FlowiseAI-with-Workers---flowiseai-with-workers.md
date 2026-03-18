# Deploy FlowiseAI with Workers on Railway

Flowise AI with Workers - persisted volume, PostGIS & private networking.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowiseai-with-workers)

## About

FlowiseAI with Workers is an upgraded deployment that enables queue-based processing for large-scale AI predictions. This template allows you to run over 10,000 concurrent predictions in parallel with comprehensive job monitoring and status tracking capabilities.

Hosting FlowiseAI with Workers involves deploying a scalable AI workflow platform that leverages queue processing for high-throughput operations. The deployment includes pre-configured persisted volumes, PostGIS database integration, and a queue dashboard for monitoring jobs, statuses, and results. The architecture utilizes Railway's internal private network for secure database communication, reducing egress fees while maintaining optimal performance. This setup is ideal for applications requiring massive parallel processing capabilities with enterprise-grade reliability and monitoring.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Flowise | [protemplate/flowiseai-railway](https://github.com/protemplate/flowiseai-railway) | Web service |
| Postgis | `postgis/postgis:16-3.5` | Database |
| FlowiseWorker | [protemplate/flowiseai-railway](https://github.com/protemplate/flowiseai-railway) | Database |
| Redis | `bitnamilegacy/redis:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MODE` | Flowise | queue | - |
| `LOG_PATH` | Flowise | /opt/flowise/.flowise/logs | Location where log files are stored |
| `QUEUE_NAME` | Flowise | flowise-queue | - |
| `APIKEY_PATH` | Flowise | /opt/flowise/.flowise | Location where API keys are saved |
| `STORAGE_TYPE` | Flowise | local | Type of storage for uploaded files. default is local |
| `DATABASE_HOST` | Flowise | - | Private or Public Host URL - i.e. postgis.railway.internal |
| `DATABASE_NAME` | Flowise | flowise | Database name (When DATABASE_TYPE is not sqlite) |
| `DATABASE_PATH` | Flowise | /opt/flowise/.flowise | Location where database is saved (When DATABASE_TYPE is sqlite) |
| `DATABASE_PORT` | Flowise | - | Private or Public database port (When DATABASE_TYPE is not sqlite) - i.e. 5432 |
| `DATABASE_TYPE` | Flowise | postgres | Type of database to store the flowise data - i.e. sqlite, mysql, postgres |
| `DATABASE_USER` | Flowise | (secret) | Database username (When DATABASE_TYPE is not sqlite) - i.e. postgres |
| `SECRETKEY_PATH` | Flowise | (secret) | Location where encryption key (used to encrypt/decrypt credentials) is saved |
| `FLOWISE_PASSWORD` | Flowise | (secret) | Password to login |
| `FLOWISE_USERNAME` | Flowise | (secret) | Username to login |
| `BLOB_STORAGE_PATH` | Flowise | /opt/flowise/.flowise/storage | Location where uploaded files are saved when STORAGE_TYPE is local |
| `DATABASE_PASSWORD` | Flowise | (secret) | Database password (When DATABASE_TYPE is not sqlite) |
| `OVERRIDE_DATABASE` | Flowise | false | Database Synchronization on every application launch. |
| `ENABLE_BULLMQ_DASHBOARD` | Flowise | true | - |
| `FLOWISE_SECRETKEY_OVERWRITE` | Flowise | (secret) | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Flowise | true | A workaround for alpine private networking |
| `POSTGRES_DB` | Postgis | n8n | - |
| `DATABASE_URL` | Postgis | - | URL to connect to Postgres database over public networking |
| `POSTGRES_USER` | Postgis | (secret) | - |
| `POSTGRES_PASSWORD` | Postgis | (secret) | - |
| `DATABASE_PRIVATE_URL` | Postgis | - | URL to connect to Postgres database over private network |
| `POSTGRES_INITDB_ARGS` | Postgis | -c ssl=on -c ssl_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem -c ssl_key_file=/etc/ssl/private/ssl-cert-snakeoil.key | Additional arguments to pass to postgresql initdb, enables SSL |
| `MODE` | FlowiseWorker | worker | - |
| `LOG_PATH` | FlowiseWorker | /opt/flowise/.flowise/logs | Location where log files are stored |
| `QUEUE_NAME` | FlowiseWorker | flowise-queue | - |
| `APIKEY_PATH` | FlowiseWorker | /opt/flowise/.flowise | Location where API keys are saved |
| `STORAGE_TYPE` | FlowiseWorker | local | Type of storage for uploaded files. default is local |
| `DATABASE_HOST` | FlowiseWorker | - | Private or Public Host URL - i.e. postgis.railway.internal |
| `DATABASE_NAME` | FlowiseWorker | flowise | Database name (When DATABASE_TYPE is not sqlite) |
| `DATABASE_PATH` | FlowiseWorker | /opt/flowise/.flowise | Location where database is saved (When DATABASE_TYPE is sqlite) |
| `DATABASE_PORT` | FlowiseWorker | - | Private or Public database port (When DATABASE_TYPE is not sqlite) - i.e. 5432 |
| `DATABASE_TYPE` | FlowiseWorker | postgres | Type of database to store the flowise data - i.e. sqlite, mysql, postgres |
| `DATABASE_USER` | FlowiseWorker | (secret) | Database username (When DATABASE_TYPE is not sqlite) - i.e. postgres |
| `SECRETKEY_PATH` | FlowiseWorker | (secret) | Location where encryption key (used to encrypt/decrypt credentials) is saved |
| `FLOWISE_PASSWORD` | FlowiseWorker | (secret) | Password to login |
| `FLOWISE_USERNAME` | FlowiseWorker | (secret) | Username to login |
| `BLOB_STORAGE_PATH` | FlowiseWorker | /opt/flowise/.flowise/storage | Location where uploaded files are saved when STORAGE_TYPE is local |
| `DATABASE_PASSWORD` | FlowiseWorker | (secret) | Database password (When DATABASE_TYPE is not sqlite) |
| `OVERRIDE_DATABASE` | FlowiseWorker | false | Database Synchronization on every application launch. |
| `ENABLE_BULLMQ_DASHBOARD` | FlowiseWorker | false | - |
| `FLOWISE_SECRETKEY_OVERWRITE` | FlowiseWorker | (secret) | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | FlowiseWorker | true | A workaround for alpine private networking |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/flowise/.flowise`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/flowiseai-with-workers)
