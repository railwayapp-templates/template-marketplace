# Deploy Strapi on Railway

Content management system with an editor and an API for any site

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/strapi-cms)

## About

Strapi is an open-source headless CMS built on Node.js. You model content as structured types — articles, products, landing pages — and Strapi gives editors a polished admin panel plus an automatically generated REST and GraphQL API to read them from any front end. Teams reach for it when a traditional CMS forces its templating on them but a bare database is too little. It powers Next.js marketing sites, mobile back ends, e-commerce catalogues and documentation portals.

Self-host Strapi on Railway and the template wires the pieces together. The `strapi` service builds from the [gridalpha/strapi-railway](https://github.com/gridalpha/strapi-railway) repository, whose Dockerfile compiles the admin panel at build time, so containers start in seconds. A managed **Postgres** service stores content, users and permissions, and a Railway **object storage bucket** holds media uploads, so the container keeps no durable state. Postgres and the bucket stay private.

![Diagram of the Strapi and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787225700/strapi-architecture.png)

Strapi separates content management from delivery. Editors work in the admin panel; your front end consumes JSON. Nothing about presentation is baked in, so the same content can drive a website, an iOS app and a digital sign at once. Self-hosting keeps the database, the media and the API in infrastructure you control, with no per-seat pricing.

Key capabilities:

- **Content-Type Builder** — collection and single types with relations, components and dynamic zones
- **Auto-generated REST and GraphQL APIs** with filtering, sorting, pagination and deep population
- **Draft and publish** plus internationalisation for multi-locale content
- **Role-based access control** for admins and API consumers, with scoped tokens
- **Media library** with responsive image variants on upload
- **Plugin system** and lifecycle hooks for custom logic

The `strapi` container runs the admin panel and API. **Postgres** is the system of record — every entry, user, role and API token lives there, which is why the template provisions it instead of SQLite on ephemeral disk. The **object storage bucket** holds uploads, so a redeploy replaces the container without losing an image.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| strapi | [gridalpha/strapi-railway](https://github.com/gridalpha/strapi-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `HOST` | strapi | 0.0.0.0 | Bind address inside the container |
| `PORT` | strapi | 1337 | HTTP listening port |
| `APP_KEYS` | strapi | - | Session signing keys |
| `NODE_ENV` | strapi | production | Enables Strapi production mode |
| `AWS_BUCKET` | strapi | - | Media library bucket name |
| `AWS_REGION` | strapi | - | Bucket placement region |
| `JWT_SECRET` | strapi | (secret) | Signs end-user API tokens |
| `AWS_ENDPOINT` | strapi | - | Object storage endpoint URL |
| `DATABASE_SSL` | strapi | false | TLS off on the private network |
| `DATABASE_URL` | strapi | - | Postgres connection string |
| `API_TOKEN_SALT` | strapi | (secret) | Salts generated API tokens |
| `ENCRYPTION_KEY` | strapi | - | Encrypts stored secrets at rest |
| `DATABASE_CLIENT` | strapi | postgres | Selects the Postgres connector |
| `ADMIN_JWT_SECRET` | strapi | (secret) | Signs admin panel sessions |
| `AWS_ACCESS_KEY_ID` | strapi | - | Object storage access key |
| `TRANSFER_TOKEN_SALT` | strapi | (secret) | Salts data transfer tokens |
| `AWS_SECRET_ACCESS_KEY` | strapi | (secret) | Object storage secret key |
| `STRAPI_TELEMETRY_DISABLED` | strapi | true | Disables anonymous usage reporting |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/strapi-cms)
