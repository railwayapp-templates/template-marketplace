# Deploy Apache Airflow on Railway

Schedule and monitor data pipelines written in Python

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/airflow)

## About

Apache Airflow is the workflow orchestrator most data teams standardise on. You write pipelines as Python — a DAG of tasks with dependencies, retries and schedules — and Airflow runs them in order, on time, across as many machines as you give it. Because DAGs are ordinary Python files they live in version control and can call any library you already use. Self-host Airflow and you get the scheduler, REST API and React UI with no per-task pricing and no data leaving your infrastructure.

Deploy Airflow on Railway and you get the production CeleryExecutor topology, not a single container that quietly drops work. Five services run from one image: an API server serving the UI, REST API and task-execution endpoint; a scheduler; a DAG processor; a triggerer; and a Celery worker. Managed PostgreSQL holds the metadata, managed Redis is the broker, and an object storage bucket keeps task logs so any service can read a log any worker wrote. Only the API server is public.

![Diagram of the five Airflow services with Postgres, Redis and a bucket](https://res.cloudinary.com/rroe4rtk/image/upload/v1788035103/apache-airflow-architecture.png)

Airflow separates *what* runs from *where* it runs: DAGs describe dependencies and schedules, the scheduler decides which task instances are ready, and the executor hands them to workers. Running all of that in one process is fine on a laptop and a liability in production, because one crash takes scheduling and execution down together. This template splits the roles as Airflow documents them.

- **Pipelines as Python code** — dynamic DAGs, TaskFlow decorators, task mapping, typed XComs
- **Real scheduling** — cron, data intervals, timetables, catchup, backfills, dependency-aware retries
- **Deferrable tasks** — long waits move to the triggerer, so waiting an hour costs no worker slot
- **Hundreds of providers** — AWS, GCP, Azure, Snowflake, dbt, Kubernetes, HTTP and SQL
- **REST API, CLI and role-based access** — Admin, Op, User, Viewer and Public roles

Each supporting service has a job. **PostgreSQL** stores DAG definitions, run history, task state, connections and variables, and is also the Celery result backend. **Redis** is the broker the scheduler pushes queued tasks onto and workers pull from. The **bucket** holds task logs, which matters because a Railway volume attaches to exactly one service. The **DAG processor** parses Python in its own process so a broken file cannot stall scheduling; the **triggerer** runs the loop deferrable operators wait on.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| airflow-apiserver | [gridalpha/airflow-railway](https://github.com/gridalpha/airflow-railway) | Web service |
| Redis | `redis:8.2` | Database |
| airflow-dag-processor | [gridalpha/airflow-railway](https://github.com/gridalpha/airflow-railway) | Worker |
| airflow-triggerer | [gridalpha/airflow-railway](https://github.com/gridalpha/airflow-railway) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| airflow-scheduler | [gridalpha/airflow-railway](https://github.com/gridalpha/airflow-railway) | Worker |
| airflow-worker | [gridalpha/airflow-railway](https://github.com/gridalpha/airflow-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | airflow-apiserver | 8080 | Port the API server listens on |
| `REDIS_URL` | airflow-apiserver | - | Celery broker connection string |
| `DATABASE_URL` | airflow-apiserver | - | Airflow metadata database |
| `AIRFLOW_ADMIN_EMAIL` | airflow-apiserver | admin@example.com | First administrator email address |
| `AIRFLOW_LOGS_BUCKET` | airflow-apiserver | - | Bucket holding remote task logs |
| `AIRFLOW_LOGS_REGION` | airflow-apiserver | - | Bucket region |
| `AIRFLOW_SECRET_SEED` | airflow-apiserver | (secret) | Seed all matched Airflow secrets derive from |
| `AIRFLOW_LOGS_ENDPOINT` | airflow-apiserver | - | S3-compatible endpoint for that bucket |
| `AIRFLOW_ADMIN_PASSWORD` | airflow-apiserver | (secret) | First administrator password |
| `AIRFLOW_ADMIN_USERNAME` | airflow-apiserver | (secret) | First administrator username |
| `AIRFLOW_LOGS_ACCESS_KEY_ID` | airflow-apiserver | - | Bucket access key id |
| `AIRFLOW_LOGS_SECRET_ACCESS_KEY` | airflow-apiserver | (secret) | Bucket secret access key |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | airflow-dag-processor | 8081 | Port the health endpoint listens on |
| `REDIS_URL` | airflow-dag-processor | - | Celery broker connection string |
| `DATABASE_URL` | airflow-dag-processor | - | Airflow metadata database |
| `AIRFLOW_LOGS_BUCKET` | airflow-dag-processor | - | Bucket holding remote task logs |
| `AIRFLOW_LOGS_REGION` | airflow-dag-processor | - | Bucket region |
| `AIRFLOW_SECRET_SEED` | airflow-dag-processor | (secret) | Must match the API server |
| `AIRFLOW_LOGS_ENDPOINT` | airflow-dag-processor | - | S3-compatible endpoint for that bucket |
| `AIRFLOW_LOGS_ACCESS_KEY_ID` | airflow-dag-processor | - | Bucket access key id |
| `AIRFLOW_LOGS_SECRET_ACCESS_KEY` | airflow-dag-processor | (secret) | Bucket secret access key |
| `PORT` | airflow-triggerer | 8081 | Port the health endpoint listens on |
| `REDIS_URL` | airflow-triggerer | - | Celery broker connection string |
| `DATABASE_URL` | airflow-triggerer | - | Airflow metadata database |
| `AIRFLOW_LOGS_BUCKET` | airflow-triggerer | - | Bucket holding remote task logs |
| `AIRFLOW_LOGS_REGION` | airflow-triggerer | - | Bucket region |
| `AIRFLOW_SECRET_SEED` | airflow-triggerer | (secret) | Must match the API server |
| `AIRFLOW_LOGS_ENDPOINT` | airflow-triggerer | - | S3-compatible endpoint for that bucket |
| `AIRFLOW_LOGS_ACCESS_KEY_ID` | airflow-triggerer | - | Bucket access key id |
| `AIRFLOW_LOGS_SECRET_ACCESS_KEY` | airflow-triggerer | (secret) | Bucket secret access key |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | airflow-scheduler | 8974 | Port Airflow's scheduler health server uses |
| `REDIS_URL` | airflow-scheduler | - | Celery broker connection string |
| `DATABASE_URL` | airflow-scheduler | - | Airflow metadata database |
| `AIRFLOW_LOGS_BUCKET` | airflow-scheduler | - | Bucket holding remote task logs |
| `AIRFLOW_LOGS_REGION` | airflow-scheduler | - | Bucket region |
| `AIRFLOW_SECRET_SEED` | airflow-scheduler | (secret) | Must match the API server |
| `AIRFLOW_LOGS_ENDPOINT` | airflow-scheduler | - | S3-compatible endpoint for that bucket |
| `AIRFLOW_LOGS_ACCESS_KEY_ID` | airflow-scheduler | - | Bucket access key id |
| `AIRFLOW_LOGS_SECRET_ACCESS_KEY` | airflow-scheduler | (secret) | Bucket secret access key |
| `PORT` | airflow-worker | 8081 | Port the health endpoint listens on |
| `REDIS_URL` | airflow-worker | - | Celery broker connection string |
| `DATABASE_URL` | airflow-worker | - | Airflow metadata database |
| `AIRFLOW_LOGS_BUCKET` | airflow-worker | - | Bucket holding remote task logs |
| `AIRFLOW_LOGS_REGION` | airflow-worker | - | Bucket region |
| `AIRFLOW_SECRET_SEED` | airflow-worker | (secret) | Must match the API server |
| `AIRFLOW_LOGS_ENDPOINT` | airflow-worker | - | S3-compatible endpoint for that bucket |
| `AIRFLOW_LOGS_ACCESS_KEY_ID` | airflow-worker | - | Bucket access key id |
| `AIRFLOW_LOGS_SECRET_ACCESS_KEY` | airflow-worker | (secret) | Bucket secret access key |

## Configuration

- **Start command:** `/railway-entrypoint.sh api-server`
- **Healthcheck:** `/api/v2/monitor/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/railway-entrypoint.sh dag-processor`
- **Healthcheck:** `/healthz`
- **Start command:** `/railway-entrypoint.sh triggerer`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/railway-entrypoint.sh scheduler`
- **Healthcheck:** `/health`
- **Start command:** `/railway-entrypoint.sh worker`

**Category:** Automation · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/airflow)
