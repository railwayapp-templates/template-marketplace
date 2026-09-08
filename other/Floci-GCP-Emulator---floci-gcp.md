# Deploy Floci — GCP Emulator on Railway

A fast, open-source GCP emulator for development and testing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/floci-gcp)

## About

Floci GCP is a fast, free, and open-source Google Cloud Platform emulator for development, testing, automation, and CI/CD workflows.

It provides GCP-compatible REST and gRPC APIs through a single endpoint, allowing applications to use services such as Cloud Storage, Pub/Sub, Firestore, Datastore, Secret Manager, IAM, KMS, Cloud Tasks, Cloud Scheduler, BigQuery, Cloud Run, Cloud SQL, GKE, and more without requiring a real Google Cloud account.

This template deploys Floci GCP on Railway using the official `floci/floci-gcp:latest` Docker image.

All supported GCP REST and gRPC services share a unified endpoint on port `4588`. Applications, Google Cloud SDKs, development environments, Terraform, OpenTofu, and automated test suites can connect to the Railway deployment instead of real GCP endpoints.

Persistent emulator state is stored in a Railway volume mounted at `/app/data`.

Some advanced Floci GCP services normally start Docker sidecars, including Cloud Run, Cloud SQL, Managed Kafka, and GKE. Railway does not expose the host Docker socket, so this template configures those services to use their mock implementations instead.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| floci | `floci/floci-gcp:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4588 | Railway HTTP target port |
| `FLOCI_GCP_PORT` | 4588 | Floci GCP unified API port |
| `FLOCI_GCP_BASE_URL` | - | Public endpoint returned in service URLs |
| `FLOCI_GCP_STORAGE_MODE` | persistent | Persist emulator state across restarts |
| `FLOCI_GCP_SERVICES_GKE_MOCK` | true | Mock GKE without Docker/k3s sidecars |
| `FLOCI_GCP_DEFAULT_PROJECT_ID` | floci-local | Default emulated GCP project ID |
| `FLOCI_GCP_SERVICES_KAFKA_MOCK` | true | Mock Managed Kafka without Docker sidecars |
| `FLOCI_GCP_SERVICES_CLOUDRUN_MOCK` | true | Mock Cloud Run execution without Docker sidecars |
| `FLOCI_GCP_SERVICES_CLOUDSQL_MOCK` | true | Mock Cloud SQL without Docker sidecars |
| `FLOCI_GCP_STORAGE_PERSISTENT_PATH` | /app/data | Railway persistent volume directory |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/floci-gcp)
