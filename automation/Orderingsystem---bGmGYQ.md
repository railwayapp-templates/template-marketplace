# Deploy Ordering_system on Railway

ordering system for small business management

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/bGmGYQ)

## About

ordering system for small business management

With a database table to generate quick access in the form of an API and automate simple tasks, to integrate with desktop and mobile applications.

The idea is to be a project with a small scope and easy to manage, to then test the possibility of scaling the entire infrastructure and creating documentation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL-ow1G | `mysql` | Database |
| MySQL | `mysql` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MYSQL_ROOT_PASSWORD` | MySQL-ow1G | (secret) |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/mysql`

**Category:** Automation

[View on Railway →](https://railway.com/template/bGmGYQ)
