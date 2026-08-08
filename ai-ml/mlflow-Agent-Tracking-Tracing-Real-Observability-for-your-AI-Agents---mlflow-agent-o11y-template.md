# Deploy mlflow: Agent Tracking & Tracing | Real Observability for your AI Agents on Railway

Self-hosted MLflow tracing backend with an instrumented demo agent

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mlflow-agent-o11y-template)

## About

This template deploys two services on Railway: a self-hosted **MLflow tracking
& tracing server** (the trace-ingestion backend) and a **FastAPI demo agent**
instrumented with the MLflow Tracing SDK. The demo agent is wired to the MLflow
server automatically and validates the whole pipeline from the first deploy —
click deploy, wait for the build, then watch traces appear in the MLflow UI.

The MLflow server is open by design so any of your own agents can push traces
without an API key. Use the tracking REST API (via the `mlflow-tracing` SDK) or
the OpenTelemetry ingestion endpoint at `/v1/traces` (with `Content-Type:
application/x-protobuf` or `application/json` plus the
`X-MLflow-Experiment-Id` header) — LangChain.js, Vercel AI SDK, Claude Agent SDK
and any plain OTel exporter can report in. SQLite metadata and trace artifacts
persist on a `/mlruns` volume; swap in Railway Postgres and S3 once you outgrow
the bundled setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mlflow-server | [impacte-tech/mlflow-agent-observability](https://github.com/impacte-tech/mlflow-agent-observability) (root: mlflow-server) | Web service |
| agent-app | [impacte-tech/mlflow-agent-observability](https://github.com/impacte-tech/mlflow-agent-observability) (root: agent-app) | Web service |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/mlruns`

**Category:** AI/ML · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mlflow-agent-o11y-template)
