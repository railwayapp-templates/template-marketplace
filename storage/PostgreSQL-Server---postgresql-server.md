# Deploy PostgreSQL Server on Railway

Production-ready PostgreSQL with persistent storage and TCP access.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresql-server)

## About

PostgreSQL is a powerful open-source relational database designed for reliable transactional workloads, APIs, backend services, analytics, and modern application development. It supports SQL, ACID transactions, JSON, indexing, extensions, replication, and a mature ecosystem used across small applications and large production systems.

Hosting PostgreSQL on Railway gives you a persistent relational database without manually managing a virtual machine, operating system, database package installation, or server lifecycle.

This template runs PostgreSQL as a dedicated database service with persistent Railway storage. Applications inside the same Railway project can connect through Railway private networking, while external clients can connect through Railway TCP Proxy.

The template also provides ready-to-use connection variables for both internal and external access, making it easy to connect applications, migration tools, database clients, and backend services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | Default database created on first initialization |
| `DATABASE_URL` | - | Private PostgreSQL connection URL |
| `POSTGRES_USER` | (secret) | Initial PostgreSQL administrator username |
| `POSTGRES_PASSWORD` | (secret) | Initial PostgreSQL administrator password |
| `DATABASE_PUBLIC_URL` | - | Public PostgreSQL connection URL via TCP Proxy |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/postgresql-server)
