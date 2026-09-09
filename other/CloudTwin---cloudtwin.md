# Deploy CloudTwin on Railway

A multi-cloud emulator for AWS, Azure, and GCP with a dashboard.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cloudtwin)

## About

CloudTwin is a multi-cloud emulator for AWS, Azure, and GCP with a built-in web dashboard. It provides cloud-compatible APIs for development, testing, CI/CD, and integration workflows without requiring access to real cloud infrastructure.

This deployment runs CloudTwin as a single Railway service.

CloudTwin exposes emulated AWS, Azure, and GCP APIs through one application endpoint and includes a web dashboard for inspecting emulator state and activity.

The dashboard is available at:

```text
/dashboard
```

CloudTwin can persist emulator state using SQLite stored on a Railway Volume.

No PostgreSQL, Redis, MySQL, MongoDB, or external database is required for standard usage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cloudtwin | `creogroup/cloudtwin:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4793 | Railway HTTP target port |
| `CLOUDTWIN_HOST` | 0.0.0.0 | Bind CloudTwin to all network interfaces |
| `CLOUDTWIN_API_PORT` | - | Cloud API and dashboard port |
| `CLOUDTWIN_STORAGE_MODE` | sqlite | Persist emulator state using SQLite |
| `CLOUDTWIN_STORAGE_PATH` | /data/cloudtwin.db | SQLite database on Railway Volume |
| `CLOUDTWIN_DASHBOARD_ENABLED` | true | Enable the web dashboard |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/cloudtwin)
