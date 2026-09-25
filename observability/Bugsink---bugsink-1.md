# Deploy Bugsink on Railway

Bugsink 2.6 self-hosted error tracking that works with Sentry SDKs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bugsink-1)

## About

Bugsink is a self-hosted error tracker that is compatible with the Sentry SDKs. Applications in Python, JavaScript, Go, Ruby, PHP, Java and more report exceptions to a DSN, and Bugsink groups them into issues with stack traces, breadcrumbs, tags and email alerts, without the operational weight of self-hosted Sentry.

This template deploys Bugsink v2.6.0 from the official image as a single service with SQLite on a Railway volume. The admin account is created from environment variables on first start, and phone-home is off. The server listens on IPv4 and IPv6, so applications on Railway can report over the private network or through the public domain. Host checks cover your Railway domain and Railway's health check. Bugsink is light and fits the Hobby plan; the volume grows with stored events. Point any Sentry SDK at the DSN of a project you create in the web UI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bugsink | `bugsink/bugsink:2.6.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8000 |
| `PHONEHOME` | false |
| `SECRET_KEY` | (secret) |
| `DATABASE_PATH` | /data/db.sqlite3 |
| `BEHIND_HTTPS_PROXY` | true |
| `BUGSINK_ADMIN_EMAIL` | admin@example.com |
| `BUGSINK_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Start command:** `sh -c 'exec monofy bugsink-show-version "&&" bugsink-manage check --deploy --fail-level WARNING "&&" bugsink-manage migrate snappea --database=snappea "&&" bugsink-manage migrate "&&" bugsink-manage prestart "&&" gunicorn --config gunicorn.docker.conf.py "--bind=[::]:$PORT" --access-logfile - bugsink.wsgi "|||" bugsink-runsnappea'`
- **Healthcheck:** `/health/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/bugsink-1)
