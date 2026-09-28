# Deploy SQLite on Railway

SQLite (sqlite3) database on a persistent volume with the sqlite-web UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jOiNFt)

## About

SQLite is a serverless database engine: the whole database is one file, and the application opens it directly. This template gives you that file on a persistent Railway volume, initializes it from an SQL script, and puts the `sqlite-web` browser interface in front of it, protected by a generated password, so you can inspect tables, run queries and import or export data from any browser.

![sqlite-web showing the tables of a database with row counts](https://media.charlesleifer.com/blog/photos/sqlite-web-index.png)

The service builds from a small repository: a Python image with `sqlite3` and `sqlite-web`, an `init_db.sql` that creates the schema and sample data on the first boot, and a `seed_db.sql` that runs once whenever its contents change. The database file lives at `/data/database.db`, where the Railway volume is mounted, so it survives redeploys.

`SQLITE_WEB_UI_PASSWORD` is generated at deploy time; copy it from the service variables to log in to the web UI on the service's public domain. `RAILWAY_DEPLOYMENT_OVERLAP_SECONDS` is set to `0` so the old deploy is stopped before the new one starts, which matters here: two containers writing the same SQLite file at once would corrupt it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SQLite3 | [railwayapp-templates/sqlite](https://github.com/railwayapp-templates/sqlite) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SQLITE_WEB_UI_PASSWORD` | (secret) | The password which you'll use to access the WebUI Interface |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** Shell, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/jOiNFt)
