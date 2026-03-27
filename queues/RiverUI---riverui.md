# Deploy RiverUI on Railway

RiverUI is a web interface for managing River job processing system

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/riverui)

## About

[River](https://riverqueue.com/) is an atomic, transaction-safe job queueing for Go applications. Backed by PostgreSQL and built to scale. RiverUI is the web management frontend that allows you to manage jobs.

To host and use RiverUI, first ensure you have a Postgres database instance setup with the [River schema](https://riverqueue.com/docs/migrations). Then, you can deploy this template. For the database URL environment variable, use `${{Postgres.DATABASE_URL}}` (or whatever your Postgres instance variable is).

After deployment, please make sure you modify the `RIVER_BASIC_AUTH_USER` and `RIVER_BASIC_AUTH_PASS` variables to secure your deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| riverqueue/riverui:latest | `ghcr.io/riverqueue/riverui:latest` | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `RIVER_LOG_LEVEL` | info |
| `RIVER_BASIC_AUTH_PASS` | Admin_passw0rd_012! |
| `RIVER_BASIC_AUTH_USER` | (secret) |
| `RIVER_JOB_LIST_HIDE_ARGS_BY_DEFAULT` | false |

**Category:** Queues

[View on Railway →](https://railway.com/deploy/riverui)
