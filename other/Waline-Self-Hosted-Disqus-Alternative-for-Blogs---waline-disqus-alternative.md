# Deploy Waline — Self-Hosted Disqus Alternative for Blogs on Railway

Self-host Waline: fast, ad-free Disqus alternative. Import your comments.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/waline-disqus-alternative)

## About

Waline is a simple, safe, self-hosted comment system — the most feature-rich open-source
alternative to Disqus. Add a fast, privacy-friendly comment section to any blog or static site
(Hugo, Hexo, Astro, Jekyll, Next.js, VuePress) with Markdown, reactions, article view counts,
email/Telegram notifications, Akismet spam filtering, and a clean moderation dashboard. MIT
licensed, no tracking, no ads, and no per-page pricing.

Disqus loads heavy trackers, slows your pages, and now pushes ads into your comment section.
Waline on Railway gives you a fast, tracker-free comment backend with PostgreSQL persistence for
~$5/month flat — your readers' data on infrastructure you own, with a one-click importer from
Disqus, Twikoo, Valine, Commento, and Artalk.

---

Waline is a serverless-style Node.js comment backend that needs a database and a public HTTPS
endpoint. Free-hosting paths (Vercel + a free cloud DB) work for hobby sites but couple your
comments to a third-party database that can expire or rate-limit. Running Waline with its own
PostgreSQL gives you a durable, self-owned comment store.

Railway provisions the Waline server and a managed PostgreSQL over private networking, with
automatic HTTPS and the database connection wired for you. Point your site's Waline widget at the
Railway URL and comments flow into your own database.

Typical cost: **~$5/month** on Railway's Hobby plan for Waline and PostgreSQL. Disqus is "free"
but monetizes with ads and trackers on your readers; Hyvor Talk and Commento Cloud charge
$5–14/month. Waline self-hosted is flat compute with no ads, no trackers, and no per-pageview fee.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Waline | [walinejs/railway-starter](https://github.com/walinejs/railway-starter) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Waline | 3000 | - |
| `PG_USER` | Waline | (secret) | - |
| `PG_PREFIX` | Waline | wl_ | - |
| `PG_PASSWORD` | Waline | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/waline-disqus-alternative)
