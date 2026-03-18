# Deploy Drupal on Railway

Deploy Drupal, an open source content management platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/OmuxnN)

## About

## Overview
This template uses the Drupal [https://github.com/docker-library/drupal](docker image) mantained by the docker community, not the Drupal team itself.

## Configuration
By default, the version of Drupal deployed is Drupal 10, served through PHP version 8.2. This can be overriden by updating the `Root Directory` in the service's `General` settings.

It is currently set to the path to the `Dockerfile` satisfying the above versions of Drupal and PHP `/10.0/php8.2/apache-bookworm`, though this can be updated to point to any other `Dockerfile` in the repository that contains the you require.

## Database
Drupal supports multiple database services, namely MySQL, MariaDB, Percona Server, PostgreSQL and SQLite (see the [docs](https://www.drupal.org/docs/getting-started/system-requirements/database-server-requirements) for more information). This template is set up to deploy a PostgreSQL database for ease of deployment, but this can be replaced with whichever is needed.

Drupal requires the `pg_trgm` PostgreSQL plugin. In order to install this, run the following command in the PostgreSQL shell in the `Query` tab of the databse service:

```sql
CREATE EXTENSION pg_trgm;
```

## Deploy
No further configuration is required, after starting the service, and installing the PostgreSQL plugin, navigate to the project's public url to start configuring your Drupal site 😊

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| drupal | [docker-library/drupal](https://github.com/docker-library/drupal) (root: /10.0/php8.2/apache-bookworm) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | drupal | 80 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/OmuxnN)
