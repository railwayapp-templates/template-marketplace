# Deploy Function Database Migrator - Postgres  on Railway

Migrate your postgres database from point A to point B using functions

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/function-database-mi)

## About

Hosting Function Database Migrator - Postgres on Railway allows you to trigger database migrations via a Railway Function with minimal setup. The function connects to the source PostgreSQL instance, reads all public tables and their data, creates the necessary tables in the destination database (if they don’t exist), and transfers all rows with basic column structure preservation. All data is inserted as text for simplicity and compatibility. Railway handles the infrastructure, so you're free to focus on your schema, not your servers.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres DB Migrator | `ghcr.io/railwayapp/function-bun:1.2.10` | Worker |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `SOURCE_POSTGRES_CONNECTION_STRING` | The database conection string of the original postgres database |
| `DESTINATION_POSTGRES_CONNECTION_STRING` | The database connection string of where you want to move the contents of the source db to |

## Configuration

- **Start command:** `./run.sh Ly8gaW5kZXgudHN4IChCdW4gcnVudGltZSkK`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/function-database-mi)
