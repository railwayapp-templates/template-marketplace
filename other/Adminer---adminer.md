# Deploy Adminer on Railway

Manage your databases from a lightweight web UI, ready in just 1 click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/adminer)

## About

Adminer is a lightweight web-based database management tool for connecting to, browsing, querying, and managing databases directly from your browser. It provides a simple alternative to heavier database administration platforms and runs as a compact standalone application with a clean web interface.

This template deploys **Adminer as a standalone database management interface**.

No database server is bundled with the template. After deployment, you can connect Adminer to an existing database running on Railway, another cloud platform, a VPS, or another reachable server using your own database credentials.

Adminer is particularly useful when you need quick access to database tables, records, indexes, schemas, and SQL queries without installing a desktop client.

The template uses the built-in **Nette** interface design for a cleaner visual experience.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Adminer | `adminer:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Railway public service port for Adminer |
| `ADMINER_DESIGN` | nette | Optional built-in Adminer interface design |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/adminer)
