# Deploy mateclaw on Railway

Team-ready self-hosted AI agent workspace with web UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mateclaw)

## About

MateClaw runs on Railway as a Docker-only deployment using a pre-built image that bundles the Spring Boot backend and Vue admin UI. Railway provides the public HTTPS domain, private service networking, managed MySQL, and persistent volumes for app data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `xiaosong233/mateclaw-railway:latest` | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | app | 18088 |
| `JWT_SECRET` | app | (secret) |
| `DB_PASSWORD` | app | (secret) |
| `DB_USERNAME` | app | (secret) |
| `SERPER_API_KEY` | app | (secret) |
| `SPRING_PROFILES_ACTIVE` | app | mysql |
| `MATE_WIKI_WATCHER_ENABLED` | app | false |
| `MATECLAW_SKILL_WORKSPACE_ROOT` | app | /app/data/skills |
| `MATE_WIKI_WATCHER_INTERVAL_MS` | app | 300000 |
| `MATECLAW_OAUTH_OPENAI_CALLBACK_BIND_HOST` | app | 0.0.0.0 |
| `MYSQLPORT` | MySQL | 3306 |
| `MYSQLUSER` | MySQL | root |
| `MYSQLPASSWORD` | MySQL | (secret) |
| `MYSQL_DATABASE` | MySQL | railway |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/mateclaw)
