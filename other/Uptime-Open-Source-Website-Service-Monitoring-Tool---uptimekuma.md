# Deploy Uptime (Open-Source Website & Service Monitoring Tool) on Railway

[Updated Mar '26] Self-hosted Website and Service monitoring tool

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/uptimekuma)

## About

Uptime Kuma is a fancy, self-hosted uptime monitoring tool that helps you track whether your websites, APIs, servers, and services are online. It provides real-time monitoring, alerts, and a clean dashboard-without relying on expensive SaaS monitoring platforms.

Uptime Kuma is loved for its beautiful UI, simplicity, and flexibility. You can monitor HTTP endpoints, TCP ports, pings, keywords, Docker containers, and more. It’s designed to be easy enough for beginners while powerful enough for production systems.

With Railway, deploying Uptime Kuma becomes a true one-click experience, letting you run your own monitoring service without worrying about servers or maintenance.

Self hosting Uptime Kuma gives you full ownership of your monitoring data. Instead of sending uptime information to a third-party service, you keep everything inside your own infrastructure.

Traditionally, hosting a monitoring system involves:

*   Setting up servers
    
*   Managing uptime of the monitoring tool itself
    
*   Configuring alerts and persistence
    
*   Handling updates and restarts
    

With Railway, all of this complexity is handled automatically.

Railway runs Uptime Kuma in a managed container environment, handling restarts, logs, networking, and environment variables. You deploy it once and start monitoring your services immediately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| louislam/uptime-kuma:latest | `louislam/uptime-kuma:latest` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/uptimekuma)
