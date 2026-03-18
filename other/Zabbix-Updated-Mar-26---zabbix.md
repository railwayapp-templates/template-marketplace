# Deploy Zabbix [Updated Mar '26] on Railway

Zabbix [Mar '26] (Monitor Servers, Apps & Networks) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zabbix)

## About

Zabbix is a free, open-source monitoring platform available on GitHub, providing robust IT infrastructure monitoring as an alternative to proprietary solutions like Nagios or Datadog. With Zabbix, users gain complete visibility over servers, networks, applications, and cloud services while retaining full control of monitoring data. It is backed by a strong developer community and extensive documentation on the Zabbix GitHub repository.

You can self-host Zabbix to centralize monitoring and maintain full control over your operational data, with zero reliance on third-party monitoring services. Zabbix provides real-time insights into your IT environment, allowing proactive issue resolution and performance optimization.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| zabbix-server-railway | [Shinyduo/zabbix-server-railway](https://github.com/Shinyduo/zabbix-server-railway) | Web service |
| zabbix-agent2 | `zabbix/zabbix-agent2:latest` | Web service |
| zabbix-railway | [Shinyduo/zabbix-railway](https://github.com/Shinyduo/zabbix-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PHP_TZ` | zabbix-server-railway | Asia/Kolkata |
| `POSTGRES_USER` | zabbix-server-railway | (secret) |
| `DB_SERVER_PORT` | zabbix-server-railway | 5432 |
| `POSTGRES_PASSWORD` | zabbix-server-railway | (secret) |
| `ZBX_HOSTNAME` | zabbix-agent2 | Zabbix server |
| `ZBX_LOG_TYPE` | zabbix-agent2 | console |
| `ZBX_DEBUGLEVEL` | zabbix-agent2 | 3 |
| `ZBX_PASSIVE_ALLOW` | zabbix-agent2 | 0 |
| `PHP_TZ` | zabbix-railway | Asia/Kolkata |
| `POSTGRES_USER` | zabbix-railway | (secret) |
| `DB_SERVER_PORT` | zabbix-railway | 5432 |
| `POSTGRES_PASSWORD` | zabbix-railway | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/zabbix)
