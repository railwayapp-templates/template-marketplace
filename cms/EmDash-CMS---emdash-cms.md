# Deploy EmDash CMS on Railway

Open-source Astro CMS on Postgres. Locked setup wizard, auto-updated.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/emdash-cms)

## About

[EmDash](https://github.com/emdash-cms/emdash) is an open-source CMS built on Astro and written in TypeScript. It has a block editor, a media library, users and roles, revisions, scheduled publishing, plugins and passkey login. This template runs it on Node.js with PostgreSQL.

The template deploys two services: the EmDash site, built from the official Blog starter, and Railway's PostgreSQL. Uploaded media and login sessions are kept on a volume at `/data`, so they survive redeploys. EmDash runs its database migrations when it starts.

EmDash normally lets the first visitor create the admin account. This template locks the setup wizard behind a generated password, so nobody else can claim your site before you do.

First steps:

1. Open your site's URL and go to `/_emdash/admin`.
2. Sign in with any username and the `EMDASH_SETUP_PASSWORD` value from the EmDash service's **Variables** tab.
3. Follow the setup wizard: site title, optional sample content, your email, then create a passkey.

If you want a custom domain, add it and update `EMDASH_SITE_URL` before step 1. Passkeys are tied to the domain they were created on.

Updates: the EmDash version, starter template, Astro and Node.js are pinned. A GitHub Action checks for new releases every day, smoke-tests them and only then updates the repository. Railway then shows an update notice in your project, and you choose when to apply it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| EmDash | [aimranov27/emdash-railway](https://github.com/aimranov27/emdash-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_URL` | EmDash | - | PostgreSQL connection string from the Postgres service. Read when the site starts. |
| `EMDASH_SITE_URL` | EmDash | - | Public address of the site. Passkeys are tied to this domain. If you add a custom domain, change this to https://your-domain before running the setup wizard. |
| `EMDASH_TEMPLATE` | EmDash | blog | Optional. Which official starter to build: blog, starter, marketing or portfolio. Choose before running the setup wizard. Switching later needs a fresh database. |
| `EMDASH_ENCRYPTION_KEY` | EmDash | - | Encrypts secrets that plugins store in the database. Keep a copy. Restoring the database without this key leaves those plugin settings unreadable. |
| `EMDASH_SETUP_PASSWORD` | EmDash | (secret) | Password for the setup wizard at /_emdash/admin. Sign in with any username and this password, then create your admin account. Only needed until the admin account exists. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/_emdash/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** CMS · **Languages:** JavaScript, Shell, Dockerfile, TypeScript

[View on Railway →](https://railway.com/deploy/emdash-cms)
