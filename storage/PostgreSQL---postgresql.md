# Deploy PostgreSQL on Railway

PostgreSQL database service

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresql)

## About

Postgres is a powerful open-source relational database management system that provides a robust and scalable way to store and manage data. It is a popular choice for web applications, data analysis, and various other use cases.

Hosting PostgreSQL gives you access to a powerful database server capable of handling concurrent connections, managing data persistence, and supporting high availability configurations. PostgreSQL offers flexible database engine configuration, comprehensive user authentication and permission systems, and efficient storage and memory allocation. The database excels at query optimization and advanced indexing strategies. PostgreSQL deployments benefit from scalable CPU, RAM, and storage resources while supporting enterprise-grade network security through SSL encryption and Railway's private network capabilities. Railway provides automated backup systems and comprehensive logging to support your database operations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/ncontiero/postgres-ssl:18.3` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/postgresql)
