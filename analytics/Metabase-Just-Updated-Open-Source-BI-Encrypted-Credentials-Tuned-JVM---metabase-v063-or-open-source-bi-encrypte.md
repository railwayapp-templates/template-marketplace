# Deploy Metabase | (Just Updated) Open Source BI, Encrypted Credentials + Tuned JVM on Railway

Deploy this application on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-v063-or-open-source-bi-encrypte)

## About

Metabase is the open-source BI tool that lets anyone on your team ask questions of your
data and build dashboards without writing SQL — the self-hosted alternative to Looker,
Tableau and Power BI. This template runs the pinned **v0.63.2.7** release with its own
PostgreSQL application database on a volume, and it deploys with an **empty form**: every
value is filled in for you.

Three things it does that the other Metabase listings on this marketplace do not:

- **Your data-source credentials are encrypted at rest.** `MB_ENCRYPTION_SECRET_KEY` is
  generated per deploy. Metabase stores the password for every warehouse you connect —
  Postgres, MySQL, Snowflake, BigQuery service-account JSON — inside its own application
  database. Without that key they are stored in plaintext. Checked on 2026-08-01: none of
  the five Metabase listings holding 271 of this category's 283 recent deploys sets it.
  It has to be right on the **first** deploy, because Metabase encrypts credentials when
  they are written — anything saved before the key exists stays readable.
- **The version is pinned.** Everyone else ships `metabase/metabase:latest`. Metabase's
  application-database migrations run one way; with a floating tag an ordinary redeploy
  can migrate your app DB onto a new major with no supported way back.
- **The JVM gets the RAM you are paying for.** Java defaults to a heap of 25% of the
  container limit. Measured on Railway: **1.86 GiB** by default against **5.22 GiB** with
  this template's `-XX:MaxRAMPercentage=70`. Metabase's own launcher sets
  `-XX:+CrashOnOutOfMemoryError`, so a dashboard that outgrows the heap does not get
  slower — it kills the container.

Metabase is a Clojure/JVM application. It keeps its own state — users, dashboards,
questions, permissions and saved data-source credentials — in an *application database*,
separate from whatever data you point it at. It ships with an embedded H2 file so it can
start with no configuration, and that default is the most common way a self-hosted
Metabase is lost: H2 writes to the container filesystem, so on a platform that replaces
containers on every deploy it takes your dashboards with it.

Running it properly means giving it a real PostgreSQL app DB on persistent storage,
sizing the JVM heap for the container it runs in, and setting an encryption key before
any warehouse credential is saved. This template does all three. Railway provisions two
services — Metabase and a PostgreSQL 17 app DB with a volume attached — wires the
connection over Railway's private network, generates the encryption key and session
secrets, and gives Metabase a public HTTPS domain. First boot runs the schema migrations
and takes about a minute (41 s measured); after that the container starts in seconds.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| metabase | `ghcr.io/bon5co/metabase-railway:latest` | Web service |
| postgres | `postgres:17.10-trixie` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MB_ENCRYPTION_SECRET_KEY` | metabase | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/metabase-v063-or-open-source-bi-encrypte)
