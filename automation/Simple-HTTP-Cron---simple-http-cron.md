# Deploy Simple HTTP Cron on Railway

A lightweight web app for scheduling HTTP requests

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/simple-http-cron)

## About

Simple HTTP Cron is a lightweight web app for scheduling HTTP requests using cron expressions. Define jobs with any HTTP method, custom headers, and a request body — then set a cron schedule and let the server fire them automatically.

Hosting Simple HTTP Cron on Railway involves deploying a single Node.js (Express) service built from the included Dockerfile. The app runs on port 8000 and persists scheduled jobs to a JSON file. **This template** handles all the setup automatically: it generates random credentials via `${{ secret() }}`, mounts a persistent volume at `/app/data` for `db.json`, and exposes the service publicly. All routes — including the UI — are protected by HTTP Basic Auth, keeping your scheduler secure from the moment it's deployed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| simple-http-cron | [guitartsword/simple-http-cron](https://github.com/guitartsword/simple-http-cron) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8000 |
| `ADMIN_PASSWORD` | (secret) |
| `ADMIN_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Automation · **Languages:** HTML, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/simple-http-cron)
