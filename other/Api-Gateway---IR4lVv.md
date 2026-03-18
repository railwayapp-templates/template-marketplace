# Deploy Api Gateway on Railway

A powerfull ready-to-deploy api gateway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/IR4lVv)

## About

An **API Gateway** acts as a single entry point for all client requests, routing them to the appropriate internal
services. Instead of clients communicating directly with multiple microservices, they only interact with the gateway,
which handles:

* 🔀 **Request routing** → Determines which service should handle the request based on the path.
* 📜 **Centralized logging** → Captures HTTP logs for monitoring and debugging.
* 🔒 **Service abstraction** → Clients don’t need to know the internal URLs of services. Services may not be public on
  the internet.
* 📈 **Scalability** → Easily connect more services.
* 🖥️ **Admin Dashboard** → Visual manage routes and review HTTP logs.

Hosting the Api-Gateway on Railway provisions a complete setup out-of-the-box. The deployment includes:

1. A **PostgreSQL database** to persist routes, configurations, and logs.
2. A **web admin client** to manage routes, logs and settings visually.
3. The **core gateway service**, which processes requests, applies configurations, and handles logging.

This setup isolates your internal microservices from the public internet while providing a single unified API endpoint.

> 📌 By default, the system uses around **200–250 MB RAM**, making it lightweight and cost-efficient.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| api-gateway-ui | [Root-101/api-gateway](https://github.com/Root-101/api-gateway) (root: /tools/api_gateway_front/) | Web service |
| api-gateway | [Root-101/api-gateway](https://github.com/Root-101/api-gateway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | api-gateway-ui | 80 | - |
| `PORT` | api-gateway | 8080 | Port in which the service will be running |
| `DB_HOST` | api-gateway | - | Host of the running DB |
| `DB_NAME` | api-gateway | - | Name of the DB |
| `DB_PORT` | api-gateway | - | Port of the running DB |
| `PROFILE` | api-gateway | TEST | Profile type of the service (Environment) |
| `ADMIN_PATH` | api-gateway | _admin | Path of the admin (management) endpoints |
| `DB_PASSWORD` | api-gateway | (secret) | Password of the DB user |
| `DB_USERNAME` | api-gateway | (secret) | Username of the DB user |
| `ADMIN_PASSWORD` | api-gateway | (secret) | Password of the admin user |
| `ADMIN_USERNAME` | api-gateway | (secret) | Username of the admin user |
| `APPLICATION_NAME` | api-gateway | Api-Gateway | Application name |
| `MAINTAIN_LOGS_FOR_DAYS` | api-gateway | 14 | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dart, Java, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/IR4lVv)
