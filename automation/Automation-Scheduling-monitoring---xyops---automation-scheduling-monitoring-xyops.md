# Deploy Automation, Scheduling, monitoring - xyops on Railway

Scheduling, automation, server monitoring, alerting, and incident response.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/automation-scheduling-monitoring-xyops)

## About

xyOps is an open-source platform that combines workflow automation, job scheduling, infrastructure monitoring, and incident response into a single application. Designed for developers, DevOps engineers, and operations teams, it enables users to automate recurring tasks, monitor systems in real time, manage alerts, and visualize operational health through an integrated web dashboard.

![xylopus](https://raw.githubusercontent.com/arloodots/images-icons/refs/heads/main/workflow.png)

Railway makes deploying and managing xyOps simple by handling the infrastructure, networking, and HTTPS automatically. This template uses the official Docker image, allowing Railway to deploy the application without any custom build process. A Railway Volume mounted at `/data` persists application data and configuration across deployments and restarts. Railway also provides secure HTTPS endpoints, environment variable management, automatic deployments, and scalable infrastructure, making it an ideal platform for running continuous automation workflows, scheduled jobs, and infrastructure monitoring services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pixlcore/xyops:latest | `ghcr.io/pixlcore/xyops:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | America/New_York |
| `XYOPS_echo` | true |
| `XYOPS_foreground` | true |
| `XYOPS_xysat_local` | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/automation-scheduling-monitoring-xyops)
