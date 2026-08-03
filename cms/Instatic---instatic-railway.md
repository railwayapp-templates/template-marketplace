# Deploy Instatic on Railway

Open-source Webflow alternative: canvas editor, CMS, collections, pages

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/instatic-railway)

## About

Instatic is an open-source, self-hosted visual CMS and website builder — the MIT-licensed alternative to Webflow, Framer and WordPress. One Bun server holds the canvas editor, content engine, media library, auth, forms, plugins and the publisher. Visitors get plain semantic HTML and compact CSS: a page published from this template's own deployment was a 487-byte document with a `script-src 'none'` CSP.

Self-host Instatic on Railway as two services. `instatic` runs `ghcr.io/corebunch/instatic:0.0.14` on target port 8080 with the public domain, and mounts one volume at `/app/storage` for media, fonts, plugin packages and published artefacts. The private `Postgres` service holds pages, collections, users, form submissions and the audit log. Migrations run at container start, before the server binds — no migrate step, no pre-deploy command.

![Instatic Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1785654283/562_1x_shots_so_scb6eq.png)

Instatic is one container plus a database where a headless CMS would be four moving parts. Self-host it when SEO depends on clean markup, when client work must be handed over without lock-in, or when content cannot leave your servers.

- **Visual canvas editor** — mobile, tablet and desktop breakpoints edited side by side, a layers tree, reusable components and templates.
- **Content, data and media** — pages, posts and custom collections, a schema builder with repeaters, CMS-native forms writing to your own tables, Sharp-generated responsive images, whole-site import.
- **Security and extensibility** — optional TOTP MFA, 38 access-control capabilities, login lockout, CSRF checks, step-up auth before publishing, audit log; plugins run in a QuickJS-WASM sandbox with no filesystem, env vars or network unless granted; the AI assistant (Anthropic, OpenAI, OpenRouter, Ollama) stays off until you add a key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Instatic | `ghcr.io/corebunch/instatic:0.0.14` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `PORT` | Instatic | 8080 | HTTP port, matches public target port |
| `STATIC_DIR` | Instatic | /app/dist | Compiled admin UI in image |
| `UPLOADS_DIR` | Instatic | /app/storage/uploads | Media path on persistent volume |
| `DATABASE_URL` | Instatic | - | Internal Postgres connection string |
| `PUBLIC_ORIGIN` | Instatic | - | Public origin for CSRF checks |
| `INSTATIC_SECRET_KEY` | Instatic | (secret) | Base64 AES key for stored secrets |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/instatic-railway)
