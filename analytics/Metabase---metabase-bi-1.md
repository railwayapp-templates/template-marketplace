# Deploy Metabase on Railway

Tableau Alternative. Business intelligence, dashboards & scheduled reports

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-bi-1)

## About

Metabase is an open-source business intelligence tool that lets anyone on a team explore a database, build charts and assemble dashboards without writing SQL. Analysts get a full SQL editor and a modelling layer; everyone else gets a point-and-click query builder, drill-through and scheduled reports. It connects to more than twenty databases and warehouses — PostgreSQL, MySQL, SQL Server, BigQuery, Snowflake, Redshift, ClickHouse, MongoDB and others — and is the most common self-hosted answer to Tableau, Looker and Power BI.

Deploy Metabase here from the official `metabase/metabase` Docker image, paired with a PostgreSQL service holding everything Metabase creates: users, questions, dashboards, permissions and scheduler state. Traffic arrives on the Railway HTTPS domain and terminates at Metabase's embedded Jetty server on port 3000; Metabase then opens its own outbound connections to the data sources you register. The database stays private, and the web service keeps no local state — which is what makes it safe to redeploy or run on several replicas.

![Metabase Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786643826/d380bd8f-ecb2-42a7-a55d-9874629351de.png)

Metabase fixes the bottleneck where every question about the business becomes a ticket for whoever knows SQL. It puts a governed, permissioned layer over your databases so non-technical people answer their own questions while analysts keep control of the definitions.

- **Query builder** — filter, join, summarise and drill in with no SQL
- **Native SQL editor** with variables, snippets and parameterised templates
- **Dashboards** with cross-filtering, tabs and click behaviours
- **Models and metrics** defining a canonical view of a table once, reused anywhere
- **Alerts and subscriptions** on a schedule to email or Slack
- **Granular permissions**, public links and embedding for sharing beyond login

Two services do the work. **Metabase** is a JVM process serving the UI and API, plus an in-process Quartz scheduler running table syncs, alerts and subscriptions. **PostgreSQL** is the application database — not optional in production, because without it Metabase falls back to an embedded H2 file that vanishes when the container is replaced.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| metabase | `metabase/metabase` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `PORT` | metabase | 3000 | Railway health-check target port |
| `JAVA_OPTS` | metabase | -XX:MaxRAMPercentage=70 | Heap sized from container memory limit |
| `MB_DB_HOST` | metabase | - | Private database hostname |
| `MB_DB_PASS` | metabase | - | Database role password |
| `MB_DB_PORT` | metabase | - | Database port |
| `MB_DB_TYPE` | metabase | postgres | Use PostgreSQL, not embedded H2 |
| `MB_DB_USER` | metabase | (secret) | Database role name |
| `MB_SITE_URL` | metabase | - | Public base URL for links and redirects |
| `MB_DB_DBNAME` | metabase | - | Application database name |
| `MB_SITE_NAME` | metabase | Metabase | Instance name shown in the UI |
| `JAVA_TIMEZONE` | metabase | UTC | Timezone for scheduled reports |
| `MB_JETTY_PORT` | metabase | 3000 | Port Jetty binds |
| `MB_METABOT_ENABLED` | metabase | false | AI assistant off; set true with an LLM key |
| `MB_PASSWORD_COMPLEXITY` | metabase | (secret) | Password policy for local accounts |
| `MB_ANON_TRACKING_ENABLED` | metabase | false | Disable anonymous usage telemetry |
| `MB_ENCRYPTION_SECRET_KEY` | metabase | (secret) | Encrypts saved data-source credentials |
| `MB_REDIRECT_ALL_REQUESTS_TO_HTTPS` | metabase | true | Force HTTPS and send HSTS |
| `MB_APPLICATION_DB_MAX_CONNECTION_POOL_SIZE` | metabase | 15 | Connection cap to the app database |
| `MB_JDBC_DATA_WAREHOUSE_MAX_CONNECTION_POOL_SIZE` | metabase | 15 | Connection cap per data source |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/metabase-bi-1)
