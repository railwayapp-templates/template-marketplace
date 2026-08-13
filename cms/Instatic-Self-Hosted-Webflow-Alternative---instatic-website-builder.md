# Deploy Instatic — Self-Hosted Webflow Alternative on Railway

Self-host Instatic — visual website builder, clean HTML, no lock-in

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/instatic-website-builder)

## About

Instatic is the open-source alternative to Webflow, Framer, and WordPress — a self-hosted visual CMS with a canvas editor, collections, pages, media, forms, and auth, all in one server. Its defining feature: it outputs clean, semantic HTML and compact CSS with no framework runtime, no builder attributes, and no "div soup," so your pages load fast and stay fully portable. This template deploys Instatic with a persistent volume, generated secret keys, and health checks configured, so you're building websites visually — with none of the lock-in — in minutes.

---

Instatic is refreshingly simple to run, and understanding a couple of things makes the most of it — all handled here.

**One server, SQLite by default — nothing extra to wire.** The visual editor, content management, media, authentication, forms, plugins, and publishing all run from a single Bun instance. SQLite is the right default for most sites, stored on the persistent volume alongside your uploads, so there's no separate database to provision. For a team of authors or managed database backups, you can switch to PostgreSQL — but most sites need only the volume.

**Clean static HTML output — the whole point, and your anti-lock-in edge.** Unlike Webflow and Framer, which keep your site on their infrastructure wrapped in a proprietary runtime, Instatic publishes plain semantic HTML and compact CSS — no editor machinery left in the page. Your site loads like a static file because it usually is one, and you can host the output anywhere. Real ownership: the pages, the data, and the deployment are all yours.

**Persist the volume — it holds your whole site.** Your SQLite database (pages, collections, content, form submissions, users) and all uploaded media live on the mounted volume. Without it, a redeploy wipes your site. This template mounts it, so everything persists, and you update Instatic by redeploying the latest image while your data stays intact.

**Sandboxed plugins that can't exfiltrate data.** Instatic's plugins run in isolated QuickJS-WASM sandboxes with no filesystem, no environment access, and no network unless you explicitly grant it — a fundamentally safer model than WordPress's plugin ecosystem. Extend your site without opening the security holes plugins usually bring.

**Built-in forms and real access control.** Form submissions go straight to your database with no third-party service, and Instatic ships granular role-based access control, TOTP two-factor auth, account-lockout protection, and audit logging — genuinely multi-user and production-minded, not just a page builder.

**Set up your admin on first visit.** Railway generates Instatic's secret keys automatically on deploy; open your Railway URL to create your first admin account, then start building pages on the canvas and modeling content with collections.

Typical cost: **~$5/month** on Railway for the single lightweight service and volume. Instatic is MIT-licensed and free — no monthly Webflow or Framer subscription, ever.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Instatic | `ghcr.io/corebunch/instatic` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Instatic | 8080 | - |
| `STATIC_DIR` | Instatic | /app/dist | - |
| `UPLOADS_DIR` | Instatic | /app/storage/uploads | - |
| `INSTATIC_SECRET_KEY` | Instatic | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/instatic-website-builder)
