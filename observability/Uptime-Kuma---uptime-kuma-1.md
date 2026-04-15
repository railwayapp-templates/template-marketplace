# Deploy Uptime Kuma on Railway

A powerful, free, and easy-to-use self-hosted tool for monitoring uptimes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/uptime-kuma-1)

## About

Uptime Kuma is an easy-to-use, open-source self-hosted monitoring tool for tracking the availability of websites, APIs, and services. It provides a fancy real-time dashboard with customizable notifications, allowing you to monitor HTTP(s), TCP, and ICMP ping with high precision and minimal setup effort.

Uptime Kuma runs as a Node.js application that continuously monitors your services by sending requests and pings on scheduled intervals. Hosting it requires managing persistent data storage for historical uptime logs, incident records, and configuration settings. On Railway, this is typically handled via a Docker container. Since resource usage scales with the number of monitored services and check frequency, Railway’s infrastructure provides the necessary reliability for check scheduling and notification delivery without the burden of manual server maintenance or complex database management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| louislam/uptime-kuma | `louislam/uptime-kuma` | Database |

## Configuration

- **Volume:** `/app/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/uptime-kuma-1)
