# Deploy railway-postgres-migration on Railway

Deploy and Host railway-postgres-migration with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railway-postgres-migration)

## About

**railway-postgres-migration** is a lightweight, containerized utility designed to move data between PostgreSQL instances. By leveraging a direct shell pipe between `pg_dump` and `psql`, it streams your entire database from a source to a target URL without creating intermediate files, making it an ideal "one-shot" tool for Railway users.

Hosting this utility on Railway involves deploying the Dockerfile as a standalone service. Instead of a long-running web app, this service acts as a **task runner**. You provide the connection strings via environment variables, and the container executes the migration immediately upon startup. Because both the source and target are often within the same Railway ecosystem, the transfer happens over high-speed networking.

-----

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-postgres-migration | [iqbalexperience/railway-postgres-migration](https://github.com/iqbalexperience/railway-postgres-migration) | Worker |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `SOURCE_DATABASE_URL` | ${{Postgres.DATABASE_URL}}  Add reference variable of source postgres |
| `TARGET_DATABASE_URL` | ${{Postgres2.DATABASE_URL}}  Add reference variable of destination postgres |

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/railway-postgres-migration)
