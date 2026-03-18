# Deploy Pact Broker on Railway

Deploy and host a Pact Broker on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/pact-broker)

## About

This template will deploy a Pact Broker and Postgres database using the [pactfoundation/pact-broker](https://hub.docker.com/r/pactfoundation/pact-broker) docker image.

Deploying this template should hopefully be straightforward. No config changes are required and it is configured with public networking enabled so once deployed you should be able to access the public URL.

**Please note that once the broker is deployed, it will be publicly accessible as it does not have authentication enabled so please give careful consideration to what data you are publishing to the broker.**

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pactfoundation/pact-broker | `pactfoundation/pact-broker` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PACT_BROKER_DATABASE_HOST` | pactfoundation/pact-broker | - | Postgres DB host. |
| `PACT_BROKER_DATABASE_NAME` | pactfoundation/pact-broker | - | Postgres DB name. |
| `PACT_BROKER_DATABASE_PASSWORD` | pactfoundation/pact-broker | (secret) | Postgres DB password. |
| `PACT_BROKER_DATABASE_USERNAME` | pactfoundation/pact-broker | (secret) | Postgres DB username. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/pact-broker)
