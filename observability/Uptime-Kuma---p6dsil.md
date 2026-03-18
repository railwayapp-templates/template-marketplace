# Deploy Uptime Kuma on Railway

A fancy self-hosted monitoring tool

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/p6dsil)

## About

Uptime Kuma is an easy-to-use self-hosted monitoring tool for tracking the availability of websites, APIs, and services. It provides real-time monitoring with customizable notifications and status dashboards.

Uptime Kuma runs as a Node.js application that continuously monitors your services by sending HTTP requests, pings, and other checks on scheduled intervals. You'll need to manage monitoring data storage, handle notification delivery systems, and maintain check scheduling reliability. The application stores historical uptime data, incident logs, and configuration settings requiring database management and backup procedures. Resource usage scales with the number of monitored services and check frequency.

![Uptime Kuma Logo](https://uptime.kuma.pet/img/icon.svg)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Uptime Kuma | `louislam/uptime-kuma:latest` | Web service |

## Configuration

- **Healthcheck:** `/dashboard`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/p6dsil)
