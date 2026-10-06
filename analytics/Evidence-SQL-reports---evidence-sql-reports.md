# Deploy Evidence SQL reports on Railway

Protected SQL freshness and reconciliation reports on PostgreSQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evidence-sql-reports)

## About

Deploy protected SQL/Markdown reports for ingestion freshness and order/payment
reconciliation. Synthetic fixtures include stale pipelines, mismatched payments,
duplicate references and missing orders.

Evidence Reports uses the current source-built Evidence CLI, its native direct
PostgreSQL connector and shared HTTP Basic Auth. A private warehouse persists
on one 5000 MB volume; Reports has no volume. The public gateway fronts an
inner loopback-only Evidence listener. Retrieve generated viewer credentials
privately from service variables and use the HTTPS report domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Warehouse | [tech-progress/evidence-sql-reports](https://github.com/tech-progress/evidence-sql-reports) (branch: release-v1) (root: /) | Database |
| Evidence Reports | [tech-progress/evidence-sql-reports](https://github.com/tech-progress/evidence-sql-reports) (branch: release-v1) (root: /) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Warehouse | reports | Initial database name reports; changing it requires a migration. |
| `POSTGRES_USER` | Warehouse | (secret) | Private database administrator, not passed to the report service. |
| `POSTGRES_PASSWORD` | Warehouse | (secret) | Generated administrator password; initial-volume setup only. |
| `REPORT_DB_PASSWORD` | Warehouse | (secret) | Generated restricted role password; rotate with ALTER ROLE, not only an environment edit. |
| `PORT` | Evidence Reports | 3000 | Public report gateway port; Evidence itself stays on loopback 3001. |
| `REPORT_DB_HOST` | Evidence Reports | - | Private warehouse DNS name, never its public TCP endpoint. |
| `REPORT_DB_NAME` | Evidence Reports | - | Fixture database name; the initial schema expects reports. |
| `REPORT_DB_USER` | Evidence Reports | (secret) | SELECT-only connection role; never use the warehouse administrator. |
| `REPORT_DB_SSLMODE` | Evidence Reports | disable | disable only for this private fixture network; external PostgreSQL requires verify-full. |
| `REPORT_DB_PASSWORD` | Evidence Reports | (secret) | References the warehouse reader secret; initial-volume setup only. |
| `EVIDENCE_BASIC_USER` | Evidence Reports | (secret) | Generated shared viewer username. Retrieve from service variables. |
| `EVIDENCE_BASIC_PASSWORD` | Evidence Reports | (secret) | Generated shared viewer password. Rotate and redeploy to invalidate credentials. |
| `EVIDENCE_TELEMETRY_DISABLED` | Evidence Reports | true | Disable the official CLI startup and heartbeat telemetry. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** JavaScript, Shell, Dockerfile, TypeScript

[View on Railway →](https://railway.com/deploy/evidence-sql-reports)
