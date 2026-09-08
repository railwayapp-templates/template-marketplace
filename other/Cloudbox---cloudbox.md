# Deploy Cloudbox on Railway

A GCP emulator for Storage, Pub/Sub, Firestore, BigQuery, and web UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cloudbox)

## About

Cloudbox is a local Google Cloud Platform emulator that provides development and testing endpoints for multiple GCP services, including Cloud Storage, Pub/Sub, Firestore, Secret Manager, BigQuery, Spanner, Cloud Tasks, Logging, Scheduler, and KMS.

It also includes an Admin UI for inspecting and managing the emulator environment.

Cloudbox runs as a single Railway service and exposes multiple Google Cloud-compatible service endpoints from one container.

The Admin UI runs on port `8888`, while individual emulator services use separate ports.

A Railway Volume mounted at `/data` can be used to retain emulator state across supported restarts and redeployments.

Cloudbox does not require a real Google Cloud project, service account, PostgreSQL, Redis, MySQL, or other external database for standard emulator usage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cloudbox | `omab/cloudbox:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8888 | Railway HTTP target port for Cloudbox Admin UI |
| `CLOUDBOX_HOST` | 0.0.0.0 | Bind Cloudbox services to all interfaces |
| `CLOUDBOX_PROJECT` | local-project | Default emulated GCP project ID |
| `CLOUDBOX_DATA_DIR` | /data | Persist Cloudbox state on Railway Volume |
| `CLOUDBOX_LOCATION` | us-central1 | Default emulated GCP region |
| `CLOUDBOX_LOG_LEVEL` | info | Cloudbox log verbosity |
| `CLOUDBOX_ADMIN_PORT` | 8888 | Cloudbox Admin UI port |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/cloudbox)
