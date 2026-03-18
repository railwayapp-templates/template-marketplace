# Deploy Docmost [Updated Mar ’26] on Railway

Docmost [Mar ’26] (Team Collab | Notion & Confluence alternative) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/docmost)

## About

Docmost is a free, open-source knowledge management and documentation platform, available on [Docmost GitHub](https://github.com/docmost). It’s designed for teams who want a self-hosted solution to organize their knowledge base, collaborate on documents, and securely store company information. With features like Docmost API, SSO, SMTP configuration, backup support, and Docker deployment, it’s an excellent self-host alternative to platforms like Notion and Confluence.

You can self host Docmost to keep all your documentation and notes under your full control, without relying on third-party SaaS platforms. By deploying Docmost Docker on Railway, you get the advantages of simplicity, security, and scalability. With managed databases, containerized environments, and automatic scaling, Railway makes it extremely easy to run your Docmost instance without worrying about server administration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| docmost/docmost:latest | `docmost/docmost:latest` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `APP_SECRET` | docmost/docmost:latest | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Volume:** `/app/data/storage`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/docmost)
