# Deploy Netdata [Updated Mar ’26] on Railway

Netdata [Mar ’26] (Application Monitoring alternative to Datadog) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/netdata)

## About

Netdata is a free, open-source, real-time monitoring and troubleshooting tool available on **Netdata GitHub**. It provides in-depth insights into servers, containers, applications, and networks, helping engineers, developers, and businesses detect issues quickly and maintain system health. Netdata is widely known for its modern, interactive dashboard, lightweight footprint, and ability to analyze thousands of metrics per second without slowing down your infrastructure.

You can self-host Netdata to monitor your servers, apps, and cloud environments in real time. By hosting it on Railway, you get complete control over your monitoring data with zero third-party interference. Netdata’s dashboards are intuitive and packed with detailed visualizations, letting you troubleshoot performance bottlenecks, security issues, and system failures within seconds. Hosting on Railway makes the deployment process seamless, with automated scaling, minimal configuration, and built-in security.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| netdata-railway | [Shinyduo/netdata-railway](https://github.com/Shinyduo/netdata-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 19999 | - |
| `NETDATA_WEB_MODE` | - | Leave NETDATA_WEB_MODE empty (default UI enabled) |
| `NETDATA_CLAIM_URL` | https://app.netdata.cloud | - |
| `NETDATA_CLAIM_ROOMS` | - | Fill NETDATA_CLAIM_ROOMS if you want Cloud; otherwise leave blank. |
| `NETDATA_CLAIM_TOKEN` | (secret) | Fill NETDATA_CLAIM_TOKEN if you want Cloud; otherwise leave blank. |
| `NETDATA_HEALTHCHECK_TARGET` | cli | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/netdata-storage`

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/netdata)
