# Deploy Cron Webhook Trigger on Railway

Trigger authenticated HTTP endpoints on a schedule

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/cron-webhook-trigger)

## About

A lightweight Bun function that triggers HTTP endpoints on a schedule using Bearer token authentication. Perfect for running scheduled tasks, triggering webhooks, or pinging external APIs securely without managing infrastructure.

This template deploys a minimal Bun function on Railway that calls a configured endpoint with a `CRON_SECRET` Bearer token for authentication. The function runs on Railway's cron scheduler, which you configure in the Settings tab after deployment. All logs are structured JSON for easy debugging in Railway's log viewer. Simply set your environment variables, configure your cron schedule, and your endpoint will be called automatically at your specified interval.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cron-job | `ghcr.io/railwayapp/function-bun:1.3.0` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CRON_SECRET` | (secret) | The authorization key |
| `ENDPOINT_URL` | - | The endpoint you want the cron job to call |

## Configuration

- **Start command:** `./run.sh Y29uc3QgY3JvblNlY3JldCA9IGltcG9ydC5tZXRhLmVudi5DUk9OX1NFQ1JFVDsKY29uc3QgZW5kcG9pbnRVcmwgPSBpbXBvcnQubWV0YS5lbnYuRU5EUE9JTlRfVVJMOwoKdHJ5IHsKICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGVuZHBvaW50VXJsLCB7CiAgICBtZXRob2Q6ICJQT1NUIiwKICAgIGhlYWRlcnM6IHsKICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2Nyb25TZWNyZXR9YCwKICAgICAgIkNvbnRlbnQtVHlwZSI6ICJhcHBsaWNhdGlvbi9qc29uIiwKICAgIH0sCiAgfSk7CgogIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7CgogIGNvbnNvbGUubG9nKAogICAgSlNPTi5zdHJpbmdpZnkoewogICAgICBsZXZlbDogcmVzcG9uc2Uub2sgPyAiaW5mbyIgOiAiZXJyb3IiLAogICAgICBtZXNzYWdlOiByZXNwb25zZS5vayA/ICJDcm9uIGpvYiBjb21wbGV0ZWQiIDogIkNyb24gam9iIGZhaWxlZCIsCiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLAogICAgICBkYXRhLAogICAgfSkKICApOwp9IGNhdGNoIChlcnJvcikgewogIGNvbnNvbGUubG9nKAogICAgSlNPTi5zdHJpbmdpZnkoewogICAgICBsZXZlbDogImVycm9yIiwKICAgICAgbWVzc2FnZTogIkNyb24gam9iIGZhaWxlZCIsCiAgICAgIGVycm9yOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6ICJVbmtub3duIGVycm9yIiwKICAgIH0pCiAgKTsKICBwcm9jZXNzLmV4aXQoMSk7Cn0K`

**Category:** Automation

[View on Railway →](https://railway.com/template/cron-webhook-trigger)
