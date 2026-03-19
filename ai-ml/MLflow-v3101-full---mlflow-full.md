# Deploy MLflow :v3.10.1-full on Railway

MLflow Full version see more: www.oploy.eu

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mlflow-full)

## About

MLflow Full (`mlflow:v3.10.1-full`) is a platform for managing the machine learning and GenAI lifecycle. It provides experiment tracking, model registry, artifact storage, and prompt observability in a unified interface. Teams can log parameters, metrics, prompts, and models while organizing experiments and managing versions of ML and LLM systems.

When deployed on Railway, MLflow runs as a tracking server accessible through a web interface. Experiment metadata is stored in a PostgreSQL database, while artifacts (models, logs, datasets, evaluation outputs) should be stored in an S3-compatible bucket for persistence.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| MLflow | [oploy-eu/mlflow-tracking-server](https://github.com/oploy-eu/mlflow-tracking-server) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | MLflow | 8080 | - |
| `BACKEND_s3` | MLflow | ForArtifacts | - |
| `MKL_NUM_THREADS` | MLflow | 1 | - |
| `OMP_NUM_THREADS` | MLflow | 1 | - |
| `AWS_ACCESS_KEY_ID` | MLflow | ForArtifacts | - |
| `AWS_DEFAULT_REGION` | MLflow | ForArtifacts | - |
| `NUMEXPR_NUM_THREADS` | MLflow | 1 | - |
| `OPENBLAS_NUM_THREADS` | MLflow | 1 | - |
| `AWS_SECRET_ACCESS_KEY` | MLflow | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/mlflow-full)
