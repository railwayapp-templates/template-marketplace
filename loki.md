# Deploy Loki (Grafana) [Updated Mar ’26] on Railway

Loki (Grafana) [Mar ’26] (Real-time monitoring and observability) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/loki)

## About

Loki is an open-source log aggregation system developed by Grafana Labs. Unlike traditional logging tools that index the full content of logs, Loki indexes only the metadata (like labels), making it incredibly cost-efficient and easy to scale. When integrated with Grafana, it becomes a powerful observability solution for monitoring, troubleshooting, and analyzing system logs in real-time.

You can self host Loki and Grafana on Railway to keep all your log data and dashboards fully under your control. With Loki, you gain efficient, scalable log aggregation, while Grafana provides stunning visual dashboards for analytics and observability. Hosting Loki Grafana on Railway allows developers, DevOps engineers, and system administrators to analyze infrastructure and application performance without managing complex infrastructure manually.

Railway simplifies the self-hosting process by providing containerized environments, automated deployments, and managed databases.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| loki-railway | [Shinyduo/loki-railway](https://github.com/Shinyduo/loki-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | UTC |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/loki`

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/loki)
