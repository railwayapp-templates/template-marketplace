# Deploy pgAdmin on Railway

A powerful web interface for managing PostgreSQL databases.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgadmin-railway-template)

## About

pgAdmin is a popular open-source administration and development platform for PostgreSQL. It provides a browser-based interface for managing database servers, running SQL queries, inspecting schemas, monitoring activity, managing users, and performing common PostgreSQL administration tasks from a centralized web interface.

![pgAdmin](https://www.pgadmin.org/static/COMPILED/assets/img/screenshot-light.webp?e13d016a)

Hosting pgAdmin gives you remote access to a full PostgreSQL administration interface without installing a desktop database client on every machine.

A hosted pgAdmin instance can connect to PostgreSQL databases running on Railway, another cloud provider, private infrastructure, or any reachable PostgreSQL server.

Railway simplifies the deployment by handling the underlying application infrastructure, persistent storage, networking, and service availability. pgAdmin also includes built-in authentication, making it more suitable for internet-facing administration than database tools that provide no access control.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgAdmin | `dpage/pgadmin4:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | - | Port |
| `PGADMIN_LISTEN_PORT` | 5050 | Port used by the pgAdmin web interface |
| `PGADMIN_DEFAULT_EMAIL` | - | Admin email used to sign in to pgAdmin |
| `PGADMIN_DISABLE_POSTFIX` | true | Disable the built-in Postfix mail server |
| `PGADMIN_DEFAULT_PASSWORD` | (secret) | Admin password used to sign in to pgAdmin |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/pgadmin`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/pgadmin-railway-template)
