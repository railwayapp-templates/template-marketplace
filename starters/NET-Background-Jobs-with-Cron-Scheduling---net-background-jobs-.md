# Deploy .NET Background Jobs with Cron Scheduling on Railway

.NET Starter template for Background Jobs & Cron Jobs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/net-background-jobs-)

## About

Deploy and Host .NET Background Jobs with Cron A clean, minimal .NET 9 worker service template with attribute-based job discovery. Features zero-configuration background services and Quartz.NET cron scheduling - no boilerplate code or manual service wiring required.

This template deploys a production-ready .NET 9 worker service with comprehensive background job capabilities. It combines Microsoft's BackgroundService with Quartz.NET's cron scheduling through a clean attribute-based API that eliminates manual configuration. The service automatically discovers and registers jobs at startup, providing both continuous background processing and flexible cron-based scheduling with built-in resilience features like auto-retry mechanisms for mission-critical tasks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dotnet-backgroundworker | [railtools/dotnet-backgroundworker](https://github.com/railtools/dotnet-backgroundworker) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `Logging__LogLevel__Default` | Information | Log Level |
| `Logging__LogLevel__Microsoft.Hosting.Lifetime` | Information | Log level Microsoft |

**Category:** Starters · **Languages:** C#, Dockerfile

[View on Railway →](https://railway.com/deploy/net-background-jobs-)
