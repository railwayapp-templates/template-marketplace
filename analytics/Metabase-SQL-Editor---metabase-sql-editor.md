# Deploy Metabase SQL Editor on Railway

SQL notebook and saved questions in Metabase

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-sql-editor)

## About

You're three joins deep in a query, the numbers finally reconcile, and someone on Slack asks, “Can you share that?” In a standalone SQL notebook, you’d export a CSV, screenshot the chart, or paste the SQL into a gist that rots within a week. In Metabase, you hit Save, name the question, drop it into a collection, and the next person opens it with the SQL, the chart, and the ability to duplicate it without touching your original. That saved question becomes a living building block for dashboards and scheduled alerts, not a dead artifact. This template makes that workflow the default by hosting Metabase’s SQL editor and metadata store on Railway, so saved questions survive redeploys and are available to the whole team.

You save a SQL query in Metabase, pin it to a dashboard, and suddenly a separate SQL notebook tool feels redundant. You already have a warehouse connection, a query runner, a permissions model, and a place people actually look at numbers. Adding another product just for sharing queries means another login, another set of credentials, another place where stale SQL lives. This template runs Metabase on Railway with the SQL editor front and center: write joins, save them as questions, pin them to dashboards, share the link. No separate notebook, no export-to-CSV dance, no copy-paste from a gist.

Railway hosts the Metabase container and the Postgres database that stores Metabase's own metadata — saved questions, dashboards, collections, users. The actual analytics databases stay where they are. You connect them after first boot via Admin → Databases (Postgres, MySQL, BigQuery, Snowflake, Redshift, MongoDB, etc.). The app layer and its metadata store now live on Railway, where scaling is a slider and logs are one click away.

Accept up front: Metabase's SQL editor is not a full IDE. It's a notebook-style query composer with a results grid, a visual query builder that translates to SQL, and a save-as-question flow. That's the point. You're not replacing DBeaver or DataGrip. You're giving analysts a way to write SQL once, save it where the team can find it, and let non-SQL people interact through filters and dashboards. The schema browser sits left, autocompletes table and column names, and shows relationships you'd otherwise need a separate ERD tool to see.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| metabase/metabase | `metabase/metabase` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | metabase/metabase | 3000 | PORT |
| `MB_DB_HOST` | metabase/metabase | - | MB_DB_HOST |
| `MB_DB_PASS` | metabase/metabase | - | MB_DB_PASS |
| `MB_DB_PORT` | metabase/metabase | - | MB_DB_PORT |
| `MB_DB_TYPE` | metabase/metabase | postgres | MB_DB_TYPE |
| `MB_DB_USER` | metabase/metabase | (secret) | MB_DB_USER |
| `MB_SITE_URL` | metabase/metabase | - | MB_SITE_URL |
| `MB_DB_DBNAME` | metabase/metabase | - | MB_DB_DBNAME |
| `MB_PASSWORD_COMPLEXITY` | metabase/metabase | (secret) | MB_PASSWORD_COMPLEXITY |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | metabase/metabase | true | ENABLE_ALPINE_PRIVATE_NETWORKING |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/metabase-sql-editor)
