# Deploy Pact Broker on Railway

Pact Broker 2.121: share and verify consumer-driven API contracts.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pact-broker-1)

## About

The Pact Broker stores and shares consumer-driven contracts between services. Consumer tests publish pacts, provider builds fetch and verify them, and the broker records which versions work together. Its can-i-deploy check tells your pipeline whether a release is safe, which makes integration testing of microservices faster and less brittle.

This template runs the official `pactfoundation/pact-broker:3.0.0-pactbroker2.121.2` image with a Railway Postgres database. Basic authentication is on, with two generated accounts: `admin` can publish pacts and results, and `reader` can only read them. Anonymous visitors get a login prompt, except for the heartbeat endpoint used as the health check. On first boot, the start command waits until the database hostname resolves, then the broker creates its schema. The web UI and the HAL API share one HTTPS domain. Anonymous usage pings from the image are turned off. It fits the Hobby plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pact-broker | `pactfoundation/pact-broker:3.0.0-pactbroker2.121.2` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | pact-broker | 9292 |
| `PACT_BROKER_PORT` | pact-broker | 9292 |
| `PACT_DO_NOT_TRACK` | pact-broker | true |
| `PACT_BROKER_LOG_LEVEL` | pact-broker | info |
| `PACT_BROKER_DATABASE_ADAPTER` | pact-broker | postgres |
| `PACT_BROKER_PUBLIC_HEARTBEAT` | pact-broker | true |
| `PACT_BROKER_ALLOW_PUBLIC_READ` | pact-broker | false |
| `PACT_BROKER_DATABASE_PASSWORD` | pact-broker | (secret) |
| `PACT_BROKER_DATABASE_USERNAME` | pact-broker | (secret) |
| `PACT_BROKER_BASIC_AUTH_PASSWORD` | pact-broker | (secret) |
| `PACT_BROKER_BASIC_AUTH_USERNAME` | pact-broker | (secret) |
| `PACT_BROKER_BASIC_AUTH_READ_ONLY_PASSWORD` | pact-broker | (secret) |
| `PACT_BROKER_BASIC_AUTH_READ_ONLY_USERNAME` | pact-broker | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `sh -c 'for i in $(seq 1 60); do getent hosts "$PACT_BROKER_DATABASE_HOST" >/dev/null && break; echo "waiting for $PACT_BROKER_DATABASE_HOST"; sleep 3; done; exec sh ./entrypoint.sh config.ru'`
- **Healthcheck:** `/diagnostic/status/heartbeat`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/pact-broker-1)
