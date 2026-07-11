# Deploy Instatic — Self-Hosted AI Website Builder on Railway

Self-host a visual CMS with AI page builder & built-in forms. Clean HTML.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/instatic-visual-cms)

## About

Instatic is a modern, self-hosted visual CMS that replaces an entire stack — headless CMS,
framework, form service, image CDN, and host — with one Bun server. Build pages on a drag-and-drop
canvas, let a built-in AI agent edit the page as real editable nodes, collect form submissions
into your own database tables, and publish plain semantic HTML + compact CSS with zero framework
runtime. The output is so clean it loads like a static file — because, most of the time, it is one.

MIT licensed, self-hosted, and backed by SQLite or PostgreSQL. Railway is the fastest way to get
Instatic live — one click, about two minutes, and you own the whole stack for ~$5/month instead
of stitching together Webflow ($23+/mo), a form service, and a CDN.

---

A modern website usually means assembling a stack — headless CMS, framework, host, form service,
analytics, image CDN — each with its own bill. Instatic is the opposite bet: one server holds the
editor, content, media, auth, forms, plugins, and publisher, and ships plain semantic HTML with
none of the editor's machinery left behind. No framework runtime, no builder attributes.

Railway is the recommended way to run it. This template deploys the Bun server with a persistent
volume and automatic HTTPS — pick the template, hit deploy, wait about two minutes, and your
visual CMS is live. No build pipeline, no separate form backend, no CDN to configure.

Typical cost: **~$5/month** on Railway's Hobby plan. Webflow starts at $23/month per site and
locks your content in their platform. Squarespace is $16+/month. Instatic on Railway gives you a
visual editor, forms, media, and an AI page builder at flat compute cost with full data ownership.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Instatic | `corebunch/instatic:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `STATIC_DIR` | /app/dist |
| `UPLOADS_DIR` | /app/storage/uploads |
| `DATABASE_URL` | sqlite:/app/storage/data/cms.db |
| `INSTATIC_SECRET_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/instatic-visual-cms)
