# Deploy Kong API Gateway on Railway

Deploy and Host Kong API Gateway with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/kong-api-gateway)

## About

Kong is a lightweight, fast, and scalable open-source API Gateway. It acts as a single entry point for your APIs and microservices, managing traffic, authentication, and observability. With its plugin-based architecture, you can easily extend its functionality to secure, manage, and monitor your entire API landscape.

Hosting Kong involves running the Kong open-source application alongside a dedicated database, typically PostgreSQL, which stores all your configuration data—routes, services, plugins, and consumers. The initial setup requires running database migrations to prepare the schema. This Railway template simplifies the process by provisioning both the Kong service and a PostgreSQL database. You simply need to configure Kong using environment variables to connect to the database instance provided by Railway. Railway manages the underlying infrastructure, networking, and deployment, allowing you to focus on configuring your APIs instead of managing servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| kong-migration | `kong:latest` | Worker |
| Kong API Gateway | `kong:latest` | Web service |
| konga | `pantsel/konga:latest` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `KONG_PG_USER` | kong-migration | (secret) |
| `KONG_DATABASE` | kong-migration | postgres |
| `KONG_PG_PASSWORD` | kong-migration | (secret) |
| `KONG_CASSANDRA_CONTACT_POINTS` | kong-migration | kong-database |
| `KONG_PG_USER` | Kong API Gateway | (secret) |
| `KONG_DATABASE` | Kong API Gateway | postgres |
| `KONG_PG_PASSWORD` | Kong API Gateway | (secret) |
| `KONG_ADMIN_LISTEN` | Kong API Gateway | 0.0.0.0:8001, 0.0.0.0:8444 ssl |
| `KONG_ADMIN_ERROR_LOG` | Kong API Gateway | /dev/stderr |
| `KONG_PROXY_ERROR_LOG` | Kong API Gateway | /dev/stderr |
| `KONG_ADMIN_ACCESS_LOG` | Kong API Gateway | /dev/stdout |
| `KONG_PROXY_ACCESS_LOG` | Kong API Gateway | /dev/stdout |
| `DB_USER` | konga | (secret) |
| `NODE_ENV` | konga | production |
| `DB_ADAPTER` | konga | postgres |
| `DB_PASSWORD` | konga | (secret) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `kong migrations bootstrap`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/kong-api-gateway)
