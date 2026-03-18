# Deploy Uptime Kuma on Railway

Self-hosted uptime monitoring with alerts and a status page

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/uptime-kuma)

## About

Uptime Kuma is a self-hosted monitoring tool that tracks the availability of your websites, APIs, and services with real-time alerts and a clean dashboard.

Hosting Uptime Kuma on Railway provisions a single containerized service running the official Docker image. All monitoring data ΓÇö including monitors, status history, and notification settings ΓÇö is stored in a SQLite database persisted to a Railway volume at `/app/data`. On first launch, you will be prompted to create an admin account directly in the web UI. No environment variables are required to get started.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-uptime-kuma | [c-treinta/railway-uptime-kuma](https://github.com/c-treinta/railway-uptime-kuma) (root: app) | Database |

## Configuration

- **Volume:** `/app/data`

**Category:** Observability · **Languages:** Makefile, Dockerfile

[View on Railway →](https://railway.com/template/uptime-kuma)
