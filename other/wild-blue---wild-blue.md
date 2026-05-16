# Deploy wild-blue on Railway

Deploy and Host C360 Govtech with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wild-blue)

## About

Flow360 is a visual AI workflow platform for building chatbots, AI agents, RAG pipelines, and automation flows using a drag-and-drop interface.

Deploy Flow360 on Railway to run AI workflows, chatbots, APIs, and document processing with minimal infrastructure setup. Railway supports Docker deployments, environment variables, databases, and scaling for production workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hazizi1998/flow360-api | `hazizi1998/flow360-api:1.0.8` | Worker |
| hazizi1998/flow360 | `hazizi1998/flow360:1.0.13` | Worker |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TIMEOUT` | hazizi1998/flow360-api | 300 | - |
| `REDIS_DB` | hazizi1998/flow360-api | 0 | - |
| `REDIS_HOST` | hazizi1998/flow360-api | redis | - |
| `REDIS_PORT` | hazizi1998/flow360-api | 6379 | - |
| `DB_PASSWORD` | hazizi1998/flow360-api | (secret) | - |
| `DB_USERNAME` | hazizi1998/flow360-api | (secret) | - |
| `ALLOW_ORIGINS` | hazizi1998/flow360-api | https://flow360-production.up.railway.app | - |
| `COOKIE_SECURE` | hazizi1998/flow360-api | true | - |
| `FLASK_RUN_PORT` | hazizi1998/flow360-api | 8077 | - |
| `COOKIE_SAMESITE` | hazizi1998/flow360-api | none | - |
| `QDRANT_BASE_URL` | hazizi1998/flow360-api | https://epbtstaging.mbpg.gov.my | - |
| `WS_URL` | hazizi1998/flow360 | https://flow360-api-production.up.railway.app | - |
| `API_URL` | hazizi1998/flow360 | https://flow360-api-production.up.railway.app/flow360-api | - |
| `WS_PATH` | hazizi1998/flow360 | flow360-api/socket | - |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | flow360 | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/wild-blue)
