# Deploy evolution-go on Railway

Deploy and Host evolution-go with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evolution-go)

## About

Evolution-go is a robust, high-performance WhatsApp API built in Go. It allows developers to integrate WhatsApp messaging capabilities into their applications, customer service platforms, and automation workflows. It offers a fast, resource-efficient solution, providing seamless multi-device support and easy webhook management.

Hosting evolution-go on Railway involves deploying its official Docker image alongside a PostgreSQL database for persistent storage. The setup requires configuring environment variables to connect the application to the database and setting up authentication keys for secure API access. Railway's platform automatically manages the container lifecycle, ensuring the service remains highly available. Since the image is pre-built, the deployment process is extremely fast, bypassing manual build steps. Once deployed, the service exposes an API endpoint that can be instantly consumed by your systems or automation builders like n8n and Typebot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| evolution-go | [felipersd8/evolution-go](https://github.com/felipersd8/evolution-go) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | evolution-go | 8080 |
| `LOGTYPE` | evolution-go | console |
| `WA_DEBUG` | evolution-go | INFO |
| `CLIENT_NAME` | evolution-go | evolution |
| `SERVER_PORT` | evolution-go | 8080 |
| `GLOBAL_API_KEY` | evolution-go | (secret) |
| `DATABASE_SAVE_MESSAGES` | evolution-go | true |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Go, Makefile, Dockerfile

[View on Railway →](https://railway.com/deploy/evolution-go)
