# Deploy Pingvin Share X v1.22 | WeTransfer Alternative, Not Claimable on Railway

WeTransfer alternative. Admin seeded at boot, so no stranger can claim it

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pingvin-share-x-v122-or-wetransfer-alter)

## About

Pingvin Share X is a self-hosted file-sharing service — a WeTransfer alternative you own. Upload
files, hand out a link, and set how long it lives: expiry date, download limit, visitor limit, a
password, or an email recipient. Reverse shares let someone upload *to* you without an account,
and OIDC, OAuth and LDAP logins are built in.

This template deploys the **maintained fork**, `smp46/pingvin-share-x` v1.22.0. The original
project was archived on 2025-06-29 and its own README points here; the archived image's `latest`
tag has not moved since May 2025.

One service, one volume, no database or cache to run alongside it: the SQLite database, the
uploaded files and the branding assets all live on a single disk, and first boot takes seconds
because migrations are the only startup work.

Three things about this app need handling before it works on Railway, and this template does all
three inside the image rather than asking you to configure them:

- **The listener.** The bundled Caddy is hardcoded to port 3000 and the frontend to 3333, and
  `$PORT` is not a listen port anywhere in the app — it selects the *upstream* Caddy proxies pages
  to. Because Railway injects `PORT` into every service, an untuned deploy serves
  `{"message":"Cannot GET /","statusCode":404}` for every page while its health check stays green.
  Here the injected port is captured and the proxy is generated around it.
- **The administrator.** Pingvin gives administrator rights to whoever signs up first, and open
  registration is the default, so an untuned deploy belongs to the first stranger who opens the
  URL. This template generates the admin password per deploy and seeds the account before the
  public port is ever bound, then closes registration.
- **Persistence that includes your branding.** Logos, favicon and PWA icons are written outside
  the data directory, so with one volume a custom logo silently reverts on every redeploy. That
  path is relocated onto the volume.

Emailed share links, password-reset links and OAuth redirects are built from the deployment's own
Railway domain, and the login throttle is keyed on the real client address rather than on
Railway's edge — without that, twenty wrong passwords lock every user out of the instance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pingvin-share | `ghcr.io/bon5co/pingvin-share-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PINGVIN_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/app/backend/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/pingvin-share-x-v122-or-wetransfer-alter)
