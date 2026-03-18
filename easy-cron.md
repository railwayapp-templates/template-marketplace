# Deploy easy-cron on Railway

A distributed cron job scheduler

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/easy-cron)

## About

EasyCron is a distributed cron job scheduler with webhook delivery, written in Go. It allows applications to register time-based jobs via a REST API and receive HTTP webhook notifications when jobs fire according to their cron schedules. It includes HMAC-SHA256 signature verification, exponential backoff retries, and execution history tracking.

Hosting EasyCron requires a PostgreSQL database for storing job definitions, schedules, execution records, and delivery attempts. The application runs as a single Docker container that exposes a REST API on port 8080. Configuration is handled through environment variables, with `DATABASE_URL` being the only required setting. Optional Redis integration enables execution analytics. The scheduler polls for due jobs at configurable intervals (default 30 seconds) and dispatches webhooks with automatic retry logic. Health checks are available at `/health` for orchestration platforms.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| easy-cron | [djlord-it/easy-cron](https://github.com/djlord-it/easy-cron) | Worker |

**Category:** Queues · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/template/easy-cron)
