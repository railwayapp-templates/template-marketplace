# Deploy Switchyard on Railway

Pluggable infrastructure platform. Autoscaling, job scheduling, and more.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/switchyard)

## About

Deploy this template along with your application in the target environment, and fill out the environment variables for each required service.

Switchyard is an infrastructure platform to supplement Railway's existing deployment features--it adds autoscaling, job scheduling, feature flags, and other observability features to your application.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis:7.2.5` | Database |
| autoscaler | `ghcr.io/ferretcode/switchyard/autoscale` | Worker |
| dashboard | `ghcr.io/ferretcode/switchyard/dashboard` | Worker |
| configurator | `ghcr.io/ferretcode/switchyard/configurator` | Worker |
| scheduler | `ghcr.io/ferretcode/switchyard/scheduler` | Worker |
| incident | `ghcr.io/ferretcode/switchyard/incident` | Worker |
| feature-flags | `ghcr.io/ferretcode/switchyard/feature-flags` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| locomotive | `ghcr.io/ferretcode/locomotive:latest` | Worker |
| RabbitMQ | `rabbitmq:management` | Database |
| RabbitMQ Web UI | `ghcr.io/brody192/railway-public-to-private-proxy` | Web service |

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
| `PORT` | autoscaler | 3000 | Autoscaler port |
| `DATABASE_URL` | autoscaler | - | URL to the Postgres Database |
| `UPSCALE_COOLDOWN` | autoscaler | 1m | Default cooldown for upscaling services |
| `MAX_REPLICA_COUNT` | autoscaler | 10 | Default max service replica count |
| `MIN_REPLICA_COUNT` | autoscaler | 1 | Default min service replica count |
| `DOWNSCALE_COOLDOWN` | autoscaler | 2m | Default downscale cooldown for services |
| `METRIC_HISTORY_SIZE` | autoscaler | 12 | Sliding window for metrics history analysis |
| `MONITORING_INTERVAL` | autoscaler | 10s | Metrics polling interval |
| `PORT` | dashboard | 3000 | Dashboard port |
| `ADMIN_PASSWORD` | dashboard | (secret) | Dashboard password |
| `ADMIN_USERNAME` | dashboard | (secret) | Admin username for the dashboard |
| `SESSIONS_COOKIE_NAME` | dashboard | switchyard | Browser cookie name for session management |
| `AUTOSCALE_SERVICE_URL` | dashboard | - | Autoscaler service URL |
| `SCHEDULER_SERVICE_URL` | dashboard | - | Scheduler service URL |
| `FEATURE_FLAGS_SERVICE_URL` | dashboard | - | Feature flags service URL |
| `INCIDENT_REPORTING_SERVICE_URL` | dashboard | - | Incident service port |
| `PORT` | configurator | 3000 | Configurator service port |
| `ENVIRONMENT` | configurator | prod | Running environment (should always be prod, so database migrations run) |
| `DATABASE_URL` | configurator | - | Postgres database URL |
| `PORT` | scheduler | 3000 | Scheduler port |
| `CACHE_URL` | scheduler | - | Redis URL |
| `DATABASE_URL` | scheduler | - | Postgres database URL |
| `MESSAGE_BUS_URL` | scheduler | - | RabbitMQ message bus URL |
| `WORKER_MAX_JOB_RETRIES` | scheduler | 3 | Number of retries before marking a job as failed |
| `WORKER_STUCK_JOB_THRESHOLD` | scheduler | 15s | Interval at which the scheduler polls for stuck jobs |
| `WORKER_UNACKED_MESSAGE_COUNT` | scheduler | 5 | Maximum number of messages per worker that can be unacknowledged at a time |
| `PORT` | incident | 3000 | Incident service port |
| `DATABASE_URL` | incident | - | Postgres database URL |
| `MESSAGE_BUS_URL` | incident | - | RabbitMQ message bus URL |
| `INCIDENT_ANALYSIS_WINDOW` | incident | 15s | The window in which error logs are considered towards the error threshold |
| `INCIDENT_REPORT_WEBHOOK_URL` | incident | - | Incident reporting webhook handler URL |
| `SERVICE_MONITOR_POLLING_RATE` | incident | 15s | Interval at which to poll interested service statuses |
| `SERVICE_MONITOR_POLLING_TIMEOUT` | incident | 5s | Deadline for service monitor requests to complete in |
| `INCIDENT_ANALYSIS_ERROR_THRESHOLD` | incident | 5 | Number of error logs to allow before alerting |
| `INCIDENT_REPORT_ADDITIONAL_HEADERS` | incident | - | Additional headers to send to the webhoo url. In cookie format (e.g., Authorization=Bearer test;Another=another). |
| `SERVICE_MONITOR_INTERESTED_STATUS_CHANGES` | incident | FAILED,CRASHED | Interesting deployment status changes to alert on |
| `PORT` | feature-flags | 3000 | Feature flags port |
| `DATABASE_URL` | feature-flags | - | Postgres database URL |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `TRAIN` | locomotive | - | Service IDs. Comma separated |
| `INGEST_URL` | locomotive | - | Ingest URL for the incident service. Don't change. |
| `LOGS_FILTER` | locomotive | all | Which logs you want sent (either ALL, INFO, ERROR, WARN or any custom severity) |
| `ENVIRONMENT_ID` | locomotive | - | The environment ID your service is in (Ctrl+K -> Copy environment ID) |
| `LOKI_INGEST_URL` | locomotive | - | Loki ingest URL |
| `ENABLE_HTTP_LOGS` | locomotive | false | Whether to enable HTTP logs. |
| `LOGS_FILTER_LOKI` | locomotive | all | Loki logs filter |
| `ADDITIONAL_HEADERS` | locomotive | - | Additional headers for the ingest URL |
| `ENABLE_DEPLOY_LOGS` | locomotive | true | Whether to ship deploy logs |
| `DISCORD_WEBHOOK_URL` | locomotive | - | Discord webhook URL |
| `LOGS_FILTER_DISCORD` | locomotive | all | Discord logs filter |
| `LOGS_FILTER_WEBHOOK` | locomotive | all | Webhook log filters |
| `REPORT_STATUS_EVERY` | locomotive | 5s | Reports the status of the locomotive every X seconds |
| `MAX_ERR_ACCUMULATIONS` | locomotive | 10 | The maximum number of errors to occur before exiting. |
| `RABBITMQ_URL` | RabbitMQ | - | RabbitMQ URL |
| `RABBITMQ_NODENAME` | RabbitMQ | rabbit@rabbitmq | Hostname for RabbitMQ (Don't change this). |
| `RABBITMQ_PRIVATE_URL` | RabbitMQ | - | RabbitMQ Private URL |
| `RABBITMQ_DEFAULT_PASS` | RabbitMQ | - | RabbitMQ default password |
| `RABBITMQ_DEFAULT_USER` | RabbitMQ | (secret) | RabbitMQ Default User |
| `PROXY_PORT` | RabbitMQ Web UI | 15672 | RabbitMQ Management UI port |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "CONFIG_PATH=/etc; SYSTEM_FILE=hosts; echo 127.0.0.1 rabbitmq >> ${CONFIG_PATH}/${SYSTEM_FILE} && echo management.tcp.ip = :: >> /etc/rabbitmq/conf.d/10-defaults.conf && docker-entrypoint.sh rabbitmq-server"`
- **Volume:** `/var/lib/rabbitmq`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/template/switchyard)
