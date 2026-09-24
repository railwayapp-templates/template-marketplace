# Deploy Metabase [Updated Sep'26] on Railway

Self-host Metabase — dashboards, SQL, unlimited users, Postgres app DB

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-bi-dashboards)

## About

![Metabase](https://res.cloudinary.com/dh2nt6hgh/image/upload/v1758459618/metabase_dashboard_zinqr3.png)

Metabase is the open-source business intelligence tool for teams where answering a data question shouldn't require a SQL person — a self-hosted alternative to Tableau, Looker and Mode. Point it at your warehouse and non-technical people build dashboards in a query builder, while analysts drop into raw SQL in the same interface. This template pairs the official image with a Postgres application database wired at deploy time — the difference between dashboards that survive a redeploy and dashboards that don't.

Metabase deploys easily and disappoints later. The traps below are mostly discovered after you have built something worth losing.

**Embedding branded dashboards in your product is a paid feature.** Open-source Metabase is AGPL-3.0 with unlimited users, dashboards and questions, and signed static embeds work — but white-labelling and full-app embedding are Enterprise. If the plan is customer-facing analytics under your own logo, price that in first, because self-hosting does not unlock it. For internal BI the open-source edition is complete.

**The default H2 database throws your work away.** Without `MB_DB_TYPE=postgres`, Metabase writes to an embedded H2 file inside the container, and every redeploy replaces it. Worse is the recovery path: switching to Postgres later gives you an empty Metabase, because the dashboards sit in an H2 file the new config never reads. Getting them out needs Metabase's `load-from-h2` command. Start on Postgres and the problem never exists.

**First boot runs migrations and can trip your health check.** Metabase applies its schema on first start, taking one to two minutes. A short health-check timeout kills the container mid-migration, the next attempt restarts it, and you get a restart loop that looks like a broken image. Give the check room and watch the logs for initialization completing.

**512 MB is not enough, whatever you have read.** Metabase is a JVM application and its own documentation puts the floor at 1 GB, 2 GB for comfort. Under-provision it and the first aggregation over a real table gets the process OOM-killed — which surfaces as a dropped browser connection, not an obvious memory error.

**`MB_ENCRYPTION_SECRET_KEY` must be set on day one and never changed.** It encrypts the warehouse credentials stored in the application database. Change it and every saved connection becomes undecryptable; skip it entirely and adding it later invalidates the same credentials. Set it once at deploy and leave it alone.

Typical cost: **~$15–25/month** for Metabase with 1–2 GB of RAM plus a small Postgres, at $10/GB/month RAM, $20/vCPU/month CPU and $0.15/GB/month volumes. Metabase Open Source is free with no seat count.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Metabase | `metabase/metabase` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Metabase | 3000 | PORT |
| `MB_DB_HOST` | Metabase | postgres.railway.internal | MB_DB_HOST |
| `MB_DB_PASS` | Metabase | - | MB_DB_PASS |
| `MB_DB_PORT` | Metabase | 5432 | MB_DB_PORT |
| `MB_DB_TYPE` | Metabase | postgres | MB_DB_TYPE |
| `MB_DB_USER` | Metabase | (secret) | MB_DB_USER |
| `MB_SITE_URL` | Metabase | - | MB_SITE_URL |
| `MB_DB_DBNAME` | Metabase | - | MB_DB_DBNAME |
| `MB_PASSWORD_COMPLEXITY` | Metabase | (secret) | MB_PASSWORD_COMPLEXITY |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Metabase | true | ENABLE_ALPINE_PRIVATE_NETWORKING |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/metabase-bi-dashboards)
