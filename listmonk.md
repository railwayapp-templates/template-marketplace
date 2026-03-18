# Deploy Listmonk on Railway

Self-hosted newsletter and mailing list manager

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/listmonk)

## About

Listmonk is a self-hosted, high-performance newsletter and mailing list manager that enables businesses to send email campaigns and manage subscriber lists efficiently. It's an open-source alternative to platforms like Mailchimp, offering advanced features like campaign automation, audience segmentation, and comprehensive analytics while maintaining complete control over your subscriber data and email delivery infrastructure.

Hosting Listmonk gives you access to a complete email marketing platform that manages subscriber lists, designs and sends email campaigns, and tracks engagement metrics without relying on external services. Listmonk offers a modern web interface for campaign creation, template management, subscriber import/export, bounce handling, and detailed analytics on open rates, click-through rates, and unsubscribes. The platform excels at managing large subscriber lists, sending high-volume campaigns, and providing granular control over email delivery while respecting subscriber privacy. Listmonk deployments benefit from Railway's SSL certificates, scalable hosting infrastructure for handling massive email volumes, and reliable uptime for scheduled campaigns. Railway provides database backup capabilities and monitoring tools to ensure your subscriber data and campaign history remain secure and accessible.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:13-alpine` | Database |
| listmonk | [railwayapp-templates/listmonk](https://github.com/railwayapp-templates/listmonk) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `PGHOST_PRIVATE` | Postgres | - | Private host |
| `PGPORT_PRIVATE` | Postgres | 5432 | Private port |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | Private database URL |
| `LISTMONK_ORIGIN_0` | listmonk | https://domain.com | Example CORS value |
| `LISTMONK_ORIGIN_1` | listmonk | https://www.domain.com | Example CORS value |
| `LISTMONK_db__host` | listmonk | - | Private host of the Postgres database |
| `LISTMONK_db__port` | listmonk | - | Private port of the Postgres database |
| `LISTMONK_db__user` | listmonk | (secret) | Database username |
| `LISTMONK_db__database` | listmonk | - | Database database |
| `LISTMONK_db__password` | listmonk | (secret) | Database Password |
| `LISTMONK_db__ssl_mode` | listmonk | disable | Disable ssl, ssl is not needed since communication to the database is done over the private network |
| `LISTMONK_app__admin_password` | listmonk | (secret) | Basicauth password |
| `LISTMONK_app__admin_username` | listmonk | (secret) | Basicauth username |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | listmonk | true | <a href="https://docs.railway.app/reference/private-networking#workaround-for-alpine-based-images">Workaround for Alpine-based images</a> |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; exec docker-entrypoint.sh postgres --port=${PGPORT_PRIVATE}"`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/listmonk/uploads`

**Category:** Other · **Tags:** newsletter, mailing list, golang · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/listmonk)
