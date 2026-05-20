# Deploy xyOps on Railway

xyOps: jobs, workflows, monitoring, schedules, triggers & REST API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/xyops)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/xyops?referralCode=9uHSFr&utm_medium=integration&utm_source=template&utm_campaign=generic)

xyOps is a modern infrastructure orchestration and operational automation platform designed for managing distributed services, workflows, and DevOps operations at scale. Built for reliability and flexibility, xyOps enables teams to centralize automation, monitor services, and manage operational workloads from a unified environment.

Hosting xyOps requires persistent storage for operational data, configuration files, and logs. The platform also requires Docker socket access for infrastructure orchestration and container management capabilities. Railway provisions networking, SSL, deployment workflows, and scalable infrastructure automatically.

The application exposes services on ports `5522` and `5523` for cluster communication, orchestration, and internal service management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| xyOps | `ghcr.io/pixlcore/xyops:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | America/New_York |
| `XYOPS_masters` | xyops01.internal.mycompany.com |
| `XYOPS_xysat_local` | true |

## Configuration

- **Volume:** `/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/xyops)
