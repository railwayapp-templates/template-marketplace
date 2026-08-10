# Deploy Instatic CMS | (Just Updated) AI Website Builder No Stranger Can Claim on Railway

Deploy this application on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/instatic-cms-v0014-or-ai-website-builder)

## About

Instatic is a self-hosted CMS and website builder: a visual page editor, media library,
plugin system, contact forms and AI-assisted authoring, publishing clean framework-free
static HTML from a single Bun server.

This template deploys it **already claimed**. Instatic's first-run wizard is served to
anybody who reaches the URL, and Railway makes that URL public the moment the deploy goes
green — so on a stock deploy the owner account belongs to whoever gets there first. Here the
owner is written into the database before the port is ever bound, from a password Railway
generates for this deployment.

One container and one volume. Instatic serves its own admin UI and the published site,
stores content in SQLite, and keeps uploads, published artefacts, fonts, plugins and the
runtime dependency cache on the same disk. There is no separate database server, worker or
cache to run alongside it.

Four things this template fixes relative to a stock deploy:

- **The setup wizard is closed before the first request.** `POST /admin/api/cms/setup` is
  dispatched ahead of every authentication check and creates an `owner` account for any
  anonymous caller while the instance is unclaimed. Here that route answers `409` from the
  first request the public port ever serves.
- **Per-visitor rate limits actually work.** Instatic only trusts `X-Forwarded-For` from a
  configured proxy range, and on Railway every request arrives from the edge — so without
  that setting the whole internet shares one contact-form and one login bucket. Railway's
  edge range is configured here.
- **The runtime dependency cache lives on the volume.** It defaults to `/tmp`, so published
  pages that import an npm dependency lose their JavaScript on every redeploy until the site
  is republished.
- **The image is pinned.** Instatic runs forward-only database migrations on boot and has
  shipped fourteen releases in fifty-one days; an unpinned redeploy is an unrequested
  upgrade with no way back.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| instatic | `ghcr.io/bon5co/instatic-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `INSTATIC_SECRET_KEY` | (secret) |
| `INSTATIC_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/instatic-cms-v0014-or-ai-website-builder)
