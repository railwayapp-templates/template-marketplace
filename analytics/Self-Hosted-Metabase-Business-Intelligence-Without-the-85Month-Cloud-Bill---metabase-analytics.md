# Deploy Self-Hosted Metabase — Business Intelligence Without the $85/Month Cloud Bill on Railway

Self-host Metabase BI — no $85/month cloud bill. Free for your whole team.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-analytics)

## About

![Metabase business intelligence dashboard](https://res.cloudinary.com/dh2nt6hgh/image/upload/v1758459618/metabase_dashboard_zinqr3.png)

Metabase is the most popular open-source business intelligence platform — no-code visual
query builder, full SQL editor, dashboards, alerts, scheduled reports, and embedded analytics
for 20+ databases including PostgreSQL, MySQL, MongoDB, BigQuery, Snowflake, and Redshift.
Your entire team can explore data and build charts without waiting for an analyst.

**Metabase Cloud starts at $85/month plus $5/user.** Self-hosting on Railway costs
~$5–10/month flat for your entire team with no user caps, no plan limits, and full ownership
of every dashboard and dataset your team builds.

---

Running Metabase in production requires a persistent PostgreSQL database for application
metadata, a public HTTPS endpoint for browser access and embedding, and a process that
survives restarts without losing dashboard configuration. Without a managed host, you're
setting up Docker, managing PostgreSQL, handling SSL, and configuring process restarts.

Railway provisions all of it. This template deploys Metabase pre-connected to Railway-managed
PostgreSQL 17 over private networking. Dashboards, questions, users, and permissions survive
every redeploy automatically.

Typical cost: **~$5–10/month** on Railway's Hobby plan. Metabase Cloud Starter costs
$85/month + $5/user — $110/month for 5 people, $135/month for 10. SSO, row-level security,
and advanced embedding require Pro at $500/month + $10/user. Railway removes all of that.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Metabase | `metabase/metabase` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `MB_DB_DBNAME` | Postgres | metabase | - |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Metabase | 3000 | - |
| `MB_DB_HOST` | Metabase | postgres.railway.internal | - |
| `MB_DB_PORT` | Metabase | 5432 | - |
| `MB_DB_TYPE` | Metabase | postgres | - |
| `MB_DB_USER` | Metabase | (secret) | - |
| `MB_PASSWORD_COMPLEXITY` | Metabase | (secret) | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Metabase | true | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/metabase-analytics)
