# Deploy Postgres Migrator on Railway

PostgreSQL database migrator using native pg_dump/pg_restore

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgres-migrator)

## About

Postgres Migrator is a PostgreSQL database migration tool that uses native
`pg_dump` and `pg_restore` commands. It provides parallel restore capabilities for
faster migrations, automatic version compatibility checking, and pre-flight
validation to ensure target databases are clean before migration begins.

Hosting Postgres Migrator on Railway allows you to run database migrations as a
service without managing infrastructure. The tool requires PostgreSQL client tools
(pg_dump/pg_restore) which are included in the Docker image via the `PG_VERSION`
build argument. Simply configure your source and target database URLs via environment
variables, and the service handles the entire migration pipeline - from validation
and dumping to parallel restoration. This is ideal for scheduled migrations, backup
operations, or one-time database transfers between environments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres-migrator | [crisog/postgres-migrator](https://github.com/crisog/postgres-migrator) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NO_ACL` | false | When `true`, skips restoration of access privileges (ACLs), such as GRANT/REVOKE commands for permissions on objects. |
| `NO_OWNER` | false | When `true`, skips restoration of object ownership (e.g., who owns tables/schemas). This omits ALTER OWNER commands in the dump file |
| `DATA_ONLY` | false | When true, restores only data without schema. Use when the target database already has the schema in place |
| `PG_VERSION` | - | PostgreSQL major version for client tools (15, 16, or 17). Must match your database version. |
| `PARALLEL_JOBS` | 4 | Number of parallel jobs for restore |
| `VALIDATE_AFTER` | true | Run validation on all tables after migration completes (set to `false` to skip) |
| `EXCLUDE_SCHEMAS` | - | Comma-separated list of schemas to exclude from the dump (e.g., pscale_extensions when migrating from PlanetScale) |
| `SKIP_VERSION_CHECK` | false | When true, skips the PostgreSQL major version compatibility check between source and target databases, allowing migration    across different versions (e.g., PG 16 to PG 17) |
| `SOURCE_DATABASE_URL` | - | Source database connection string |
| `TARGET_DATABASE_URL` | - | Target database connection string |

**Category:** Other · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/deploy/postgres-migrator)
