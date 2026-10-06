# Deploy Apache Airflow on Railway

Apache Airflow is an open-source platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apache-airflow)

## About

![Template Header](./template-header.svg)


[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/9jXQaO?referralCode=2_sIT9&utm_medium=integration&utm_source=template&utm_campaign=generic)

Apache Airflow is an open-source platform for authoring, scheduling, and monitoring workflows as code. You define pipelines in Python (DAGs), and Airflow runs them on a schedule or on demand, with a web UI for logs, retries, and task dependencies. It is widely used for data engineering, ETL, and orchestrating jobs across databases, APIs, and cloud services.

Airflow 3 uses `LocalExecutor` with SQLite WAL mode for this standalone evaluation setup. `SequentialExecutor` was removed in Airflow 3 and must not be configured. The published template mounts `/opt/airflow/data`, generates an HTTP domain, and seeds the administrator login using a generated password.

Hosting Airflow means running the webserver, scheduler, and—depending on your setup—workers and a metadata database. You configure environment variables for secrets and database connections, attach persistent storage for DAGs and state, and expose the web UI on a port your platform can route to. Health checks help the host restart unhealthy processes automatically. Production deployments often split components and use PostgreSQL with Celery or Kubernetes executors; this template uses **standalone** mode for a simpler single-process layout suited to evaluation and lighter workloads. Railway runs the container, wires networking and volumes, and lets you scale or add services as your orchestration needs grow.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railwayapp-airflow | [vergissberlin/railwayapp-airflow](https://github.com/vergissberlin/railwayapp-airflow) (branch: main) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AIRFLOW_UID` | 50000 | - |
| `_AIRFLOW_WWW_USER_PASSWORD` | (secret) | Seeds a persistent administrator login. |
| `_AIRFLOW_WWW_USER_USERNAME` | (secret) | SimpleAuthManager administrator username. |
| `AIRFLOW__CORE__LOAD_EXAMPLES` | False | - |

## Configuration

- **Healthcheck:** `/api/v2/monitor/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/airflow/data`

**Category:** Other · **Languages:** Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/apache-airflow)
