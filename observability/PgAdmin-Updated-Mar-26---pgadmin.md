# Deploy PgAdmin [Updated Mar ’26] on Railway

PgAdmin [Mar ’26] (GUI to Manage PostgreSQL Databases) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/pgadmin)

## About

PgAdmin is a free, open-source administration and management tool for PostgreSQL, one of the world’s most powerful and advanced open-source databases. It provides a graphical interface for database management, making it easier for developers, data analysts, and database administrators to interact with PostgreSQL visually instead of using command-line queries.

You can self-host PgAdmin on Railway to gain full control over your PostgreSQL database management environment. Hosting PgAdmin on Railway ensures that your database administration interface remains private, secure, and easily accessible from anywhere.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgadmin4 | `dpage/pgadmin4` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `PGADMIN_LISTEN_PORT` | 8080 |
| `PGADMIN_LISTEN_ADDRESS` | 0.0.0.0 |
| `PGADMIN_DISABLE_POSTFIX` | True |
| `PGADMIN_DEFAULT_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/template/pgadmin)
