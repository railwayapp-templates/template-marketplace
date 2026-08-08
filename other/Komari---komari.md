# Deploy Komari on Railway

A simple server monitor tool

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/komari)

## About

Komari is a simple, lightweight server monitoring tool designed to provide real-time insights into your infrastructure. Its primary purpose is to track server metrics, uptime, and performance directly from a unified web dashboard. Major features include quick setup and comprehensive metrics, making it ideal for system administrators managing multiple virtual machines.

Hosting Komari on Railway utilizes the platform's robust container infrastructure to run the pre-built Docker image securely. Railway simplifies the deployment process by automatically managing container orchestration, eliminating the need for manual server configuration.

The application relies on persistent storage to maintain monitoring data, historical metrics, and user configurations across container restarts. Railway handles this seamlessly through its integrated volume management. Networking is automatically configured, with Railway providing an out-of-the-box HTTPS edge proxy that routes external traffic directly to the application's internal web interface.

Because Komari utilizes local storage rather than an external database, it is designed to run as a single instance. Railway's platform ensures that your monitoring dashboard remains highly available and easily manageable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| komari-monitor/komari:1.2.6 | `ghcr.io/komari-monitor/komari:1.2.6` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 25774 | - |
| `ADMIN_PASSWORD` | (secret) | your passward |
| `ADMIN_USERNAME` | (secret) | your username |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/komari)
