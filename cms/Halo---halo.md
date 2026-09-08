# Deploy Halo on Railway

Open-source CMS for blogs, documentation and company websites

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/halo)

## About

Halo is an open-source publishing platform written in Java that runs blogs, knowledge bases, documentation and company sites from one installation. It ships a visual editor, a theme system with live preview, a plugin marketplace, role-based multi-user accounts, comments, RSS and a search index. Writers, developer-relations teams and independent publishers reach for it where WordPress feels heavy and Ghost too narrow: one self-contained server with a modern admin console and no PHP stack.

Deploy Halo on Railway and you get the shape upstream runs in production. The `halo` service builds from the `halohub/halo:2` image, holds a volume at `/root/.halo2` for themes, plugin JARs, attachments and the search index, and is the only public service. The `Postgres` service is Railway's managed PostgreSQL, reachable only over the private network. On first boot the app provisions a scoped `halo` database role for itself rather than running as the cluster superuser, then creates your super-admin account over a loopback listener before the public port ever opens — so nobody reaches the setup screen ahead of you. Every later deploy recreates the container while the volume and database carry your content forward.

![Halo and PostgreSQL services on Railway, each with a volume](https://res.cloudinary.com/rroe4rtk/image/upload/v1788746724/halo-architecture.png)

Halo lets you own your publishing stack without owning a fleet of moving parts. It is one Spring Boot application: content, users, permissions, themes and plugins all sit behind a single process backed by a relational database — no separate front end, no queue, no cache tier. Teams self-host it to keep content, URLs and reader data on their own infrastructure.

Key features:

- Visual editor with Markdown input rules, code blocks, tables and a table of contents
- Themes with a settings schema, so non-developers restyle a site in the console
- A plugin system with a public app store and a documented Java API for your own
- Multi-user accounts, role-based permissions, two-factor auth and access tokens
- Posts, pages, categories, tags, comments, RSS and a built-in search index

The Railway architecture is deliberately small. `halo` serves the public site and the `/console` admin UI on port 8090; `Postgres` stores every post, page, comment, user and setting. The volume holds what Halo writes to disk rather than to the database, which is why it runs at a single replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| halo | [gridalpha/halo-railway](https://github.com/gridalpha/halo-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | halo | UTC | Container and JVM timezone |
| `PORT` | halo | 8090 | HTTP port Halo binds |
| `JVM_OPTS` | halo | -XX:MaxRAMPercentage=70 | JVM heap ceiling from the cgroup limit |
| `HALO_DB_NAME` | halo | halo | Database created for Halo at boot |
| `HALO_LANGUAGE` | halo | en | Console language: en, es, zh-CN, zh-TW |
| `HALO_SITE_TITLE` | halo | Halo | Site title, editable in the console |
| `SPRING_R2DBC_URL` | halo | - | R2DBC connection to the scoped database |
| `HALO_DB_ADMIN_URL` | halo | - | Superuser URL, used only to provision the role |
| `HALO_EXTERNAL_URL` | halo | - | Public base URL for permalinks and feeds |
| `HALO_SUPERADMIN_EMAIL` | halo | admin@example.com | Used by email password reset |
| `SPRING_R2DBC_PASSWORD` | halo | (secret) | Password for that scoped role |
| `SPRING_R2DBC_USERNAME` | halo | (secret) | Scoped database role, provisioned at boot |
| `HALO_SUPERADMIN_PASSWORD` | halo | (secret) | Administrator password, set at first boot |
| `HALO_SUPERADMIN_USERNAME` | halo | (secret) | Administrator login, 4-63 lowercase chars |
| `SPRING_SQL_INIT_PLATFORM` | halo | postgresql | Selects Halo's PostgreSQL schema |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/actuator/health/readiness`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.halo2`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/halo)
