# Deploy Aphex Website (SQLite + Volume) on Railway

Aphex Website Template using SQLite and a volume mount

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/aphex-website-sqlite-volume)

## About

Aphex CMS is an open-source, developer-first content management system built on SvelteKit.
Unlike headless CMSes it is **embedded**: the same app that serves your website also runs
the editing studio, so there is no separate backend to deploy and no content API to wire
up. This template deploys a complete, editable website — a block-based page builder, a
blog, full-text search and visual editing — as a **single service** backed by SQLite on a
persistent volume.

One container, one volume, nothing else. No database service, no object storage, nothing
to configure.

Hosting Aphex means running one SvelteKit container. It serves the public site, the
`/admin` studio, a REST and GraphQL API, and an MCP endpoint from the same process.

This template keeps the whole site's state on **one volume mounted at `/data`** — the
SQLite database file and the uploaded media both live there. That is what makes it a
single service, and it is the one part that cannot be recreated: the volume *is* your
site. SQLite runs in WAL mode with a busy timeout, which is what makes it a real choice
for a web workload rather than a toy one — readers never block the writer.

The schema is provisioned at startup, so there is no migration step to run and nothing to
manage as your content model changes. The background job queue — scheduled publishing,
event consumers — runs in-process, so no worker service or cron is required.

Uploaded media is never served from disk directly. Every asset is addressed through the
app at `/media/:id/:filename`, which is what lets private files stay private and resized
variants be generated on demand and cached permanently.

This template is meant to become your website. Deploy it to see how it works, build your
own version locally with `pnpm create aphex`, then point this same project at your
repository — your content, uploads and domain stay exactly where they are.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| aphex-website | [IcelandicIcecream/aphex-website](https://github.com/IcelandicIcecream/aphex-website) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AUTH_SECRET` | (secret) | Signs session cookies and API keys. Generated for you. Keep it — rotating it signs everyone out and invalidates every API key. |
| `APHEX_DATABASE` | sqlite | Which database driver to use. Leave as sqlite. |
| `APHEX_SQLITE_URL` | file:/data/website.db | Database file, on the volume mounted at /data. Don't edit unless you changed the mount path. |
| `APHEX_UPLOADS_DIR` | /data/uploads | Where uploaded media is stored. Must be on the volume, or uploads vanish on the next deploy. |
| `APHEX_BOOTSTRAP_EMAIL` | - | Optional. Only this email address can claim the super-admin account. Leave blank and the first person to find the login page becomes admin. |
| `APHEX_EMBEDDED_WORKER` | true | Runs the background job queue inside the app. Leave on: without it scheduled publishes are accepted but never happen. |
| `APHEX_ASSET_SIGNING_SECRET` | (secret) | Used to sign time-limited links to private files (if any), so they work without a login. Generated for you. |
| `APHEX_SECRET_ENCRYPTION_KEY` | (secret) | Used to encrypt plugin secrets (if any). Generated for you. Keep it stable — changing it makes existing plugin secrets unreadable. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** CMS · **Languages:** Svelte, TypeScript, Shell, Dockerfile, CSS, JavaScript, Procfile, HTML

[View on Railway →](https://railway.com/deploy/aphex-website-sqlite-volume)
