# Deploy MLflow on Railway

MLflow 3.16 tracking server with login, Postgres and artifact storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mlflow-1)

## About

MLflow is the open-source platform for the machine learning and generative AI lifecycle. It tracks experiments, parameters, metrics and artifacts, manages models in a registry, traces LLM applications and evaluates their output. Python, R, Java and TypeScript clients log to a shared tracking server that the whole team can browse.

This template deploys the MLflow v3.16.1 tracking server from the official full image with a Railway Postgres database for runs and the model registry. Artifacts such as models and plots are stored on a Railway volume and served through the tracking server, so clients need no cloud storage credentials. The built-in basic-auth app is on: the admin account uses a generated password, and new users get read access by default. The server checks the Host header against your Railway domain. Artifacts can grow quickly, so watch the volume on the Hobby plan. Back up Postgres regularly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mlflow | `ghcr.io/mlflow/mlflow:v3.16.1-full` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | mlflow | 5000 |
| `MLFLOW_ADMIN_PASSWORD` | mlflow | (secret) |
| `MLFLOW_ADMIN_USERNAME` | mlflow | (secret) |
| `MLFLOW_FLASK_SERVER_SECRET_KEY` | mlflow | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `sh -c 'mkdir -p /mlartifacts && printf "[mlflow]\ndefault_permission = READ\ndatabase_uri = sqlite:////mlartifacts/basic_auth.db\nadmin_username = %s\nadmin_password = %s\nauthorization_function = mlflow.server.auth:authenticate_request_basic_auth\n" "$MLFLOW_ADMIN_USERNAME" "$MLFLOW_ADMIN_PASSWORD" > /tmp/basic_auth.ini && MLFLOW_AUTH_CONFIG_PATH=/tmp/basic_auth.ini exec mlflow server --host 0.0.0.0 --port 5000 --backend-store-uri "$MLFLOW_BACKEND_STORE_URI" --artifacts-destination /mlartifacts --serve-artifacts --app-name basic-auth --allowed-hosts "$MLFLOW_ALLOWED_HOSTS"'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/mlartifacts`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/mlflow-1)
