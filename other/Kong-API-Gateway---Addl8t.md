# Deploy Kong API Gateway on Railway

Setup for Kong Gateway with PostgreSQL and Konga UI management.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Addl8t)

## About

## Overview

This setup provides a full environment for running Kong Gateway, a powerful and flexible API management solution, alongside PostgreSQL for database storage and Konga UI for a user-friendly web interface to manage Kong.

## Services Description

### 1. kong-database
- **Image**: postgres:latest
- **Description**: This service runs a PostgreSQL database that stores Kong Gateway's configuration and runtime data.
- **Environment Variables**: 
  - `POSTGRES_USER`: User for PostgreSQL (default: kong)
  - `POSTGRES_DB`: Database name for PostgreSQL (default: kong)
  - `POSTGRES_PASSWORD`: Password for PostgreSQL (default: kong)
- **Ports**: Exposes port `5432`
- **Volumes**: Uses a named volume `kong-data` to persist data
- **Health Check**: Ensures PostgreSQL is ready before other services start

### 2. kong-migration
- **Image**: kong:latest
- **Description**: A temporary service that initializes the database by running Kong migrations.
- **Environment Variables**: 
  - `KONG_DATABASE`: Database type (postgres)
  - `KONG_PG_HOST`: Host of PostgreSQL service (kong-database)
  - `KONG_PG_USER`: User for PostgreSQL (same as POSTGRES_USER)
  - `KONG_PG_PASSWORD`: Password for PostgreSQL (same as POSTGRES_PASSWORD)
- **Command**: Runs `kong migrations bootstrap` to set up the database schema
- **Depends On**: Waits for `kong-database` to be healthy before starting

### 3. kong
- **Image**: kong:latest
- **Description**: The main Kong Gateway service that manages and routes APIs.
- **Environment Variables**: 
  - Various configurations for logging, admin API listening, and database connection
  - `KONG_DATABASE`: Database type (postgres)
  - `KONG_PG_HOST`: Host of PostgreSQL service (kong-database)
  - `KONG_PG_USER`: User for PostgreSQL (same as POSTGRES_USER)
  - `KONG_PG_PASSWORD`: Password for PostgreSQL (same as POSTGRES_PASSWORD)
- **Ports**: Exposes ports `8000`, `8443`, `8001`, and `8444` for proxy and admin API
- **Health Check**: Ensures the Kong service is operational

### 4. konga
- **Image**: pantsel/konga:latest
- **Description**: Konga provides a web interface to manage Kong Gateway.
- **Environment Variables**: 
  - Configuration for connecting to the PostgreSQL database
  - `DB_ADAPTER`: Database adapter (postgres)
  - `DB_HOST`: Host of PostgreSQL service (kong-database)
  - `DB_USER`: User for PostgreSQL (same as POSTGRES_USER)
  - `DB_PASSWORD`: Password for PostgreSQL (same as POSTGRES_PASSWORD)
  - `DB_DATABASE`: Database name (same as POSTGRES_DB)
  - `NODE_ENV`: Environment mode (production)
- **Ports**: Exposes port `1337` for accessing the Konga UI
- **Health Check**: Ensures the Konga service is operational

## Getting Started

1. **Clone the Repository**: Download the project to your local machine.
2. **Create a .env File**: Add the following environment variables in a `.env` file:
   ```env
   POSTGRES_USER=kong
   POSTGRES_DB=kong
   POSTGRES_PASSWORD=kong
   ```
3. **Start the Services**: Use the command `docker-compose up -d` to start all services.

## Access Points

- **Kong Admin API**: Available at `http://localhost:8001` and `https://localhost:8444`
- **Konga UI**: Available at `http://localhost:1337`

## Volumes

- **kong-data**: This named volume persists PostgreSQL data to ensure it survives container restarts.

## Health Checks

- Each service is equipped with health checks to verify their operational status and facilitate automatic recovery.

This setup ensures a robust and easy-to-manage environment for API management using Kong, with PostgreSQL for data storage and Konga UI for streamlined administration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Kong API Gateway | `kong:latest` | Worker |
| kong-migration | `kong:latest` | Worker |
| konga | `pantsel/konga:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `KONG_PG_HOST` | Kong API Gateway | kong-database | - |
| `KONG_PG_USER` | Kong API Gateway | (secret) | - |
| `KONG_DATABASE` | Kong API Gateway | postgres | - |
| `KONG_PG_PASSWORD` | Kong API Gateway | (secret) | - |
| `KONG_ADMIN_LISTEN` | Kong API Gateway | 0.0.0.0:8001, 0.0.0.0:8444 ssl | - |
| `KONG_ADMIN_ERROR_LOG` | Kong API Gateway | /dev/stderr | - |
| `KONG_PROXY_ERROR_LOG` | Kong API Gateway | /dev/stderr | - |
| `KONG_ADMIN_ACCESS_LOG` | Kong API Gateway | /dev/stdout | - |
| `KONG_PROXY_ACCESS_LOG` | Kong API Gateway | /dev/stdout | - |
| `KONG_PG_HOST` | kong-migration | kong-database | - |
| `KONG_PG_USER` | kong-migration | (secret) | - |
| `KONG_DATABASE` | kong-migration | postgres | - |
| `KONG_PG_PASSWORD` | kong-migration | (secret) | - |
| `KONG_CASSANDRA_CONTACT_POINTS` | kong-migration | kong-database | - |
| `DB_HOST` | konga | kong-database | - |
| `DB_USER` | konga | (secret) | - |
| `NODE_ENV` | konga | production | - |
| `DB_ADAPTER` | konga | postgres | - |
| `DB_DATABASE` | konga | ${POSTGRES_DB:-kong} | - |
| `DB_PASSWORD` | konga | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `kong migrations bootstrap`

**Category:** Other

[View on Railway →](https://railway.com/deploy/Addl8t)
