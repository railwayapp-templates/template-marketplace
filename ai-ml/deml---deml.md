# Deploy deml on Railway

Data Engineering for Machine Learning book.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deml)

## About

`deml` (Data Engineering for Machine Learning) is an open-source, high-performance framework designed to orchestrate end-to-end data pipelines for AI workloads. It replaces heavy legacy architectures with lightweight tools like Polars, processing real-time streaming data from ingestion to feature storage for machine learning inference and forecasting.

Hosting the `deml` ecosystem on Railway provisions an integrated, low-latency infrastructure stack designed for processing digital threat phenomena and streaming events. The deployment sets up three decoupled internal services: an event-driven ingestion broker layer (`deml-queue`) running a Kafka-compatible broker like Redpanda or NATS, a telemetry-and-core application runtime layer (`deml-telemetry`) managing the API endpoints and orchestration, and a persistent storage engine (`deml-postgres`) serving as the relational metadata or feature backend. Railway binds these components automatically using zero-egress internal private networking to guarantee secure, high-throughput stream processing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| deml-frontend | [dataengineeringformachinelearning/dataengineeringformachinelearning](https://github.com/dataengineeringformachinelearning/dataengineeringformachinelearning) (root: /frontend) | Web service |
| deml-backend | [dataengineeringformachinelearning/dataengineeringformachinelearning](https://github.com/dataengineeringformachinelearning/dataengineeringformachinelearning) (root: /backend) | Web service |
| deml-postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| deml-queue | [dataengineeringformachinelearning/dataengineeringformachinelearning](https://github.com/dataengineeringformachinelearning/dataengineeringformachinelearning) (root: /queue) | Worker |
| deml-telemetry | [dataengineeringformachinelearning/dataengineeringformachinelearning](https://github.com/dataengineeringformachinelearning/dataengineeringformachinelearning) (root: /backend) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DEBUG` | deml-backend | - | Toggle for verbose logging and debug mode. Set to False in production. |
| `SECRET_KEY` | deml-backend | (secret) | Cryptographically secure key for token generation, session signing, and overall application security. |
| `DATABASE_URL` | deml-backend | - | Connection string for the persistent PostgreSQL storage backend. |
| `ALLOWED_HOSTS` | deml-backend | - | Comma-separated list of host/domain names that this application can serve (security measure against HTTP Host header attacks). |
| `GOOGLE_API_KEY` | deml-backend | (secret) | API key for accessing Google Cloud platform services or integration endpoints. |
| `REDPANDA_BROKERS` | deml-backend | - | Comma-separated list of Redpanda broker addresses for high-throughput, real-time data streaming. |
| `CORS_ALLOWED_ORIGINS` | deml-backend | - | Comma-separated list of origins authorized to make cross-site HTTP requests to this service. |
| `CSRF_TRUSTED_ORIGINS` | deml-backend | - | Comma-separated list of trusted origins for unsafe HTTP requests (e.g., POST) to protect against CSRF attacks. |
| `CORS_ALLOW_CREDENTIALS` | deml-backend | (secret) | Toggle (True/False) to determine if cross-origin requests are allowed to include cookies, authorization headers, or TLS client certificates. |
| `POSTGRES_DB` | deml-postgres | railway | The name of the default database created upon initial cluster initialization. |
| `DATABASE_URL` | deml-postgres | - | Private, low-latency connection string for secure cluster services with 0ms egress costs. |
| `POSTGRES_USER` | deml-postgres | (secret) | The master superuser account name for the database cluster. |
| `POSTGRES_PASSWORD` | deml-postgres | (secret) | Auto-generated 32-character secure superuser password. |
| `DATABASE_PUBLIC_URL` | deml-postgres | - | External connection string routed securely through Railway's TCP proxy for local tools and external syncs. |
| `PORT` | deml-queue | 9092 | The network port on which the event queue server listens for incoming data streams and client connections. |
| `DEBUG` | deml-telemetry | - | Toggle for verbose logging and debug mode. Set to False in production. |
| `SECRET_KEY` | deml-telemetry | (secret) | Cryptographically secure key for token generation and securing internal telemetry endpoints. |
| `DATABASE_URL` | deml-telemetry | - | Connection string for the persistent PostgreSQL storage backend. |
| `REDPANDA_BROKERS` | deml-telemetry | - | Comma-separated list of Redpanda broker addresses for real-time telemetry streaming. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `python manage.py telemetry_worker`

**Category:** AI/ML · **Languages:** TypeScript, SCSS, Python, HTML, CSS, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/deml)
