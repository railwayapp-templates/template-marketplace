# Deploy xyops | Automation Scheduling monitoring on Railway

Scheduling, automation, server monitoring, alerting, and incident response.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/xyops-or-automation-scheduling-monitorin)

## About

xyOps is a cohesive, open-source platform that combines advanced job scheduling, workflow automation, server monitoring, and incident response. Designed for developers and operations teams, it offers an integrated feedback loop linking scheduled tasks directly to real-time alerts, ticketing, and comprehensive system snapshots.

Hosting xyOps requires setting up a robust runtime environment capable of managing continuous background scheduling, workflow orchestration, and fleet monitoring. Because xyOps is built on Node.js and includes a pre-configured `Dockerfile`, deploying it on modern cloud platforms like Railway is straightforward. The deployment process involves pulling the source code, building the application, and configuring persistent storage to hold your workflow settings and configuration files (such as `conf/overrides.json`). Setting this up on Railway ensures automatic deployments, easy environment variable management, and seamless scaling as your server fleet or automation pipelines grow.

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

**Category:** Automation

[View on Railway →](https://railway.com/deploy/xyops-or-automation-scheduling-monitorin)
