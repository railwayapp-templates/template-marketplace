# Deploy MLflow on Railway

Deploy and Host a production-ready MLflow instance on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/mlflow)

## About

MLflow is the open-source standard for managing the machine learning lifecycle. It handles experiment tracking, model packaging, and deployment with a mix of online services and local Python tooling. By standardizing workflows across tools and frameworks, MLflow makes collaboration, reproducibility, and scaling ML systems easier in both research and production environments.

This template provides MLflow preconfigured with:

- **Caddy** for authentication and reverse proxying
- **MinIO** for artifact storage
- **PostgreSQL** for backend storage

all deployable in a single click on Railway!

Once the services are healthy, configure your local environment with the Railway-generated username and password, and you’re ready to build production-ready ML/AI systems.

This template is based on MLflow’s guide for [Remote Experiment Tracking with MLflow Tracking Server](https://mlflow.org/docs/latest/ml/tracking/tutorials/remote-server/), which outlines how to remotely access the MLflow artifact store, backend store, and shared tracking server; overall making collaboration across your ML/AI teams seamless.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| MLFlow | [MykalMachon/railway-mlflow-stack](https://github.com/MykalMachon/railway-mlflow-stack) (root: /mlflow/) | Worker |
| Caddy | [MykalMachon/railway-mlflow-stack](https://github.com/MykalMachon/railway-mlflow-stack) (root: /caddy/) | Web service |
| Minio | [MykalMachon/railway-mlflow-stack](https://github.com/MykalMachon/railway-mlflow-stack) (root: /minio/) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | MLFlow | 5000 | the internal facing MLFlow port |
| `AWS_SECRET_ACCESS_KEY` | MLFlow | (secret) | - |
| `PORT` | Caddy | 8080 | - |
| `AUTH_PASSWORD` | Caddy | (secret) | The password you'll use to authenticate with MLFlow |
| `AUTH_USERNAME` | Caddy | (secret) | The username you'll use to authenticate with MLFlow |
| `PORT` | Minio | 9000 | - |
| `MINIO_ROOT_USER` | Minio | (secret) | The username you'll use to authenticate with Minio |
| `MINIO_ROOT_PASSWORD` | Minio | (secret) | The password you'll use to authenticate with Minio |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/minio/health/live`
- **Volume:** `/minio/data`

**Category:** AI/ML · **Languages:** Shell

[View on Railway →](https://railway.com/template/mlflow)
