# Deploy Strapi — Self-Hosted Headless CMS, Contentful Alternative on Railway

Self-host Strapi 5: headless CMS with REST & GraphQL. No $300/mo Contentful

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/strapi-headless-cms)

## About

![Strapi headless CMS admin panel](https://miro.medium.com/v2/resize:fit:712/1*eH_AEESTpAc6ZSWoEer6pA.png)

Strapi is the most popular open-source headless CMS — **72k+ GitHub stars** and the largest
headless community — built on Node.js with a visual content-type builder that auto-generates
REST and GraphQL APIs from your schema. Strapi 5 adds the Document Service API, content history
and versioning, draft/publish workflows, a Vite-powered admin, and TypeScript-first projects.
Model content in the browser, consume it from any frontend (Next.js, Astro, Vue, mobile), and own
the whole stack. This template deploys Strapi 5 with PostgreSQL and a persistent volume.

**Contentful's Team plan costs $300/month.** Strapi self-hosted is free (MIT) — you pay only
compute, ~$10–20/month on Railway. No per-seat fees, no API-call metering, no vendor lock-in;
your content lives in your own PostgreSQL database.

---

Strapi is a Node.js app backed by a SQL database with a media library on disk. Production means a
persistent server, PostgreSQL, media storage that survives restarts, and a public HTTPS endpoint.
This template wires the app, Postgres, and a media volume on Railway automatically.

Two production requirements, both handled here: **use PostgreSQL, not SQLite** (SQLite is dev-only
and non-persistent on cloud platforms), and **persist media** — Strapi's local file storage doesn't
survive redeploys without a volume, so this template mounts one (use S3/Cloudinary for scale).

> **Security — keep it patched:** Strapi disclosed serious vulnerabilities in May 2026
> (unauthenticated admin access and SQL injection), patched in v5.33.2. Deploy a current patched
> version and keep it updated — self-hosted teams that delay updates carry real risk. Pin to a
> known-good tag rather than an unpinned `latest`.

Typical cost: **~$10–20/month** on Railway for Strapi and PostgreSQL. Contentful's Team plan is
$300/month; Strapi Cloud is $18–450/month. Self-hosted Strapi on Railway is flat compute with no
license fee and no per-seat pricing.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Strapi | [railwayapp-templates/strapi](https://github.com/railwayapp-templates/strapi) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `HOST` | Strapi | :: | - |
| `BROWSER` | Strapi | false | - |
| `JWT_SECRET` | Strapi | (secret) | - |
| `API_TOKEN_SALT` | Strapi | (secret) | - |
| `ADMIN_JWT_SECRET` | Strapi | (secret) | - |
| `TRANSFER_TOKEN_SALT` | Strapi | (secret) | - |
| `STRAPI_TELEMETRY_DISABLED` | Strapi | true | - |
| `STRAPI_DISABLE_UPDATE_NOTIFICATION` | Strapi | true | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/public/uploads`

**Category:** CMS · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/strapi-headless-cms)
