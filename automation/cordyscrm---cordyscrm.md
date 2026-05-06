# Deploy cordyscrm on Railway

AI CRM with built-in MCP, ready for access with one-click deployment

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cordyscrm)

## About

Cordys CRM can run on Railway as a single Docker-image service with built-in web UI, API, MySQL, Redis, and MCP components. This keeps deployment simple while preserving the upstream startup behavior.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `1panel/cordys-crm:v1.6.2` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8081 |
| `ADMIN_PASSWORD` | (secret) |
| `ADMIN_USERNAME` | (secret) |
| `REDIS_PASSWORD` | (secret) |
| `MYSQL_ROOT_PASSWORD` | (secret) |
| `SPRING_DATASOURCE_PASSWORD` | (secret) |
| `SPRING_DATA_REDIS_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/cordyscrm)
