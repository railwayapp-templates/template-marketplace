# Deploy Postgres 18 SSL on Railway

Deploy and Host Postgres 18 SSL with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgres-18-ssl)

## About

Connect with: Postgres.Variables. DATABASE_PUBLIC_URL

A fork of Railway's Postgres 17 with Postgres 18 support. Everything is working the same as the original Railway Postgres including UIs, connection management, and more.

**Postgres 18** is the latest release of the PostgreSQL relational database management system, known for its robustness, extensibility, and advanced SQL compliance. This version introduces improved performance, enhanced security features, and additional SQL capabilities, making it suitable for modern data-driven applications of any scale.

Hosting Postgres 18 involves provisioning a managed PostgreSQL instance, configuring storage, networking, and security settings, and ensuring automated backups and updates. Deploying on a platform like Railway abstracts away much of the operational complexity, providing developers with easy access to database endpoints, monitoring, and scaling options. With minimal setup, you can focus on building your application while Railway manages infrastructure, uptime, and maintenance for your database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | [bon5co/postgres-ssl](https://github.com/bon5co/postgres-ssl) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | railway |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql`

**Category:** Other · **Languages:** Shell

[View on Railway →](https://railway.com/deploy/postgres-18-ssl)
