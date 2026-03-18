# Deploy DbGate on Railway

The Smartest SQL + noSQL Database Client

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/dbgate)

## About

<p align="center">
    <a href="https://dbgate.org/">
        <img style="width: 170px;" src="https://raw.githubusercontent.com/dbgate/dbgate/d79c9e159a04a4944dc317c939137520d6c2197b/app/icon.png" alt="dbgate logo">
    </a>
</p>

<h3 align="center">The Smartest SQL+noSQL Database Client</h3>

<p align="center">Database manager for MySQL, PostgreSQL, SQL Server, MongoDB, SQLite and others</p>

DbGate is cross-platform database manager. It's designed to be simple to use and effective, when working with more databases simultaneously. But there are also many advanced features like schema compare, visual query designer, chart visualisation or batch export and import.

<img src="https://dbgate.org/assets/screenshots/connection.png">

## Supported databases

- MySQL
- PostgreSQL
- SQL Server
- Oracle (experimental)
- MongoDB
- Redis
- SQLite
- Amazon Redshift
- CockroachDB
- MariaDB

## Features

- Table data editing, with SQL change script preview
- Edit table schema, indexes, primary and foreign keys
- Compare and synchronize database structure
- ER diagram
- Light and dark theme
- Master/detail views, foreign key lookups
- Query designer
- Form view for comfortable work with tables with many columns
- JSON view on MongoDB collections
- Explore tables, views, procedures, functions, MongoDB collections
- SQL editor
  - execute SQL script
  - SQL code formatter
  - SQL code completion
  - Add SQL LEFT/INNER/RIGHT join utility
- Mongo JavaScript editor, execute Mongo script (with NodeJs syntax)
- Redis tree view, generate script from keys, run Redis script
- Runs as application for Windows, Linux and Mac. Or in Docker container on server and in web Browser on client.
- Import, export from/to CSV, Excel, JSON, NDJSON, XML
- Free table editor - quick table data editing (cleanup data after import/before export, prototype tables etc.)
- Archives - backup your data in NDJSON files on local filesystem (or on DbGate server, when using web application)
- Charts, export chart to HTML page
- For detailed info, how to run DbGate in docker container, visit [docker hub](https://hub.docker.com/r/dbgate/dbgate)
- Extensible plugin architecture
- Perspectives - nested table view over complex relational data, query designer on MongoDB databases

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| DbGate | `dbgate/dbgate` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LOGINS` | (secret) | Default username, if changing the username, update the `LOGIN_PASSWORD_[username]` variable too |
| `LOGIN_PASSWORD_dbgate` | (secret) | Password for default usernname, auto generated |

## Configuration

- **Healthcheck:** `/?page=login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.dbgate`

**Category:** Other

[View on Railway →](https://railway.com/template/dbgate)
