# Deploy Metabase vs Redash on Railway

Metabase as a Redash alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-vs-redash)

## About

I've watched too many teams limp along on a creaky Redash instance because nobody wanted to own the migration. The queues back up, the PostgreSQL connector times out, and the person who set it all up left two jobs ago. Metabase vs Redash isn't a boxing match on this template — it's a decision you're probably already half way through making. You want Metabase's dashboard UX and the question builder that doesn't require every business user to learn SQL. You want to stop babysitting Redash's worker processes and query runners. And you want it running somewhere you can actually see the bill. That's what this stack is for: the Metabase OSS image, wired to a Postgres app database, deployed on Railway without a single YAML file you have to hand-maintain.

The first thing I tell anyone leaving Redash ops is to stop thinking of Metabase as a drop-in replacement with a nicer theme. They're shaped differently. Redash is fundamentally a SQL editor with a dashboard layer bolted on. Metabase starts from the other end: it wants to turn questions into dashboards and let non-SQL folks click through the query builder. That inversion shows up everywhere — how alerts are scoped, how parameters work, how a dashboard refresh behaves under a hundred concurrent viewers.

Hosting Metabase vs Redash on Railway means you run the official metabase/metabase image pinned to something like v0.63.x, point it at a dedicated Postgres for the application database (not your analytics warehouse — that comes later), and let Railway handle the reverse proxy, logs, and environment variable injection. The template ships with a companion Postgres service running the ghcr.io/railwayapp-templates/postgres-ssl image so the app database isn't an afterthought. One container for Metabase, one for Postgres, one deploy. No worker processes to tune, no Redis queue to babysit, no separate scheduler container like Redash's celery setup.

That last part matters more than you'd think. Redash's architecture — Flask app, Celery workers, Redis broker, and a separate scheduled queries process — means at least four moving pieces before you even connect a data source. Metabase consolidates that into a single Java process that handles the web UI, query execution, caching, and scheduled tasks all in one. It's not magic; it means you need to size the container for peak query load instead of idle dashboard browsing. But for a team of five to fifty analysts, that's a trade most people happily make.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| metabase/metabase | `metabase/metabase` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
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

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/metabase-vs-redash)
