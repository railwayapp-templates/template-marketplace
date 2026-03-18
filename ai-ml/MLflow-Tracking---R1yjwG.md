# Deploy MLflow Tracking on Railway

The MLflow Tracking is an API and UI for logging ML experiment.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/R1yjwG)

## About

The MLflow Tracking is an API and UI for logging parameters, code versions, metrics, and output files when running your machine learning code and for later visualizing the results. MLflow Tracking provides Python, REST, R, and Java APIs.

https://mlflow.org/docs/latest/tracking.html

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MLflow Tracking | `ghcr.io/mlflow/mlflow:v2.10.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

## Configuration

- **Start command:** `mlflow server --host 0.0.0.0 --port 8080 --backend-store-uri file:///data/runs/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/R1yjwG)
