# Deploy Strapi on Railway

A popular self-hosted CMS

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/strapi)

## About

Strapi is an open-source headless CMS that empowers developers to create stunning, content-rich applications with ease. The leading open-source headless CMS, 100% JavaScript/TypeScript, flexible and fully customizable.

With Strapi, you can manage your content in a customizable admin panel, which can be easily adapted to suit your specific needs. This powerful CMS provides you with complete control over your content, allowing you to create, edit, and publish content across multiple platforms and devices. With just one click, you can deploy your Strapi project to the Railway cloud platform, and in about 5 minutes of avg. build time: you get a template that gives you a foundation for your blogs and websites. When this template is running on Railway Strapi will connect to the Postgres Database through the [private network](https://docs.railway.app/reference/private-networking#how-it-works), saving you on database [egress fees](https://docs.railway.app/reference/pricing#usage-pricing).

![Strapi Logo](https://miro.medium.com/v2/resize:fit:712/1*eH_AEESTpAc6ZSWoEer6pA.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Strapi | [railwayapp-templates/strapi](https://github.com/railwayapp-templates/strapi) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `URL` | Strapi | - | Public URL of the server |
| `HOST` | Strapi | :: | - |
| `BROWSER` | Strapi | false | Open the admin panel in the browser after startup |
| `APP_KEYS` | Strapi | - | Declare session keys, which is used by the session middleware for the Users & Permissions plugin and the Documentation plugin |
| `JWT_SECRET` | Strapi | (secret) | A random string used to create new JWTs |
| `DATABASE_URL` | Strapi | - | Private database URL |
| `API_TOKEN_SALT` | Strapi | (secret) | Hash salt used to generate API tokens |
| `ENCRYPTION_KEY` | Strapi | - | Used for Strapi secrets encryption keys |
| `ADMIN_JWT_SECRET` | Strapi | (secret) | Secret used to encode JWT tokens |
| `DATABASE_PUBLIC_URL` | Strapi | - | Public database URL |
| `TRANSFER_TOKEN_SALT` | Strapi | (secret) | Salt used to generate Transfer tokens |
| `STRAPI_TELEMETRY_DISABLED` | Strapi | true | Don't send telemetry usage data to Strapi |
| `STRAPI_DISABLE_UPDATE_NOTIFICATION` | Strapi | true | Don't show the notification message about updating strapi in the terminal |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/admin`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/public/uploads`

**Category:** CMS · **Languages:** JavaScript

[View on Railway →](https://railway.com/template/strapi)
