# Deploy cloudbeaver on Railway

CloudBeaver 26.2: web database manager for Postgres, MySQL and 100+ more.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cloudbeaver-1)

## About

CloudBeaver is the web edition of DBeaver, the popular database tool. It lets you browse schemas, edit rows, run SQL with autocomplete and export results from a browser. It connects to PostgreSQL, MySQL, MariaDB, SQLite, ClickHouse and many other databases through JDBC drivers that ship with it.

This template runs the official `dbeaver/cloudbeaver:26.2.1` image as one service. The setup wizard is skipped: an administrator named `cbadmin` is created on first boot with a generated password, and anonymous access is switched off, so the public URL shows a login page. The workspace, including saved connections and settings, lives on a Railway volume and survives redeploys. Databases in the same Railway project are reachable by their private hostnames, for example `postgres.railway.internal`. The Java server needs roughly 700 MB of memory. The admin password in the variables only applies on the first boot; change it later in the admin panel.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cloudbeaver | `dbeaver/cloudbeaver:26.2.1` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8978 |
| `CB_ADMIN_NAME` | cbadmin |
| `CB_SERVER_NAME` | CloudBeaver |
| `CB_ADMIN_PASSWORD` | (secret) |
| `CLOUDBEAVER_APP_ANONYMOUS_ACCESS_ENABLED` | false |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/cloudbeaver/workspace`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/cloudbeaver-1)
