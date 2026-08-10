# Deploy Apache Druid on Railway

Secured Apache Druid single-node analytics with persistent local storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apache-druid-single-node)

## About

Apache Druid is a high-performance analytics database for event-oriented data and low-latency OLAP queries. This template packages the Druid `37.0.0` nano quickstart with Basic Security and persistent local storage for evaluation and small workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| druid | [monotykamary/railway-template-apache-druid](https://github.com/monotykamary/railway-template-apache-druid) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8888 | Apache Druid Router and Railway health-check port. Keep this at 8888. |
| `DRUID_ADMIN_PASSWORD` | (secret) | Password for the initial Druid admin user. Generated for every deployment. |
| `DRUID_INTERNAL_PASSWORD` | (secret) | Private password used for authenticated communication among Druid roles. Generated independently. |

## Configuration

- **Healthcheck:** `/status/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/druid/var`

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/apache-druid-single-node)
