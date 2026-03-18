# Deploy Payload CMS V3 (website builder) on Railway

Preconfigured as website builder CMS. Using postgreSQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/L8TUlT)

## About

Launch your own powerful, open-source website or blog with **Payload CMS 3**, preconfigured to use PostgreSQL instead of MongoDB for smoother Railway hosting. Includes blog, pages, forms, user auth, and comment system, all based on the official Payload "website" starter.  
**Updated to v3.77.0 ✅ 22 Feb. 2026**

This boilerplate lets you deploy **Payload CMS**, a headless CMS and website builder, with a single click, no configuration needed. The template replaces MongoDB with PostgreSQL, making it 100% Railway-compatible. It includes built-in collections for pages, posts, forms, users, and comments.  
Deploy and go live in minutes. After setup, you’ll land on the Payload welcome screen to create an admin user and seed your site with demo content. Out of the box, this is a great builder for blogs, portfolios, landing pages, or product sites. Looking to expand? Payload offers unmatched flexibility to customize content types, integrations, and UI.

### Video demo and tutorial
[![Watch the Payload CMS demo](https://img.youtube.com/vi/j78HfUMIkBQ/maxresdefault.jpg)](https://youtu.be/j78HfUMIkBQ)
Click ☝️ to play opn YouTube

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| payload-CMS | [rpuls/payload-3-boilerplate](https://github.com/rpuls/payload-3-boilerplate) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `NODE_ENV` | payload-CMS | production | - |
| `DATABASE_URI` | payload-CMS | - | (Note: for some reason, breaks build when using private/internal connection) |
| `PAYLOAD_SECRET` | payload-CMS | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/public/media`

**Category:** CMS · **Languages:** TypeScript, JavaScript, CSS, SCSS, Dockerfile

[View on Railway →](https://railway.com/template/L8TUlT)
