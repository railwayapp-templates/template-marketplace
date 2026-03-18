# Deploy MySQL 8 or Any Version on Railway

Choose tag MySQL version and deploy - default 8.0.35

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/mysql-8-or-any-version)

## About

Deploy this repository as a new service on Railway. The service runs MySQL in a container and persists data to a volume. Configure `MYSQL_ROOT_PASSWORD` (required) and optionally `MYSQL_VERSION`, `MYSQL_DATABASE`, and `MYSQL_CONFIG` in the service variables.

This template is hosted as a Docker-based service on Railway. MySQL runs from the official Docker image; the version is chosen via the `MYSQL_VERSION` build variable. Data is stored in a volume mounted at `/var/lib/mysql`. Use Railway's TCP Proxy if you need to connect from outside Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | [feliperosenek/mysql-any-version-railway](https://github.com/feliperosenek/mysql-any-version-railway) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MYSQL_VERSION` | - | ex: 8.0.35 |
| `MYSQL_DATABASE` | - | Database Create |
| `MYSQL_ROOT_PASSWORD` | (secret) | MySQL pass |

## Configuration

- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/mysql-8-or-any-version)
