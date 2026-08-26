# Deploy NodeBB | (Just Updated) Discourse Alternative That Actually Boots on Railway

Forum that boots: admin seeded before launch, uploads survive redeploys.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nodebb-or-just-updated-discourse-alterna)

## About

NodeBB is an open-source forum platform — real-time discussions, categories, topics, tags,
notifications, moderation tools, a REST API and a plugin ecosystem. It is the self-hosted
alternative to Discourse and to hosted community platforms, and it runs on Node.js with
PostgreSQL.

This template deploys NodeBB 4.15.1 with PostgreSQL 17, both on volumes, with the forum
installed and its administrator account already created before the URL is ever served.

NodeBB is a long-running Node.js process that reads and writes constantly: sessions, topic
and post indexes, notification queues, uploads and the compiled front-end bundle. It needs a
persistent database, a writable data directory for uploads and build output, and a stable
public URL, because the URL is baked into its configuration and used for links, notifications
and websockets.

Three things make it easy to get wrong on a platform that redeploys containers:

- Its configuration file has to be valid JSON. Several deployment recipes build it inside a
  shell start command; the shell strips the quoting and NodeBB refuses to start.
- With no configuration present, NodeBB serves a public web installer, so whoever opens the
  URL first becomes the administrator.
- Uploads, build output and the configuration must live on a volume, and the volume is mounted
  as root while NodeBB runs unprivileged.

This template handles all three. The configuration is written with a JSON encoder, the forum is
installed non-interactively before the port is bound, and the volume ownership is repaired at
boot. The administrator password is re-applied on every boot, so a redeploy is a working
password reset — useful, because NodeBB's own recovery path is an emailed link and a fresh
deployment has no mail server.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nodebb | `ghcr.io/bon5co/nodebb-railway:4.15.1` | Web service |
| postgres | `postgres:17.10-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `NODEBB_SECRET` | nodebb | (secret) |
| `NODEBB_DB_USER` | nodebb | (secret) |
| `NODEBB_DB_PASSWORD` | nodebb | (secret) |
| `NODEBB_ADMIN_PASSWORD` | nodebb | (secret) |
| `NODEBB_ADMIN_USERNAME` | nodebb | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/nodebb-or-just-updated-discourse-alterna)
