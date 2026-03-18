# Deploy Cloudreve on Railway

Easily host Cloudreve on Railway for private file storage and sharing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/cloudreve)

## About

Hosting Cloudreve on Railway allows you to quickly deploy a powerful and customizable file hosting platform without the hassle of manual server setup. Railway handles the infrastructure, so you can focus on configuring Cloudreve to meet your needs. Deployment involves setting up environment variables, choosing a storage backend (local, S3-compatible, or others), and exposing the application for web access. Railway simplifies scaling and management, making Cloudreve a production-ready solution in just a few steps.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cloudreve | `cloudreve/cloudreve` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CR_LICENSE_KEY` | cloudreve | - | When starting Cloudreve Pro edition, you need to provide this parameter through the the CR_LICENSE_KEY environment variable. |
| `CR_CONF_Redis.Server` | cloudreve | - | Redis address |
| `CR_CONF_Database.Host` | cloudreve | - | Database address |
| `CR_CONF_Database.Name` | cloudreve | - | Database name |
| `CR_CONF_Database.Port` | cloudreve | - | Database port |
| `CR_CONF_Database.Type` | cloudreve | postgres | Database type, supports postgres, mysql, sqlite, mariadb. For this template we setup postgress but you can change it. |
| `CR_CONF_Database.User` | cloudreve | - | Database username |
| `CR_CONF_Redis.Password` | cloudreve | (secret) | Connection password |
| `CR_CONF_Database.DBFile` | cloudreve | - | Optional, SQLite database file path |
| `CR_CONF_Database.Password` | cloudreve | (secret) | Database password |
| `CR_CONF_Database.DatabaseURL` | cloudreve | - | Optional, Database connection string, if set, other database configuration will be ignored. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/cloudreve/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/cloudreve)
