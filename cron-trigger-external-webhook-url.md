# Deploy Cron Trigger External Webhook URL on Railway

Call external webhook URL with auth header tokens via Cron Schedule

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/cron-trigger-external-webhook-url)

## About

A lightweight Bun function that triggers HTTP endpoints on a schedule using Bearer token authentication. Perfect for running scheduled tasks, triggering webhooks, or pinging external APIs securely without managing infrastructure.

This template deploys a minimal Bun function on Railway that calls a configured endpoint with a `CRON_SECRET` Bearer token for authentication. The function runs on Railway's cron scheduler, which you configure in the Settings tab after deployment. All logs are structured JSON for easy debugging in Railway's log viewer. Simply set your environment variables, configure your cron schedule, and your endpoint will be called automatically at your specified interval.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bun Function | `ghcr.io/railwayapp/function-bun:1.3.0` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CRON_SECRET` | (secret) | A secure token used in the Authorization Bearer header |
| `CRON_ENDPOINT_URL` | - | The external URL to call when the cron job runs |

## Configuration

- **Start command:** `./run.sh Y29uc3QgY3JvblNlY3JldCA9IHByb2Nlc3MuZW52LkNST05fU0VDUkVUOwpjb25zdCBlbmRwb2ludFVybCA9IHByb2Nlc3MuZW52LkNST05fRU5EUE9JTlRfVVJMOwoKaWYgKCFjcm9uU2VjcmV0IHx8ICFlbmRwb2ludFVybCkgewogIGNvbnNvbGUuZXJyb3IoCiAgICBKU09OLnN0cmluZ2lmeSh7CiAgICAgIGxldmVsOiAiZXJyb3IiLAogICAgICBtZXNzYWdlOiAiQ1JPTl9TRUNSRVQgYW5kIEVORFBPSU5UX1VSTCBtdXN0IGJlIHNldCIsCiAgICB9KQogICk7CiAgcHJvY2Vzcy5leGl0KDEpOwp9Cgp0cnkgewogIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZW5kcG9pbnRVcmwsIHsKICAgIG1ldGhvZDogIlBPU1QiLAogICAgaGVhZGVyczogewogICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7Y3JvblNlY3JldH1gLAogICAgICAiQ29udGVudC1UeXBlIjogImFwcGxpY2F0aW9uL2pzb24iLAogICAgfSwKICB9KTsKCiAgbGV0IGRhdGEgPSBudWxsOwogIGNvbnN0IGNvbnRlbnRUeXBlID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoImNvbnRlbnQtdHlwZSIpOwogIGlmIChjb250ZW50VHlwZSAmJiBjb250ZW50VHlwZS5pbmNsdWRlcygiYXBwbGljYXRpb24vanNvbiIpKSB7CiAgICB0cnkgewogICAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpOwogICAgfSBjYXRjaCB7CiAgICAgIGRhdGEgPSB7IHJhdzogYXdhaXQgcmVzcG9uc2UudGV4dCgpIH07CiAgICB9CiAgfSBlbHNlIHsKICAgIGRhdGEgPSB7IHJhdzogYXdhaXQgcmVzcG9uc2UudGV4dCgpIH07CiAgfQoKICBjb25zb2xlLmxvZygKICAgIEpTT04uc3RyaW5naWZ5KHsKICAgICAgbGV2ZWw6IHJlc3BvbnNlLm9rID8gImluZm8iIDogImVycm9yIiwKICAgICAgbWVzc2FnZTogcmVzcG9uc2Uub2sgPyAiQ3JvbiBqb2IgY29tcGxldGVkIiA6ICJDcm9uIGpvYiBmYWlsZWQiLAogICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cywKICAgICAgZGF0YSwKICAgIH0pCiAgKTsKCiAgaWYgKCFyZXNwb25zZS5vaykgewogICAgcHJvY2Vzcy5leGl0KDEpOwogIH0KfSBjYXRjaCAoZXJyb3IpIHsKICBjb25zb2xlLmxvZygKICAgIEpTT04uc3RyaW5naWZ5KHsKICAgICAgbGV2ZWw6ICJlcnJvciIsCiAgICAgIG1lc3NhZ2U6ICJDcm9uIGpvYiBmYWlsZWQiLAogICAgICBlcnJvcjogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiAiVW5rbm93biBlcnJvciIsCiAgICB9KQogICk7CiAgcHJvY2Vzcy5leGl0KDEpOwp9Cg==`

**Category:** Automation

[View on Railway →](https://railway.com/template/cron-trigger-external-webhook-url)
