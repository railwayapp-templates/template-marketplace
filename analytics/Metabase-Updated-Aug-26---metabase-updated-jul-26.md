# Deploy Metabase [Updated Aug '26] on Railway

Metabase [Aug '26] (Open-Source Tooling & Analytics) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-updated-jul-26)

## About

Metabase is the open-source business intelligence tool that turns raw database tables into dashboards anyone on your team can understand - no SQL required for most questions, full SQL access when you need it. Self-host on Railway to skip per-seat licensing entirely and keep your BI layer on infrastructure you control.

Every major BI platform charges by the seat. Power BI is $14/user/month, Tableau's Creator license starts around $75/user/month, and Looker's enterprise pricing is typically negotiated per-organization and rarely cheap. None of that scales well once more than a handful of people actually want dashboard access - and dashboard access is exactly the thing you want to spread widely, not ration. Metabase flips that: it's free to self-host, with no per-seat fee at all, so giving your whole company read access to a metrics dashboard costs the same as giving one person access.

The other real reason teams choose self-hosting over a BI SaaS product is where the connection credentials live. Metabase needs database credentials to query your actual data - self-hosting means those credentials, along with every saved question and dashboard, stay inside infrastructure you control rather than a third party's multi-tenant cloud. For teams with compliance requirements around where analytics infrastructure can live, that's not a minor detail.

Metabase's actual differentiator against pure spreadsheet tools or ad-hoc SQL scripts is the no-code question builder: click through tables, filters, and aggregations visually, and Metabase generates the underlying SQL for you. Non-technical teammates get real answers without learning to write a JOIN, and the SQL editor is still right there for anyone who wants to write it by hand.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| metabase-railway | [shruti060701/metabase-railway](https://github.com/shruti060701/metabase-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | metabase-railway | 3000 | Port Railway routes external traffic to. Must be set explicitly as a variable here — a Dockerfile default alone isn't enough for Railway's edge to route correctly. |
| `MB_DB_HOST` | metabase-railway | - | nternal hostname for Metabase's application database. |
| `MB_DB_PASS` | metabase-railway | - | Password for Metabase's application database. |
| `MB_DB_PORT` | metabase-railway | - | Port for Metabase's application database. |
| `MB_DB_TYPE` | metabase-railway | postgres | Tells Metabase to use an external Postgres database for its own application data instead of the embedded default (H2), which isn't suitable for production. |
| `MB_DB_USER` | metabase-railway | (secret) | Username for Metabase's application database. |
| `MB_DB_DBNAME` | metabase-railway | - | Database name for Metabase's own metadata (dashboards, questions, users) — separate from whatever data source you connect to later. |
| `MB_JETTY_PORT` | metabase-railway | 3000 | Metabase's own actual port-configuration variable (it does not read Railway's generic `PORT` itself) — set alongside `PORT` above so the app definitely binds where Railway expects it. |
| `POSTGRES_DB` | Postgres | railway | Default database name created on startup. |
| `DATABASE_URL` | Postgres | - | Public/external connection string for reaching this database from outside Railway's network. |
| `POSTGRES_USER` | Postgres | (secret) | Username for the Postgres superuser account. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated superuser password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public/external connection string for reaching this database from outside Railway's network. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/metabase-updated-jul-26)
