# Deploy Halo - Website Builder on Railway

Open-source CMS to build blogs, corporate websites & online stores.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/halo-website-builder)

## About

Halo is a powerful, open-source website building platform that makes it easy to create and manage blogs, documentation sites, business websites, portfolios, and content-driven applications. Built with Java and Spring Boot, Halo provides a modern admin interface, a rich plugin and theme ecosystem, and supports PostgreSQL for reliable, production-ready deployments.

Hosting Halo on Railway provides a simple and scalable way to deploy a production-ready content management system without managing server infrastructure. Railway handles application hosting, networking, persistent volumes, and PostgreSQL databases, allowing you to focus on building your website. A typical deployment consists of the official Halo Docker image, a PostgreSQL database for content storage, and a persistent volume for uploads, themes, plugins, and backups. Once deployed, you can connect a custom domain, enable HTTPS automatically, and scale your application as your website grows.

### Demo Access

You can explore Halo before deploying your own instance using the official demo environment:

* **Website:** https://demo.halocms.site
* **Admin Console:** https://demo.halocms.site/console
* **Username:** `demo`
* **Password:** `P@ssw0rd123..`

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| halohub/halo:2.25 | `halohub/halo:2.25` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | halohub/halo:2.25 | 8090 | - |
| `SPRING_R2DBC_PASSWORD` | halohub/halo:2.25 | (secret) | - |
| `SPRING_R2DBC_USERNAME` | halohub/halo:2.25 | (secret) | - |
| `SPRING_SQL_INIT_PLATFORM` | halohub/halo:2.25 | postgresql | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/root/.halo2`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/halo-website-builder)
