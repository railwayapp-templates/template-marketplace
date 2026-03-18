# Deploy Healthcheck on Railway

Cron job and background task monitoring service, written in Python & Django

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jL-MMA)

## About

## HealthCheck

**What it is?**

Healthcheck is an open-source service that listens for pings from your cron jobs, background tasks, and web services. It provides a simple and reliable way to monitor these processes and ensure they are running as expected. Think of it as a dead man's switch for your automated tasks – if a check-in doesn't arrive on time, you'll get notified.

**How it is useful or helpful?**

This service is incredibly helpful for maintaining the reliability and stability of your systems. By using healthchecks, you can:

* **Detect silent failures:** Know immediately if a critical background job fails to complete, even if it doesn't produce an error log.
* **Improve system observability:** Gain better insight into the health and status of your automated processes.
* **Receive timely alerts:** Get notified via various channels (email, SMS, etc.) when a heartbeat is missed, allowing you to take corrective action quickly.
* **Simplify monitoring:** Implement a lightweight and straightforward monitoring solution without the complexity of full-fledged monitoring systems for simple tasks.
* **Build more resilient applications:** Ensure that dependent tasks are running as expected, contributing to the overall health of your application.

**Features:**

* Simple HTTP API: Easy to integrate with any application or scripting language using simple HTTP requests.
* Customizable check-in intervals: Define expected heartbeat frequencies for each job.
* Configurable grace periods: Set a buffer time before a missed check-in triggers an alert.
* Multiple notification channels: Supports email, SMS, and various third-party integrations (e.g., Slack, Pushover).
* Web dashboard: Provides a clear overview of the status of all your monitored jobs.
* Tagging and filtering: Organize and manage your checks effectively using tags.
* Open-source: Fully transparent and customizable to fit your specific needs.
* Self-hostable: You have complete control over your monitoring infrastructure.

For more detailed information and advanced usage, be sure to check out the official documentation at [https://github.com/healthchecks/healthchecks/](https://github.com/healthchecks/healthchecks/) and the Docker-specific health checks guide at [https://github.com/linuxserver/docker-healthchecks](https://github.com/linuxserver/docker-healthchecks).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Health Check | `healthchecks/healthchecks` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB` | Health Check | postgres | - |
| `PORT` | Health Check | 8000 | - |
| `DEBUG` | Health Check | False | - |
| `DB_PORT` | Health Check | 5432 | - |
| `DB_USER` | Health Check | (secret) | - |
| `DB_SSLMODE` | Health Check | prefer | - |
| `SECRET_KEY` | Health Check | (secret) | - |
| `DB_PASSWORD` | Health Check | (secret) | - |
| `DB_CONN_MAX_AGE` | Health Check | 0 | - |
| `SUPERUSER_PASSWORD` | Health Check | (secret) | - |
| `DB_TARGET_SESSION_ATTRS` | Health Check | read-write | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/jL-MMA)
