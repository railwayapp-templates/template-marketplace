# Deploy Hatchet Lite on Railway

Run AI agents, background tasks, and data pipelines at scale with Hatchet

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/7oEFNd)

## About

# Hatchet.run - Hatchet-lite

This template deploys Hatchet Lite, a lightweight version of the Hatchet.run distributed task queue system, on Railway.com.

Hatchet is a high-throughput, low-latency computing service. It's built on an open-source, fault-tolerant queue, allowing work to be delivered as fast as your system can handle -- without dropping a single task -- Backed by Y Combinator

Similar Tools: Inngest, Trigger.dev, Temporal. 

Log In via the default User Credentials - As of writing, these are:

Email: admin@example.com
Password: Admin123!!

Don't forget to change these! 

For more details on self-hosting Hatchet Lite, refer to the official documentation: https://docs.hatchet.run/self-hosting/hatchet-lite

All Available Configuration Options: https://docs.hatchet.run/self-hosting/configuration-options

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| hatchet-lite | `ghcr.io/hatchet-dev/hatchet/hatchet-lite:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | hatchet-lite | 8888 | - |
| `SERVER_URL` | hatchet-lite | - | Your Public Networking URL |
| `POSTGRES_USER` | hatchet-lite | (secret) | - |
| `SERVER_GRPC_PORT` | hatchet-lite | 7077 | - |
| `POSTGRES_PASSWORD` | hatchet-lite | (secret) | - |
| `SERVER_GRPC_INSECURE` | hatchet-lite | true | - |
| `SERVER_MSGQUEUE_KIND` | hatchet-lite | postgres | - |
| `SERVER_GRPC_BIND_ADDRESS` | hatchet-lite | 0.0.0.0 | - |
| `SERVER_AUTH_COOKIE_DOMAIN` | hatchet-lite | - | Your Public Networking URL |
| `SERVER_AUTH_COOKIE_INSECURE` | hatchet-lite | true | - |
| `SERVER_DEFAULT_ENGINE_VERSION` | hatchet-lite | V1 | - |
| `SERVER_GRPC_BROADCAST_ADDRESS` | hatchet-lite | localhost:7077 | - |
| `SERVER_AUTH_SET_EMAIL_VERIFIED` | hatchet-lite | true | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/config`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/7oEFNd)
