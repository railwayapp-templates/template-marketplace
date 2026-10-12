# Deploy Apache Airflow 3 Data Pipelines on Railway

Schedule and monitor DAGs with Celery workers, Redis and Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apache-airflow-3-data-pipelines)

## About

Apache Airflow is the open-source platform for authoring, scheduling and monitoring data pipelines as Python code. This community template deploys Airflow 3 the way the project recommends for production — separate API server, scheduler, DAG processor, triggerer and Celery workers — on Railway with Postgres, Redis and bucket-backed task logs.

Airflow 3 is a set of cooperating processes. The API server serves the UI, the REST API and the Task Execution API; the scheduler decides what runs; the DAG processor parses your DAG files; the triggerer runs deferrable operators; Celery workers execute tasks, fed through Redis. All of them share a Postgres metadata database. On Railway, volumes cannot be shared between services, so this template delivers DAGs through Airflow 3 DAG bundles from a git repository (push to deploy, each run pinned to a commit) and stores task logs in a Railway Bucket. A one-shot init service migrates the database and creates the admin account before the other roles start.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| airflow-dag-processor | [baranberkay96/airflow-railway](https://github.com/baranberkay96/airflow-railway) (branch: main) (root: /services/airflow) | Worker |
| airflow-worker | [baranberkay96/airflow-railway](https://github.com/baranberkay96/airflow-railway) (branch: main) (root: /services/airflow) | Worker |
| Redis | `redis:8.2` | Database |
| airflow-apiserver | [baranberkay96/airflow-railway](https://github.com/baranberkay96/airflow-railway) (branch: main) (root: /services/airflow) | Web service |
| airflow-triggerer | [baranberkay96/airflow-railway](https://github.com/baranberkay96/airflow-railway) (branch: main) (root: /services/airflow) | Worker |
| airflow-scheduler | [baranberkay96/airflow-railway](https://github.com/baranberkay96/airflow-railway) (branch: main) (root: /services/airflow) | Worker |
| airflow-init | [baranberkay96/airflow-railway](https://github.com/baranberkay96/airflow-railway) (branch: main) (root: /services/airflow) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `AIRFLOW_DAGS_GIT_REF` | airflow-dag-processor | - | Same value as on airflow-apiserver. |
| `AIRFLOW_DAGS_GIT_URL` | airflow-dag-processor | - | Same value as on airflow-apiserver. |
| `AIRFLOW_DAGS_GIT_SUBDIR` | airflow-dag-processor | - | Same value as on airflow-apiserver. |
| `AIRFLOW__API__SECRET_KEY` | airflow-dag-processor | (secret) | Same value as on airflow-apiserver. |
| `AIRFLOW_DAGS_REFRESH_SECS` | airflow-dag-processor | - | Same value as on airflow-apiserver. |
| `AIRFLOW__CORE__FERNET_KEY` | airflow-dag-processor | - | Same value as on airflow-apiserver. |
| `AIRFLOW_CONN_RAILWAY_BUCKET` | airflow-dag-processor | - | Same value as on airflow-apiserver. |
| `AIRFLOW__CELERY__BROKER_URL` | airflow-dag-processor | - | Celery broker (Railway Redis, DB 0). |
| `AIRFLOW__API_AUTH__JWT_SECRET` | airflow-dag-processor | (secret) | Same value as on airflow-apiserver. |
| `AIRFLOW__LOGGING__REMOTE_LOGGING` | airflow-dag-processor | True | Ship task logs to the Railway Bucket. |
| `AIRFLOW__DATABASE__SQL_ALCHEMY_CONN` | airflow-dag-processor | - | Metadata database (Railway Postgres, private network). |
| `AIRFLOW__LOGGING__REMOTE_LOG_CONN_ID` | airflow-dag-processor | railway_bucket | Airflow connection used for remote logs. |
| `AIRFLOW__CORE__EXECUTION_API_SERVER_URL` | airflow-dag-processor | - | Task Execution API that workers/triggerer call (private network). |
| `AIRFLOW__LOGGING__REMOTE_BASE_LOG_FOLDER` | airflow-dag-processor | - | Bucket path for task logs. |
| `AIRFLOW_DAGS_GIT_REF` | airflow-worker | - | Same value as on airflow-apiserver. |
| `AIRFLOW_DAGS_GIT_URL` | airflow-worker | - | Same value as on airflow-apiserver. |
| `AIRFLOW_DAGS_GIT_SUBDIR` | airflow-worker | - | Same value as on airflow-apiserver. |
| `AIRFLOW__API__SECRET_KEY` | airflow-worker | (secret) | Same value as on airflow-apiserver. |
| `AIRFLOW_DAGS_REFRESH_SECS` | airflow-worker | - | Same value as on airflow-apiserver. |
| `AIRFLOW__CORE__FERNET_KEY` | airflow-worker | - | Same value as on airflow-apiserver. |
| `AIRFLOW_CONN_RAILWAY_BUCKET` | airflow-worker | - | Same value as on airflow-apiserver. |
| `AIRFLOW__CELERY__BROKER_URL` | airflow-worker | - | Celery broker (Railway Redis, DB 0). |
| `AIRFLOW__API_AUTH__JWT_SECRET` | airflow-worker | (secret) | Same value as on airflow-apiserver. |
| `AIRFLOW__LOGGING__REMOTE_LOGGING` | airflow-worker | True | Ship task logs to the Railway Bucket. |
| `AIRFLOW__CELERY__WORKER_CONCURRENCY` | airflow-worker | 8 | Task slots per worker replica. |
| `AIRFLOW__DATABASE__SQL_ALCHEMY_CONN` | airflow-worker | - | Metadata database (Railway Postgres, private network). |
| `AIRFLOW__LOGGING__REMOTE_LOG_CONN_ID` | airflow-worker | railway_bucket | Airflow connection used for remote logs. |
| `AIRFLOW__CORE__EXECUTION_API_SERVER_URL` | airflow-worker | - | Task Execution API that workers/triggerer call (private network). |
| `AIRFLOW__LOGGING__REMOTE_BASE_LOG_FOLDER` | airflow-worker | - | Bucket path for task logs. |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `PORT` | airflow-apiserver | 8080 | API server port (Railway healthcheck + domain). |
| `AIRFLOW__API__HOST` | airflow-apiserver | :: | Dual-stack bind so IPv4 and IPv6 private-network clients both reach the API. |
| `AIRFLOW__API__PORT` | airflow-apiserver | 8080 | Port uvicorn listens on. |
| `AIRFLOW_ADMIN_EMAIL` | airflow-apiserver | admin@example.com | Admin email. |
| `FORWARDED_ALLOW_IPS` | airflow-apiserver | * | Trust X-Forwarded-* from Railway's proxy (HTTPS links). |
| `AIRFLOW_DAGS_GIT_REF` | airflow-apiserver | main | Branch, tag or commit to track. |
| `AIRFLOW_DAGS_GIT_URL` | airflow-apiserver | https://github.com/baranberkay96/airflow-railway.git | Git repo holding your DAGs (GitDagBundle). Empty = example DAGs baked into the image. |
| `AIRFLOW__API__WORKERS` | airflow-apiserver | 2 | Uvicorn worker processes (>1 also enables the dual-stack socket). |
| `AIRFLOW_ADMIN_PASSWORD` | airflow-apiserver | (secret) | Admin password (generated). Only used on first creation. |
| `AIRFLOW_ADMIN_USERNAME` | airflow-apiserver | (secret) | Admin login created by airflow-init. |
| `AIRFLOW__API__BASE_URL` | airflow-apiserver | - | Public URL of the UI. |
| `AIRFLOW_DAGS_GIT_SUBDIR` | airflow-apiserver | services/airflow/dags | Folder inside the repo that contains the DAG files (empty = repo root). |
| `AIRFLOW__API__SECRET_KEY` | airflow-apiserver | (secret) | API/log-server secret. Shared by all Airflow services. |
| `AIRFLOW_DAGS_REFRESH_SECS` | airflow-apiserver | 120 | How often Airflow fetches new commits. |
| `AIRFLOW__CORE__FERNET_KEY` | airflow-apiserver | - | Fernet key that encrypts connections/variables. Shared by all Airflow services; never change after first boot. |
| `AIRFLOW_CONN_RAILWAY_BUCKET` | airflow-apiserver | - | Airflow connection (JSON) for the Railway Bucket; used for remote task logs. |
| `AIRFLOW__CELERY__BROKER_URL` | airflow-apiserver | - | Celery broker (Railway Redis, DB 0). |
| `AIRFLOW__API_AUTH__JWT_SECRET` | airflow-apiserver | (secret) | Signs task-execution JWTs. Shared by all Airflow services. |
| `AIRFLOW__LOGGING__REMOTE_LOGGING` | airflow-apiserver | True | Ship task logs to the Railway Bucket. |
| `AIRFLOW__DATABASE__SQL_ALCHEMY_CONN` | airflow-apiserver | - | Metadata database (Railway Postgres, private network). |
| `AIRFLOW__LOGGING__REMOTE_LOG_CONN_ID` | airflow-apiserver | railway_bucket | Airflow connection used for remote logs. |
| `AIRFLOW__CORE__EXECUTION_API_SERVER_URL` | airflow-apiserver | - | Task Execution API that workers/triggerer call (private network). |
| `AIRFLOW__LOGGING__REMOTE_BASE_LOG_FOLDER` | airflow-apiserver | - | Bucket path for task logs. |
| `AIRFLOW_DAGS_GIT_REF` | airflow-triggerer | - | Same value as on airflow-apiserver. |
| `AIRFLOW_DAGS_GIT_URL` | airflow-triggerer | - | Same value as on airflow-apiserver. |
| `AIRFLOW_DAGS_GIT_SUBDIR` | airflow-triggerer | - | Same value as on airflow-apiserver. |
| `AIRFLOW__API__SECRET_KEY` | airflow-triggerer | (secret) | Same value as on airflow-apiserver. |
| `AIRFLOW_DAGS_REFRESH_SECS` | airflow-triggerer | - | Same value as on airflow-apiserver. |
| `AIRFLOW__CORE__FERNET_KEY` | airflow-triggerer | - | Same value as on airflow-apiserver. |
| `AIRFLOW_CONN_RAILWAY_BUCKET` | airflow-triggerer | - | Same value as on airflow-apiserver. |
| `AIRFLOW__CELERY__BROKER_URL` | airflow-triggerer | - | Celery broker (Railway Redis, DB 0). |
| `AIRFLOW__API_AUTH__JWT_SECRET` | airflow-triggerer | (secret) | Same value as on airflow-apiserver. |
| `AIRFLOW__LOGGING__REMOTE_LOGGING` | airflow-triggerer | True | Ship task logs to the Railway Bucket. |
| `AIRFLOW__DATABASE__SQL_ALCHEMY_CONN` | airflow-triggerer | - | Metadata database (Railway Postgres, private network). |
| `AIRFLOW__LOGGING__REMOTE_LOG_CONN_ID` | airflow-triggerer | railway_bucket | Airflow connection used for remote logs. |
| `AIRFLOW__CORE__EXECUTION_API_SERVER_URL` | airflow-triggerer | - | Task Execution API that workers/triggerer call (private network). |
| `AIRFLOW__LOGGING__REMOTE_BASE_LOG_FOLDER` | airflow-triggerer | - | Bucket path for task logs. |
| `PORT` | airflow-scheduler | 8974 | Scheduler health server port (Railway probes /health). |
| `AIRFLOW_DAGS_GIT_REF` | airflow-scheduler | - | Same value as on airflow-apiserver. |
| `AIRFLOW_DAGS_GIT_URL` | airflow-scheduler | - | Same value as on airflow-apiserver. |
| `AIRFLOW_DAGS_GIT_SUBDIR` | airflow-scheduler | - | Same value as on airflow-apiserver. |
| `AIRFLOW__API__SECRET_KEY` | airflow-scheduler | (secret) | Same value as on airflow-apiserver. |
| `AIRFLOW_DAGS_REFRESH_SECS` | airflow-scheduler | - | Same value as on airflow-apiserver. |
| `AIRFLOW__CORE__FERNET_KEY` | airflow-scheduler | - | Same value as on airflow-apiserver. |
| `AIRFLOW_CONN_RAILWAY_BUCKET` | airflow-scheduler | - | Same value as on airflow-apiserver. |
| `AIRFLOW__CELERY__BROKER_URL` | airflow-scheduler | - | Celery broker (Railway Redis, DB 0). |
| `AIRFLOW__API_AUTH__JWT_SECRET` | airflow-scheduler | (secret) | Same value as on airflow-apiserver. |
| `AIRFLOW__LOGGING__REMOTE_LOGGING` | airflow-scheduler | True | Ship task logs to the Railway Bucket. |
| `AIRFLOW__DATABASE__SQL_ALCHEMY_CONN` | airflow-scheduler | - | Metadata database (Railway Postgres, private network). |
| `AIRFLOW__LOGGING__REMOTE_LOG_CONN_ID` | airflow-scheduler | railway_bucket | Airflow connection used for remote logs. |
| `AIRFLOW__CORE__EXECUTION_API_SERVER_URL` | airflow-scheduler | - | Task Execution API that workers/triggerer call (private network). |
| `AIRFLOW__LOGGING__REMOTE_BASE_LOG_FOLDER` | airflow-scheduler | - | Bucket path for task logs. |
| `AIRFLOW__SCHEDULER__SCHEDULER_HEALTH_CHECK_SERVER_PORT` | airflow-scheduler | 8974 | Scheduler health server port. |
| `AIRFLOW_ADMIN_EMAIL` | airflow-init | - | Same value as on airflow-apiserver. |
| `AIRFLOW_DAGS_GIT_REF` | airflow-init | - | Same value as on airflow-apiserver. |
| `AIRFLOW_DAGS_GIT_URL` | airflow-init | - | Same value as on airflow-apiserver. |
| `AIRFLOW_ADMIN_PASSWORD` | airflow-init | (secret) | Same value as on airflow-apiserver. |
| `AIRFLOW_ADMIN_USERNAME` | airflow-init | (secret) | Same value as on airflow-apiserver. |
| `AIRFLOW_DAGS_GIT_SUBDIR` | airflow-init | - | Same value as on airflow-apiserver. |
| `AIRFLOW__API__SECRET_KEY` | airflow-init | (secret) | Same value as on airflow-apiserver. |
| `AIRFLOW_DAGS_REFRESH_SECS` | airflow-init | - | Same value as on airflow-apiserver. |
| `AIRFLOW__CORE__FERNET_KEY` | airflow-init | - | Same value as on airflow-apiserver. |
| `AIRFLOW_CONN_RAILWAY_BUCKET` | airflow-init | - | Same value as on airflow-apiserver. |
| `AIRFLOW__CELERY__BROKER_URL` | airflow-init | - | Celery broker (Railway Redis, DB 0). |
| `AIRFLOW__API_AUTH__JWT_SECRET` | airflow-init | (secret) | Same value as on airflow-apiserver. |
| `AIRFLOW__LOGGING__REMOTE_LOGGING` | airflow-init | True | Ship task logs to the Railway Bucket. |
| `AIRFLOW__DATABASE__SQL_ALCHEMY_CONN` | airflow-init | - | Metadata database (Railway Postgres, private network). |
| `AIRFLOW__LOGGING__REMOTE_LOG_CONN_ID` | airflow-init | railway_bucket | Airflow connection used for remote logs. |
| `AIRFLOW__CORE__EXECUTION_API_SERVER_URL` | airflow-init | - | Task Execution API that workers/triggerer call (private network). |
| `AIRFLOW__LOGGING__REMOTE_BASE_LOG_FOLDER` | airflow-init | - | Bucket path for task logs. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/opt/railway/bin/railway-airflow dag-processor`
- **Start command:** `/opt/railway/bin/railway-airflow worker`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/opt/railway/bin/railway-airflow api-server`
- **Healthcheck:** `/api/v2/monitor/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/opt/railway/bin/railway-airflow triggerer`
- **Start command:** `/opt/railway/bin/railway-airflow scheduler`
- **Healthcheck:** `/health`
- **Start command:** `/opt/railway/bin/railway-airflow init`

**Category:** Automation · **Tags:** airflow, data-pipelines, etl, orchestration, celery · **Languages:** Shell, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/apache-airflow-3-data-pipelines)
