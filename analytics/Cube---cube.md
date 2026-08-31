# Deploy Cube on Railway

Define your business metrics once and query them from any tool

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cube)

## About

Cube is an open-source semantic layer that sits between your database and everything that reads from it. You define metrics, dimensions and joins once in YAML, and Cube serves them to BI tools, dashboards, embedded charts and AI agents through a REST API, a GraphQL API and a Postgres-compatible SQL API. It exists to stop metric drift: when "revenue" is written as SQL in six dashboards, six teams eventually report six numbers. Cube makes that definition one versioned object, applies access control to it, and caches results so dashboards stop re-scanning the warehouse.

To self-host Cube this template runs the documented production shape, not one container. **cube-api** compiles the model and answers REST, GraphQL and SQL queries; it is the only service with a public domain. **cube-refresh-worker** runs the same image with the refresh flag set, so building pre-aggregations never competes with query traffic. **cubestore** is Cube Store, Cube's own columnar engine, holding the query queue, the cache and the pre-aggregations the worker materialises, on a volume that survives redeploys. **Postgres** is the data source, pre-loaded with a sample e-commerce dataset and a matching model, so the deployment answers real queries the moment it is live.

![Diagram of the Cube, Cube Store and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788072012/cube-architecture.png)

Cube is a server, not a library. It reads a data model from disk, compiles it into SQL for whichever database you point it at, and exposes the result over several protocols at once. Self-hosting suits teams who treat metric definitions as version-controlled business logic, need a cache in front of an expensive warehouse, or cannot let data leave their own infrastructure.

- **One model, four protocols** — REST, GraphQL, the Postgres-wire SQL API and Cube's JavaScript client read the same definitions.
- **Pre-aggregations** — Cube materialises rollups into Cube Store and rewrites queries to hit them, turning warehouse scans into fast lookups.
- **Views** — a curated member set you expose to analysts and AI tools without exposing every underlying cube.
- **Row-level security** — the token's claims flow into a security context your model filters on, which is what makes multi-tenant embedding safe.
- **Wide database support** — Postgres, MySQL, ClickHouse, BigQuery, Snowflake, Databricks, Redshift and DuckDB among others.

The split matters under load: an API instance that also builds pre-aggregations stalls user queries while it does.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cube-refresh-worker | [gridalpha/cube-railway](https://github.com/gridalpha/cube-railway) | Worker |
| cube-api | [gridalpha/cube-railway](https://github.com/gridalpha/cube-railway) | TCP service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| cubestore | [gridalpha/cube-railway](https://github.com/gridalpha/cube-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | cube-refresh-worker | 4000 | Health check target, no public domain |
| `NODE_OPTIONS` | cube-refresh-worker | --max-old-space-size=3500 | Node heap ceiling for the container |
| `CUBEJS_DB_HOST` | cube-refresh-worker | - | Source database host |
| `CUBEJS_DB_NAME` | cube-refresh-worker | - | Source database name |
| `CUBEJS_DB_PASS` | cube-refresh-worker | - | Source database password |
| `CUBEJS_DB_PORT` | cube-refresh-worker | - | Source database port |
| `CUBEJS_DB_TYPE` | cube-refresh-worker | postgres | Data source driver |
| `CUBEJS_DB_USER` | cube-refresh-worker | (secret) | Source database user |
| `CUBEJS_DEV_MODE` | cube-refresh-worker | false | Keeps token verification enabled |
| `CUBEJS_LOG_LEVEL` | cube-refresh-worker | info | Server log verbosity |
| `CUBEJS_TELEMETRY` | cube-refresh-worker | false | Disables anonymous usage reporting |
| `CUBE_SAMPLE_DATA` | cube-refresh-worker | false | Seeding belongs to the API service |
| `CUBEJS_API_SECRET` | cube-refresh-worker | (secret) | Same signing key as the API |
| `CUBEJS_CUBESTORE_HOST` | cube-refresh-worker | - | Cube Store private hostname |
| `CUBEJS_CUBESTORE_PORT` | cube-refresh-worker | 3030 | Cube Store HTTP port |
| `CUBEJS_REFRESH_WORKER` | cube-refresh-worker | true | Builds pre-aggregations only |
| `CUBEJS_CACHE_AND_QUEUE_DRIVER` | cube-refresh-worker | cubestore | Cache and queue backend |
| `CUBEJS_SCHEDULED_REFRESH_TIMEZONES` | cube-refresh-worker | UTC | Timezones refreshed on schedule |
| `PORT` | cube-api | 4000 | API port and health check target |
| `NODE_OPTIONS` | cube-api | --max-old-space-size=3500 | Node heap ceiling for the container |
| `CUBEJS_DB_HOST` | cube-api | - | Source database host |
| `CUBEJS_DB_NAME` | cube-api | - | Source database name |
| `CUBEJS_DB_PASS` | cube-api | - | Source database password |
| `CUBEJS_DB_PORT` | cube-api | - | Source database port |
| `CUBEJS_DB_TYPE` | cube-api | postgres | Data source driver |
| `CUBEJS_DB_USER` | cube-api | (secret) | Source database user |
| `CUBEJS_DEV_MODE` | cube-api | false | Keeps token verification enabled |
| `CUBEJS_SQL_USER` | cube-api | (secret) | SQL API username |
| `CUBEJS_LOG_LEVEL` | cube-api | info | Server log verbosity |
| `CUBEJS_TELEMETRY` | cube-api | false | Disables anonymous usage reporting |
| `CUBE_SAMPLE_DATA` | cube-api | true | Seeds the demo dataset on first boot |
| `CUBEJS_API_SECRET` | cube-api | (secret) | HS256 key for API tokens |
| `CUBEJS_PG_SQL_PORT` | cube-api | 15432 | Postgres-wire SQL API port |
| `CUBEJS_SQL_PASSWORD` | cube-api | (secret) | SQL API password |
| `CUBEJS_CUBESTORE_HOST` | cube-api | - | Cube Store private hostname |
| `CUBEJS_CUBESTORE_PORT` | cube-api | 3030 | Cube Store HTTP port |
| `CUBE_SEED_DATABASE_URL` | cube-api | - | Connection used to seed demo data |
| `CUBEJS_CACHE_AND_QUEUE_DRIVER` | cube-api | cubestore | Cache and queue backend |
| `CUBEJS_SCHEDULED_REFRESH_TIMEZONES` | cube-api | UTC | Timezones refreshed on schedule |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | cubestore | 3031 | Status server port used for health checks |
| `CUBESTORE_DATA_DIR` | cubestore | /cube/data/store/local | Local replica on the volume |
| `CUBESTORE_LOG_LEVEL` | cubestore | info | Cube Store log verbosity |
| `CUBESTORE_META_PORT` | cubestore | 9999 | Metastore port for cluster nodes |
| `CUBESTORE_TELEMETRY` | cubestore | false | Disables anonymous usage reporting |
| `CUBESTORE_REMOTE_DIR` | cubestore | /cube/data/store/remote | Durable pre-aggregation storage |
| `CUBESTORE_SERVER_NAME` | cubestore | - | This node's cluster identity |

## Configuration

- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 15432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/livez`
- **Volume:** `/cube/data`

**Category:** Analytics · **Languages:** PLpgSQL, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/cube)
