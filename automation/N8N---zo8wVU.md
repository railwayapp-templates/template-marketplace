# Deploy N8N on Railway

A powerful workflow automation tool for technical people

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zo8wVU)

## About

## Overview

n8n is a node-based workflow automation tool. n8n (pronounced n-eight-n) helps you to connect any app with an API with any other, and manipulate its data with little or no code.

This example deploys a self-hosted version of [n8n](https://n8n.io/). Internally it uses a PostgreSQL database to store the data.

## Highlights

- Customizable: highly flexible workflows and the option to build custom nodes.
- Convenient: use the Desktop app or npm to try out n8n, or the Cloud hosting option if you want us to handle the infrastructure.
- Privacy-focused: self-host n8n for privacy and security.

## Learn More

- [GitHub](https://github.com/n8n-io/n8n)
- [Documentation](https://docs.n8n.io/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| n8n | [railwayapp-templates/n8n](https://github.com/railwayapp-templates/n8n) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | n8n | 5678 | - |
| `PASSWORD` | n8n | (secret) | The password to log in to the N8N instance. |
| `USERNAME` | n8n | (secret) | The username to log in to the N8N instance. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/zo8wVU)
