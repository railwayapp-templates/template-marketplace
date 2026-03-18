# Deploy Postgres Migrator on Railway

PostgreSQL database migrator using native pg_dump/pg_restore

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/postgres-migrator)

## About

Postgres Migrator is a PostgreSQL database migration tool that uses native
  `pg_dump` and `pg_restore` commands. It provides parallel restore capabilities for
  faster migrations, automatic version compatibility checking, and pre-flight
  validation to ensure target databases are clean before migration begins.

  ## About Hosting Postgres Migrator

  Hosting Postgres Migrator on Railway allows you to run database migrations as a
  service without managing infrastructure. The tool requires PostgreSQL client tools
  (pg_dump/pg_restore) which are included in the Railway PostgreSQL environment.
  Simply configure your source and target database URLs via environment variables, and
   the service handles the entire migration pipeline - from validation and dumping to
  parallel restoration. This is ideal for scheduled migrations, backup operations, or
  one-time database transfers between environments.

  ## Common Use Cases

  - **Database Backups** - Automated scheduled backups from production to backup
  databases
  - **Environment Cloning** - Copy production data to staging/development environments
   for testing
  - **Database Migrations** - Move databases between hosting providers or regions with
   minimal downtime
  - **Data Recovery** - Quick restoration from source database to recovery targets
  - **Multi-tenant Migrations** - Parallel processing for migrating multiple tenant
  databases efficiently

  ## Dependencies for Postgres Migrator Hosting

  - **PostgreSQL Client Tools** - `pg_dump` and `pg_restore` must be available
  (included in Railway PostgreSQL service)
  - **Source PostgreSQL Database** - The database you want to migrate from
  - **Target PostgreSQL Database** - The destination database (must be empty and same
  major version)

  ### Deployment Dependencies

  - [PostgreSQL Official Documentation](https://www.postgresql.org/docs/)
  - [pg_dump Documentation](https://www.postgresql.org/docs/current/app-pgdump.html)
  - [pg_restore 
  Documentation](https://www.postgresql.org/docs/current/app-pgrestore.html)

  ### Implementation Details

  The tool executes:
  1. Validates both database connections and version compatibility
  2. Checks target database is empty (pre-flight validation)
  3. Creates compressed custom-format dump using pg_dump
  4. Restores to target using pg_restore with optional parallel jobs
  5. Cleans up temporary files automatically

  ### Why Deploy Postgres Migrator on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will
  host your infrastructure so you don't have to deal with configuration, while
  allowing you to vertically and horizontally scale it.

  By deploying Postgres Migrator on Railway, you are one step closer to supporting a
  complete full-stack application with minimal burden. Host your servers, databases,
  AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres-migrator | [crisog/postgres-migrator](https://github.com/crisog/postgres-migrator) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NO_ACL` | false | When `true`, skips restoration of access privileges (ACLs), such as GRANT/REVOKE commands for permissions on objects. |
| `NO_OWNER` | false | When `true`, skips restoration of object ownership (e.g., who owns tables/schemas). This omits ALTER OWNER commands in the dump file |
| `PG_VERSION` | - | PostgreSQL major version for client tools (15, 16, or 17). Must match your database version. |
| `PARALLEL_JOBS` | 4 | Number of parallel jobs for restore |
| `VALIDATE_AFTER` | true | Run validation on all tables after migration completes (set to `false` to skip) |
| `SOURCE_DATABASE_URL` | - | Source database connection string |
| `TARGET_DATABASE_URL` | - | Target database connection string |

**Category:** Other · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/template/postgres-migrator)
