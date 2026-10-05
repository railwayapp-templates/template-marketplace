# Deploy SQLMesh transformations on Railway

Reviewed SQLMesh plans with private state and warehouse Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sqlmesh-transformations)

## About

Reviewed SQLMesh plans with private state and warehouse Postgres.

Template release **v1.0.4**; see [VERSION](VERSION). This release must be qualified independently. A source release does not prove marketplace publication; the maintainer's marketplace registry records final status and deploy links.

[SQLMesh](https://github.com/SQLMesh/sqlmesh) incrementally transforms SQL data with tested plans and blocking audits. This evaluation stack deploys three private services: an exiting hourly runner and independent [PostgreSQL](https://www.postgresql.org/) state and warehouse databases. Each database has its own 5000 MB durable volume. Models, tests and audits are baked into the image.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SQLMesh State | `postgres:16.15-alpine@sha256:721873c34ceb9f8d8fc265984940dc982404c105f19ad51be9fdc5970a6080ea` | Database |
| SQLMesh Warehouse | `postgres:16.15-alpine@sha256:721873c34ceb9f8d8fc265984940dc982404c105f19ad51be9fdc5970a6080ea` | Database |
| SQLMesh Runner | [tech-progress/sqlmesh-transformations](https://github.com/tech-progress/sqlmesh-transformations) (branch: release-v1) (root: /) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | SQLMesh State | sqlmesh_state | Independent SQLMesh metadata and intervals database. |
| `POSTGRES_USER` | SQLMesh State | (secret) | SQLMesh state database owner. |
| `POSTGRES_PASSWORD` | SQLMesh State | (secret) | Generated independent state database secret; preserve across redeploys. |
| `POSTGRES_DB` | SQLMesh Warehouse | warehouse | Raw orders, physical model tables, and production views database. |
| `POSTGRES_USER` | SQLMesh Warehouse | (secret) | Warehouse owner; restrict privileges for real workloads. |
| `POSTGRES_PASSWORD` | SQLMesh Warehouse | (secret) | Generated independent warehouse secret; preserve across redeploys. |
| `PYTHONPATH` | SQLMesh Runner | /app | Makes the baked project configuration available to operator scripts. |
| `STATE_HOST` | SQLMesh Runner | - | Private DNS of the independent state PostgreSQL service. |
| `STATE_PORT` | SQLMesh Runner | 5432 | Private state PostgreSQL port. |
| `STATE_USER` | SQLMesh Runner | (secret) | State database user from the SQLMesh State service. |
| `STATE_SSLMODE` | SQLMesh Runner | prefer | Prefer TLS; Railway private transport may use plaintext PostgreSQL. |
| `STATE_DATABASE` | SQLMesh Runner | - | State database from the SQLMesh State service. |
| `STATE_PASSWORD` | SQLMesh Runner | (secret) | Private reference to the generated state secret. |
| `WAREHOUSE_HOST` | SQLMesh Runner | - | Private DNS of the independent warehouse PostgreSQL service. |
| `WAREHOUSE_PORT` | SQLMesh Runner | 5432 | Private warehouse PostgreSQL port. |
| `WAREHOUSE_USER` | SQLMesh Runner | (secret) | Warehouse user from the SQLMesh Warehouse service. |
| `WAREHOUSE_SSLMODE` | SQLMesh Runner | prefer | Prefer TLS; use require when targeting a TLS-enabled external database. |
| `WAREHOUSE_DATABASE` | SQLMesh Runner | - | Warehouse database from the SQLMesh Warehouse service. |
| `WAREHOUSE_PASSWORD` | SQLMesh Runner | (secret) | Private reference to the independent warehouse secret. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `./start.sh`

**Category:** Analytics · **Languages:** Python, Shell, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/sqlmesh-transformations)
