# Deploy daring-analysis on Railway

Single-tenant AgentHook with Railway MySQL and one-field owner setup.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/daring-analysis-2)

## About

Deploy AgentHook as a private, single-tenant operator console with a managed Railway MySQL service.

This template creates two services: `agenthook` and `MySQL`. Enter only `SINGLE_TENANT_OWNER_EMAIL`; Railway generates the MySQL root password and AgentHook connects over Railway private networking. On first boot AgentHook creates the `railway` database if needed, runs embedded schema migrations, and prints a one-time owner `claim_code` and claim URL in the `agenthook` service logs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| agenthook | [abhinaviitg18/webhook_listener](https://github.com/abhinaviitg18/webhook_listener) | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MYSQL_ROOT_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Go, JavaScript, Shell, Python, HTML, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/daring-analysis-2)
