# Deploy Baserow on Railway

Open source no-code database and an Airtable alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/jbG8JG)

## About

Baserow is an open-source, no-code database platform that enables users to create and manage databases without writing any code. It serves as a flexible and scalable alternative to traditional spreadsheets and proprietary platforms like Airtable.

Hosting Baserow provides a powerful database solution that combines the simplicity of a spreadsheet with the capabilities of a relational database. With Baserow, you can define custom data structures, establish relationships between tables, and collaborate with your team in real-time. The platform supports both cloud-based and self-hosted deployments, offering full control over your data and infrastructure.

Railway simplifies the deployment process, allowing you to host Baserow effortlessly. By leveraging Railway's infrastructure, you ensure high availability, automated backups, and seamless scalability to meet your application's demands.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Baserow | `baserow/baserow:2.0.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_MAXMEMORY` | Redis | 256mb | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `REDIS_MAXMEMORY_POLICY` | Redis | allkeys-lru | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `SECRET_KEY` | Baserow | (secret) | - |
| `BASEROW_BACKEND_DEBUG` | Baserow | false | - |
| `BASEROW_AMOUNT_OF_WORKERS` | Baserow | 1 | - |
| `BASEROW_BACKEND_LOG_LEVEL` | Baserow | WARNING | - |
| `BASEROW_AMOUNT_OF_GUNICORN_WORKERS` | Baserow | 2 | - |
| `BASEROW_TRIGGER_SYNC_TEMPLATES_AFTER_MIGRATION` | Baserow | false | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/baserow/data`

**Category:** CMS

[View on Railway →](https://railway.com/template/jbG8JG)
