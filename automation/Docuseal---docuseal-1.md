# Deploy Docuseal on Railway

#1 Open Source Alternative to DocuSign, PandaDoc.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/docuseal-1)

## About

-

-

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| docuseal/docuseal | `docuseal/docuseal` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `FORCE_SSL` | docuseal/docuseal | true | ssl |
| `REDIS_URL` | docuseal/docuseal | - | redis url |
| `SMTP_FROM` | docuseal/docuseal | - | SMTP_FROM |
| `SMTP_PORT` | docuseal/docuseal | - | SMTP_PORT |
| `DATABASE_URL` | docuseal/docuseal | - | Postgres database |
| `SMTP_ADDRESS` | docuseal/docuseal | - | SMTP_ADDRESS |
| `STORAGE_PATH` | docuseal/docuseal | /data/storage | path |
| `SMTP_PASSWORD` | docuseal/docuseal | (secret) | SMTP_PASSWORD |
| `SMTP_USERNAME` | docuseal/docuseal | (secret) | SMTP_USERNAME |
| `SECRET_KEY_BASE` | docuseal/docuseal | (secret) | secret |
| `SMTP_AUTHENTICATION` | docuseal/docuseal | login | SMTP auth |
| `SMTP_ENABLE_STARTTLS_AUTO` | docuseal/docuseal | false | Enable SMTP |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/docuseal-1)
