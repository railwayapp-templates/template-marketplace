# Deploy daring-analysis on Railway

Single-tenant AgentHook with Railway MySQL and ongoing admin-secret login.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/daring-analysis-3)

## About

Deploy AgentHook as a private, single-tenant operator console with a managed Railway MySQL service.

This template creates two services: `agenthook` and `MySQL`. Enter only `SINGLE_TENANT_OWNER_EMAIL`; Railway generates `MYSQL_ROOT_PASSWORD`, wires AgentHook to the private MySQL service, and exposes that generated value to AgentHook as `SINGLE_TENANT_ADMIN_SECRET`. On first boot AgentHook creates the `railway` database if needed and runs embedded schema migrations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| agenthook | [abhinaviitg18/webhook_listener](https://github.com/abhinaviitg18/webhook_listener) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) |
| `SINGLE_TENANT_ADMIN_SECRET` | agenthook | (secret) |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Go, JavaScript, Shell, Python, HTML, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/daring-analysis-3)
