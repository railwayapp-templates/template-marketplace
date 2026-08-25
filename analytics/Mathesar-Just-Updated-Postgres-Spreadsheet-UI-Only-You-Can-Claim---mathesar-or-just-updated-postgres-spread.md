# Deploy Mathesar | (Just Updated) Postgres Spreadsheet UI Only You Can Claim on Railway

Postgres spreadsheet UI. Admin seeded per deploy, uploads on a volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mathesar-or-just-updated-postgres-spread)

## About

Mathesar is an open-source web interface to your own PostgreSQL database. It presents your real
tables as spreadsheets — edit cells, add columns, follow foreign keys, filter and sort, share
saved explorations — while everything stays in plain Postgres that your other applications keep
reading and writing normally.

This template deploys Mathesar 0.12.0 with a Postgres database, and it is the only listing in
this category where **the instance is claimed before it is ever reachable**.

Mathesar is a Django application served by Gunicorn, with its own internal Postgres database for
users, permissions and saved explorations. Two things decide whether a hosted deploy behaves:

**The installation wizard authenticates nobody.** Stock Mathesar serves `/complete_installation/`
to any visitor until a superuser exists, and the account that form creates is a superuser that is
logged straight in. Upstream's boot sequence creates no user and offers no variable that seeds
one, so on a public URL the first stranger to load the page owns the deployment — and the loss is
permanent, because password recovery is an emailed link and a fresh deploy has no mail server.
This template seeds the administrator **before the web server binds its port**, refuses to start
at all without a password, and re-applies that password on every boot, so a redeploy is a working
password reset.

**Uploaded files need a disk.** Mathesar stages imported CSV and TSV files on the filesystem
under `MEDIA_ROOT`, which defaults to a path inside the container. Without a volume those
in-progress imports disappear on every redeploy. This template mounts a volume and points
`MEDIA_ROOT` at it.

Beyond that: the image is pinned rather than tracking a moving tag, on an application that runs
database migrations forward on boot; Gunicorn's worker count is read from the container's own CPU
and memory limits instead of a fixed number; and the fallback that silently starts a throwaway
Postgres inside the app container is deliberately not enabled, so a misconfigured database fails
loudly instead of quietly storing your data somewhere that does not survive a restart.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mathesar | `ghcr.io/bon5co/mathesar-railway:0.12.0` | Web service |
| postgres | `postgres:17.10-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `SECRET_KEY` | mathesar | (secret) |
| `POSTGRES_USER` | mathesar | (secret) |
| `POSTGRES_PASSWORD` | mathesar | (secret) |
| `MATHESAR_ADMIN_PASSWORD` | mathesar | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/mathesar-or-just-updated-postgres-spread)
