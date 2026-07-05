# Deploy ToolJet on Railway

Open-source platform for building internal tools and applications with ease

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tooljet-1)

## About

ToolJet is an open-source, low-code platform designed for developing and deploying custom internal tools. It enables developers to quickly build complex applications through a drag-and-drop interface, utilizing over 45 pre-built components. This approach significantly reduces development time and complexity, allowing for the creation of custom applications in minutes.

![ToolJet](https://user-images.githubusercontent.com/7828962/211444352-4d6d2e4a-13c9-4980-9e16-4aed4af9811b.png)

One-click deployment of ToolJet.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tooljet | [ToolJet/ToolJet](https://github.com/ToolJet/ToolJet) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TOOLJET_HOST` | tooljet | - | The public URL of the ToolJet client ( eg: https://app.tooljet.com ) |
| `SECRET_KEY_BASE` | tooljet | (secret) | Random 64 bit HEX string to encrypt session cookies |
| `LOCKBOX_MASTER_KEY` | tooljet | ef452699b46d080a4a6baf44a913dc0f3eef7ad22d2a248b2fd5ecb1b4bc373c | Random 64 byte HEX value to encrypt datasource credentials. Generated using `openssl rand -hex 32` |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** JavaScript, TypeScript, SCSS, HTML, Shell, EJS, Dockerfile, Handlebars, MDX, CSS, HCL, Procfile, Batchfile

[View on Railway →](https://railway.com/deploy/tooljet-1)
