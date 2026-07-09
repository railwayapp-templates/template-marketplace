# Deploy ClearFlask on Railway

Open-source feedback: voting boards, roadmap, changelog. Canny alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clearflask)

## About

ClearFlask is an open-source feedback management platform — a self-hosted alternative to Canny and UserVoice. Collect user feedback on voting boards, let users prioritize with votes, and close the loop with a public roadmap and changelog. Mature, production-ready, and built for running your product in the open.

This template deploys the complete ClearFlask stack as three services: the API server (Java), the Connect server-side-rendering frontend (Node.js), and MariaDB. Storage is fully self-contained — an embedded file-backed DynamoDB and local-disk content storage persist to attached volumes, so no AWS account or external services are needed. On first boot the server generates its secrets and creates its database schema; allow a few minutes. Then sign up with the admin email you set at deploy time, create your project, and your feedback portal is live directly on the generated Railway domain. Runs comfortably within 1 GB of memory.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clearflask-connect | `ghcr.io/clearflask/clearflask-connect:latest` | Web service |
| mariadb | `mariadb:10.5` | Database |
| clearflask-server | `ghcr.io/clearflask/clearflask-server:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ENV` | clearflask-connect | platform | - |
| `NODE_ENV` | clearflask-connect | production | - |
| `CLEARFLASK_CONNECT_TOKEN` | clearflask-connect | (secret) | - |
| `CLEARFLASK_FORCE_REDIRECT_HTTPS` | clearflask-connect | false | - |
| `CLEARFLASK_DISABLE_AUTO_FETCH_CERTIFICATE` | clearflask-connect | true | - |
| `CLEARFLASK_CREATE_CONNECT_CONFIG_IF_MISSING` | clearflask-connect | 1 | - |
| `MYSQL_ROOT_PASSWORD` | mariadb | (secret) | - |
| `PORT` | clearflask-server | 8080 | - |
| `JAVA_TOOL_OPTIONS` | clearflask-server | -Xmx256m -XX:MaxMetaspaceSize=224m -Xss512k -XX:ReservedCodeCacheSize=64m -XX:+ExitOnOutOfMemoryError | JVM memory cap for 1GB hosts (prevents OOM-kill during startup) |
| `CLEARFLASK_MYSQL_USER` | clearflask-server | (secret) | - |
| `CLEARFLASK_ENVIRONMENT` | clearflask-server | PRODUCTION_PLATFORM | - |
| `CLEARFLASK_CONNECT_TOKEN` | clearflask-server | (secret) | - |
| `CLEARFLASK_MYSQL_PASSWORD` | clearflask-server | (secret) | - |
| `CLEARFLASK_AUTH_COOKIE_SECURE` | clearflask-server | true | - |
| `CLEARFLASK_CREATE_SERVER_CONFIG_IF_MISSING` | clearflask-server | 1 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --port=3306 --sql-mode=IGNORE_SPACE --explicit-defaults-for-timestamp --secure-file-priv=/tmp --bind-address=::`
- **Volume:** `/var/lib/mysql`
- **Volume:** `/opt/clearflask`

**Category:** Other

[View on Railway →](https://railway.com/deploy/clearflask)
