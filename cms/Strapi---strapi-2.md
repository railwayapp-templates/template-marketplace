# Deploy Strapi on Railway

Strapi 5 with Postgres, admin created at deploy, uploads on a volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/strapi-2)

## About

[Strapi](https://github.com/strapi/strapi) is an open-source headless CMS. You define content types, editors fill them in an admin panel, and your website or app reads them through a REST or GraphQL API.

This template runs Strapi 5.55.1 with Postgres, the first admin created at deploy and uploads on a volume.

A new Strapi asks whoever opens `/admin` first to register the admin account, so a fresh deploy on a public URL can be claimed by someone else before you get there. Here Strapi creates the admin from `STRAPI_ADMIN_EMAIL` (you enter it when deploying) and `STRAPI_ADMIN_PASSWORD` (generated) before it starts listening, and the admin registration refuses anyone else.

Railway serves your app over HTTPS through a proxy. Strapi 5.55 only trusts the proxy's headers when `server.proxy.koa` is set; the plain `proxy: true` that older guides use is ignored. The config here sets `proxy.koa`, so Strapi knows requests are secure and marks the admin session cookie as secure.

Strapi runs in production mode, where the Content-Type Builder is read-only, because content types are code files in the project. To add your own, copy the project folder into your own repo, run `npm run develop` locally, build the types in the admin panel, commit, and point the Strapi service at your repo. The steps are in the project's README. Content, users and API tokens live in Postgres and uploaded files on the volume, so they stay when you switch the source.

Strapi's end-user sign-up (`/api/auth/local/register`, for your app's users, not the admin panel) is on by default, as in any Strapi. If your app doesn't use it, turn it off in Settings &gt; Users &amp; Permissions plugin &gt; Advanced settings.

Before publishing I tested it on Railway. The admin already existed at the first request, a stranger's attempt to register the first admin was refused, and the admin signed in with a secure session cookie and the Super Admin role. A full-access API token uploaded a file, which was then served from `/uploads`, and created an end user through the content API. After restarting Strapi and Postgres the admin signed in again, the file was served with the same content and the user was still there.

Idle, Strapi used 0.16 GB of RAM and Postgres about 0.1 GB, around $3 a month on Railway's usage pricing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Strapi | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /strapi) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Strapi | 1337 | Port Railway routes to |
| `APP_KEYS` | Strapi | - | Session keys (generated) |
| `JWT_SECRET` | Strapi | (secret) | Secret for end-user logins of the Users & Permissions plugin (generated) |
| `PUBLIC_URL` | Strapi | - | Public URL of Strapi. Change it when you add a custom domain |
| `DATABASE_URL` | Strapi | - | Postgres over the private network |
| `API_TOKEN_SALT` | Strapi | (secret) | Salt for API tokens (generated). Changing it invalidates your API tokens |
| `ENCRYPTION_KEY` | Strapi | - | Encrypts API tokens so they can be shown again (generated). Keep it |
| `DATABASE_CLIENT` | Strapi | postgres | Database type |
| `ADMIN_JWT_SECRET` | Strapi | (secret) | Admin session secret (generated) |
| `STRAPI_ADMIN_URL` | Strapi | - | Admin panel |
| `STRAPI_ADMIN_EMAIL` | Strapi | - | Email of the first admin, created on first start. Sign in at STRAPI_ADMIN_URL with it and STRAPI_ADMIN_PASSWORD |
| `TRANSFER_TOKEN_SALT` | Strapi | (secret) | Salt for transfer tokens (generated) |
| `STRAPI_ADMIN_PASSWORD` | Strapi | (secret) | Password of the first admin (generated). Change it in the admin panel after signing in |
| `POSTGRES_DB` | Postgres | strapi | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password (generated) |

## Configuration

- **Healthcheck:** `/_health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/public/uploads`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Tags:** strapi, cms, headless-cms, postgres, api, content · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/strapi-2)
