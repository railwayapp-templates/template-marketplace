# Deploy Strapi Legacio on Railway

Strapi Legacio Template base

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/new-strapi-project)

## About

Strapi is a leading open-source, headless Content Management System (CMS) built on Node.js. It empowers developers to create, manage, and securely distribute rich content to any application or device via fully customizable RESTful or GraphQL APIs, backed by a robust PostgreSQL database.

Deploying this Strapi project requires a Node.js runtime to serve the API and admin panel, alongside a PostgreSQL database to store your content, user data, and system configurations. This template simplifies the process by automatically provisioning both the web service and the database. During deployment, Railway securely handles the networking by injecting the PostgreSQL connection credentials directly into the Strapi environment variables. It also executes the necessary build steps to compile your Strapi admin panel, ensuring your headless CMS is production-ready with persistent, reliable data storage right out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| new-cms | [legacio/cms-necrology](https://github.com/legacio/cms-necrology) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `HOST` | new-cms | 0.0.0.0 | - |
| `PORT` | new-cms | 1337 | - |
| `APP_KEYS` | new-cms | JNDLJAzqFmSAUVoJm1fERw==,TN8mbJTveVeC7YW7ZnCwGw==,oL6xcuWKH5o8WaggsycKgA==,zAh3E/sjERwjdLSCh0zWHQ== | - |
| `JWT_SECRET` | new-cms | (secret) | - |
| `API_TOKEN_SALT` | new-cms | (secret) | - |
| `CLOUDINARY_KEY` | new-cms | 511313798553691 | - |
| `CLOUDINARY_NAME` | new-cms | dbiigubyd | - |
| `DATABASE_CLIENT` | new-cms | postgres | - |
| `ADMIN_JWT_SECRET` | new-cms | (secret) | - |
| `CLOUDINARY_FOLDER` | new-cms | strapi-sites-v3/ | - |
| `CLOUDINARY_SECRET` | new-cms | (secret) | - |
| `TRANSFER_TOKEN_SALT` | new-cms | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Languages:** JavaScript, TypeScript

[View on Railway →](https://railway.com/deploy/new-strapi-project)
