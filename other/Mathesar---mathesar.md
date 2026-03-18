# Deploy Mathesar on Railway

An intuitive, open-source UI to view, edit, and query Postgres data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mathesar)

## About

Mathesar is an open-source spreadsheet-like web interface that makes working with PostgreSQL databases both simple and powerful. It empowers users of all technical skill levels to view, edit, query, and collaborate on data with a familiar spreadsheet-like interface—no code needed.

The project is 100% open source and maintained by Mathesar Foundation, a 501(c)(3) nonprofit.

This template is also maintained by the Mathesar Foundation.

Deploying Mathesar involves setting up the application alongside a PostgreSQL instance for the Mathesar's internal database. 

Once deployed, additional Postgres databases can be created on the internal Postgres instance. External databases can be connected within the Mathesar UI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mathesar | `mathesar/mathesar:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Mathesar | 8000 | - |
| `DEBUG` | Mathesar | false | - |
| `SECRET_KEY` | Mathesar | (secret) | - |
| `ALLOWED_HOSTS` | Mathesar | - | Django's "Allowed Hosts" setting |
| `POSTGRES_USER` | Mathesar | (secret) | - |
| `WEB_CONCURRENCY` | Mathesar | 3 | Number of sync Gunicorn workers. Adjust to be 2 * $(NUM_PROC) + 1, where NUM_PROC is the number of logical cores on your machine. |
| `OIDC_CONFIG_DICT` | Mathesar | - | Configure SSO. See https://docs.mathesar.org/administration/environment-variables/#oidc_config_dict-optional for details  |
| `FILE_STORAGE_DICT` | Mathesar | - | Configure a file storage backend. See http://localhost:9000/administration/environment-variables/#file_storage_dict-optional for details |
| `POSTGRES_PASSWORD` | Mathesar | (secret) | - |
| `POSTGRES_DB` | Postgres | mathesar | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/mathesar)
