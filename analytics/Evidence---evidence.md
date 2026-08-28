# Deploy Evidence on Railway

Build data reports by writing SQL and Markdown files

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evidence)

## About

Evidence is an open-source business intelligence tool that treats reports as code. Instead of dragging fields around a canvas you write a Markdown file, drop SQL queries into it and add chart components inline, then version it in Git and review changes in a pull request. Data teams use it to publish repeatable reports without per-seat BI licences, and a dashboard stays a text file you can diff and reuse. Evidence queries your warehouse at request time, so there is no second copy of the numbers to sync.

This template lets you self-host Evidence on Railway with a warehouse already attached. It runs two services: an **Evidence** web service built from [gridalpha/evidence-railway](https://github.com/gridalpha/evidence-railway) on the official `evidencedev/serve` image, and a managed **Postgres** database used as the warehouse. Browser traffic reaches Evidence over its public Railway domain behind HTTP basic auth; Evidence queries Postgres over the private network as a `SELECT`-only role it provisions on first boot. A sample retail dataset is seeded automatically, so the reports render real charts as soon as the deploy turns green.

![Evidence and Postgres services connected on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787801960/evidence-architecture.png)

Evidence turns a directory of Markdown files into a fast, interactive report site. Queries run against your warehouse when a page is requested, so numbers are never stale and no extract job needs scheduling. Self-hosting suits teams whose data must stay in their own infrastructure, and anyone wanting versioned reports without a per-user BI bill.

- Reports authored in Markdown with embedded SQL and chart components
- Live queries against your own warehouse — no data copy, no sync job
- Charts, tables, big-value tiles, dropdowns and cross-filtering built in
- Everything in Git: branch it, review it, roll it back
- HTTP basic auth for self-hosted deployments

The Evidence service is stateless — reports live in the image, data in Postgres — so it needs no volume and is safe to scale past one replica. Postgres holds the seeded `demo` tables and anything else you load.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| evidence | [gridalpha/evidence-railway](https://github.com/gridalpha/evidence-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | evidence | 3000 | Port the front proxy listens on |
| `DATABASE_URL` | evidence | - | Superuser URL used only for boot bootstrap |
| `EVIDENCE_DB_HOST` | evidence | - | Warehouse private hostname |
| `EVIDENCE_DB_NAME` | evidence | - | Warehouse database name |
| `EVIDENCE_DB_USER` | evidence | (secret) | Read-only role Evidence connects as |
| `EVIDENCE_BOOTSTRAP` | evidence | 1 | Seed sample data and reader role at boot |
| `EVIDENCE_BASIC_USER` | evidence | (secret) | HTTP basic auth username for the site |
| `EVIDENCE_DB_SSLMODE` | evidence | require | TLS mode used to reach the warehouse |
| `EVIDENCE_DB_PASSWORD` | evidence | (secret) | Password for the read-only warehouse role |
| `EVIDENCE_BASIC_PASSWORD` | evidence | (secret) | HTTP basic auth password for the site |
| `EVIDENCE_TELEMETRY_DISABLED` | evidence | 1 | Opt out of anonymous CLI usage reporting |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics · **Languages:** PLpgSQL, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/evidence)
