# Deploy Tracker : GPS Tracking Software - Free and Open Source System on Railway

Traccar GPS tracking: web UI, TCP device ingest, MySQL — one-click deploy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/traccar-template)

## About

Hosting Traccar on Railway gives you a managed GPS tracking server without maintaining a VPS: two services are provisioned for you — `traccar` (pinned official image, web UI on 8082 via your Railway domain, device ingest on TCP 5055 via a Railway TCP proxy, persistent volume for logs and uploads) and `MySQL` (persistent volume at /var/lib/mysql, private networking only). Traccar runs in env-var mode against MySQL — the configuration upstream recommends for production — with the JDBC URL, database password, and DB host wired as variable expressions, so credentials rotate per deploy and nothing sensitive is baked in. The boot wrapper waits for MySQL to be reachable, creates the traccar database, and symlinks the log directory into the persistent volume, so a cold deploy never races its own database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| traccar | [lNamelessl/traccar-railway-template](https://github.com/lNamelessl/traccar-railway-template) | TCP service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) |
| `DATABASE_PASSWORD` | traccar | (secret) |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 8082
- **Volume:** `/opt/traccar/data`

**Category:** Other · **Languages:** Java, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/traccar-template)
