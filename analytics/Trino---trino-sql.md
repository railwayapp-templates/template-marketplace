# Deploy Trino on Railway

Distributed SQL: query every database with one SQL endpoint

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/trino-sql)

## About

Trino is a distributed SQL query engine for fast analytic queries across data that lives in many places at once. It began at Facebook as Presto, was renamed by its creators in 2020, and is now the query layer behind analytics at Netflix, Shopify and LinkedIn. One ANSI SQL statement can join a Postgres table to files in an S3 data lake, an Iceberg table or a Kafka topic — no ETL job, no copy of the data, no proprietary storage format.

Self-host Trino on Railway and you get the real cluster shape, not one container pretending to be a cluster: a coordinator that parses SQL, plans queries and serves the web interface, two dedicated worker services that do the scanning and joining, and a Postgres database wired up as a live catalog you can query the moment the deploy finishes. Only the coordinator has a public URL, and password authentication protects the web interface, the CLI, JDBC and the REST API. Workers stay on the private network, authenticated by a shared secret.

![Diagram of Trino coordinator, two workers and Postgres on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788254051/trino-architecture.png)

Trino separates the query engine from storage. It owns no data: connectors translate ANSI SQL into whatever each source speaks, and results stream through memory instead of landing on disk between stages, which is why interactive queries return in seconds where a batch engine takes minutes. Teams self-host it to put one SQL endpoint in front of a sprawl of databases and object storage, instead of paying a vendor to hold a second copy of their data.

- **Federated queries** — join Postgres, MySQL, MongoDB, Kafka, Iceberg, Delta Lake, Hive and 50+ other sources in one statement
- **ANSI SQL** — window functions, CTEs, correlated subqueries, geospatial and JSON functions
- **Massively parallel execution** — work is split across every worker in the cluster
- **Standard clients** — JDBC and ODBC drivers, a Python client, dbt and Superset integrations
- **Pluggable security** — file, LDAP or OAuth 2 authentication, per-catalog access rules

The services map onto Trino's own roles: the **coordinator** plans SQL, schedules work and serves the web interface and client protocol; each **worker** executes the splits it is handed, spilling to its volume when a join outgrows memory; **Postgres** is a demonstration catalog and a good place to land results. All three Trino services run one image and switch role from a single variable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| trino-coordinator | [gridalpha/trino-railway](https://github.com/gridalpha/trino-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| trino-worker-2 | [gridalpha/trino-railway](https://github.com/gridalpha/trino-railway) | Database |
| trino-worker-1 | [gridalpha/trino-railway](https://github.com/gridalpha/trino-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | trino-coordinator | 8080 | HTTP port and health check target |
| `TRINO_ROLE` | trino-coordinator | coordinator | Runs this node as the coordinator |
| `TRINO_USER` | trino-coordinator | (secret) | Web UI, CLI and JDBC username |
| `TRINO_PG_HOST` | trino-coordinator | - | Postgres catalog host |
| `TRINO_PG_PORT` | trino-coordinator | - | Postgres catalog port |
| `TRINO_PG_USER` | trino-coordinator | (secret) | Postgres catalog user |
| `TRINO_PASSWORD` | trino-coordinator | (secret) | Web UI, CLI and JDBC password |
| `TRINO_PG_DATABASE` | trino-coordinator | - | Postgres catalog database |
| `TRINO_PG_PASSWORD` | trino-coordinator | (secret) | Postgres catalog password |
| `TRINO_SHARED_SECRET` | trino-coordinator | (secret) | Authenticates internal cluster traffic |
| `TRINO_SPILL_ENABLED` | trino-coordinator | true | Spill large joins to disk |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |
| `PORT` | trino-worker-2 | 8080 | HTTP port and health check target |
| `TRINO_ROLE` | trino-worker-2 | worker | Runs this node as a worker |
| `TRINO_PG_HOST` | trino-worker-2 | - | Postgres catalog host |
| `TRINO_PG_PORT` | trino-worker-2 | - | Postgres catalog port |
| `TRINO_PG_USER` | trino-worker-2 | (secret) | Postgres catalog user |
| `TRINO_PG_DATABASE` | trino-worker-2 | - | Postgres catalog database |
| `TRINO_PG_PASSWORD` | trino-worker-2 | (secret) | Postgres catalog password |
| `TRINO_SHARED_SECRET` | trino-worker-2 | (secret) | Must match the coordinator |
| `TRINO_SPILL_ENABLED` | trino-worker-2 | true | Must match the coordinator |
| `TRINO_COORDINATOR_HOST` | trino-worker-2 | - | Coordinator private hostname |
| `TRINO_COORDINATOR_PORT` | trino-worker-2 | 8080 | Coordinator HTTP port |
| `PORT` | trino-worker-1 | 8080 | HTTP port and health check target |
| `TRINO_ROLE` | trino-worker-1 | worker | Runs this node as a worker |
| `TRINO_PG_HOST` | trino-worker-1 | - | Postgres catalog host |
| `TRINO_PG_PORT` | trino-worker-1 | - | Postgres catalog port |
| `TRINO_PG_USER` | trino-worker-1 | (secret) | Postgres catalog user |
| `TRINO_PG_DATABASE` | trino-worker-1 | - | Postgres catalog database |
| `TRINO_PG_PASSWORD` | trino-worker-1 | (secret) | Postgres catalog password |
| `TRINO_SHARED_SECRET` | trino-worker-1 | (secret) | Must match the coordinator |
| `TRINO_SPILL_ENABLED` | trino-worker-1 | true | Must match the coordinator |
| `TRINO_COORDINATOR_HOST` | trino-worker-1 | - | Coordinator private hostname |
| `TRINO_COORDINATOR_PORT` | trino-worker-1 | 8080 | Coordinator HTTP port |

## Configuration

- **Healthcheck:** `/v1/info`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/data/trino`

**Category:** Analytics · **Languages:** Shell, Dockerfile, Java

[View on Railway →](https://railway.com/deploy/trino-sql)
