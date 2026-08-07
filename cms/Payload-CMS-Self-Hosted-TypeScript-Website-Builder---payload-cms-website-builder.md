# Deploy Payload CMS — Self-Hosted TypeScript Website Builder on Railway

Self-host Payload CMS — code-first website builder on Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/payload-cms-website-builder)

## About

Payload CMS is the open-source, TypeScript-native headless CMS and website builder — a code-first alternative to WordPress and Strapi, built directly on Next.js so your admin panel and front-end live in one app. This template is preconfigured as a website builder using PostgreSQL instead of Payload's default MongoDB, making it fully Railway-native. Based on the official Payload "website" starter, it ships with pages, blog posts, forms, user auth, and a comment system, so you deploy a complete, editable site in minutes.

---

Payload v3 is powerful, and two Railway-specific details decide whether it deploys cleanly — both handled here.

**PostgreSQL instead of MongoDB — Railway-native.** Payload defaults to MongoDB, but this template uses the `@payloadcms/db-postgres` adapter, so it runs on a standard Railway PostgreSQL service with no external Mongo to provision. That's the "preconfigured for Railway" difference: one database, wired through `DATABASE_URI`, fully managed on the platform.

**The database must be reachable at build time.** This is the trap that breaks most Payload-on-Railway deploys: because Payload v3 is built on Next.js, its static site generation connects to the database *during the build*, not just at runtime. If the build can't reach Postgres, you get `getaddrinfo ENOTFOUND postgres.railway.internal` and the build fails. This template wires the database reference so it's available at build time, so the first deploy completes instead of erroring.

**Media needs S3 for persistence.** Payload stores uploaded media on the local filesystem by default, which is ephemeral on Railway — images vanish on redeploy. For a production site, connect an S3-compatible bucket (Railway's storage or any S3 provider) via the storage plugin so uploads persist. Content, users, and forms live in Postgres and always persist; only media uploads need the bucket.

**Set `PAYLOAD_SECRET` and the server URL.** `PAYLOAD_SECRET` signs JWTs and secures Payload — set a strong value and keep it stable, or sessions break. `NEXT_PUBLIC_SERVER_URL` must be your Railway public domain so the admin panel generates correct links and API URLs. Both are configured at deploy.

**Create your admin on first visit.** After deploy, open `/admin` to create your first admin user, then optionally seed demo content to start from a working site with pages, posts, and forms rather than a blank install.

Typical cost: **~$5–15/month** on Railway for the app and Postgres, plus object storage for media. Payload is MIT-licensed and free — no per-seat CMS fees.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| payload-CMS | [rpuls/payload-3-boilerplate](https://github.com/rpuls/payload-3-boilerplate) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `NODE_ENV` | payload-CMS | production | - |
| `PAYLOAD_SECRET` | payload-CMS | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/app/public/media`

**Category:** CMS · **Languages:** TypeScript, JavaScript, CSS, SCSS, Dockerfile

[View on Railway →](https://railway.com/deploy/payload-cms-website-builder)
