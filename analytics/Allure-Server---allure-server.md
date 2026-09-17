# Deploy Allure Server on Railway

Allure Server — self-hosted test report dashboard for CI results

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/allure-server)

## About

Host your own Allure Server on Railway. This template provisions a single service with a persistent volume for all test data (results, reports, H2 database).

[![Deploy to Railway](https://railway.app/button.svg)](https://railway.com/deploy/allure-server)

Allure Server is a single-service app on Railway:

1. **Allure Server** — stateless Spring Boot service with a persistent volume mounted at `/allure`

All application data (results, reports, H2 database, configuration) lives under `/allure`. The service itself is stateless and can be rebuilt without data loss as long as the volume remains attached.

### Persistent Storage

The service mounts a 5 GB volume at `/allure`. All test results, generated reports, the H2 database, and server settings persist across restarts and deploys.

### Scaling

- Allure Server is a single-instance app (H2 does not support multi-writer setups)
- Scale vertically by increasing the volume size for more historical data
- For high-availability use cases, consider the PostgreSQL variant (see upstream docs)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| allure-server | [mc9max/allure-server](https://github.com/mc9max/allure-server) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP port the Allure Server listens on. Railway exposes this publicly. |
| `BASIC_AUTH_PASSWORD` | (secret) | Bootstrap admin password. Change after first login via /app/admin/users. |
| `BASIC_AUTH_USERNAME` | (secret) | Bootstrap admin username. Seeded on first startup; manage users via /app/admin/users. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/allure`

**Category:** Analytics · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/allure-server)
