# Deploy postgres-18 on Railway

Deploy and Host PostgreSQL 18 with SSL on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/postgres-18)

## About

Postgres is a powerful open-source relational database management system that provides a robust and scalable way to store and manage data. It is a popular choice for web applications, data analysis, and various other use cases.

Hosting PostgreSQL gives you access to a powerful database server capable of handling concurrent connections, managing data persistence, and supporting high availability configurations. PostgreSQL offers flexible database engine configuration, comprehensive user authentication and permission systems, and efficient storage and memory allocation. The database excels at query optimization and advanced indexing strategies. PostgreSQL deployments benefit from scalable CPU, RAM, and storage resources while supporting enterprise-grade network security through SSL encryption and Railway's private network capabilities. Railway provides automated backup systems and comprehensive logging to support your database operations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PostgreSQL 18 | `xlab/postgres-ssl-18:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | railway |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/postgres-18)
