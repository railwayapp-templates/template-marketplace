# Deploy Bytebase on Railway

Change, Query, Secure, Govern all databases in a single place

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/_ce3VS)

## About

<p align="center">
    <a href="https://bytebase.com?source=railway">
        <img style="border-radius: 10px; width: 700px;" src="https://raw.githubusercontent.com/bytebase/bytebase/main/docs/assets/banner.webp" alt="bytebase logo">
    </a>
</p>

<p align="center">
  <b> Different </b> database development tasks
</p>

<p align="center">
  <b> Multiple </b> database systems
</p>

<p align="center">
  <b> Unified </b> process
</p>

<p align="center">
  <b> Single </b> tool
</p>

<p align="center">The GitLab/GitHub for database DevOps. World's most advanced database DevOps and CI/CD for Developer, DBA and Platform Engineering teams.</p>

### Overview

Bytebase is a database schema change and version control management tool for teams. It consists of a web console and a backend. The backend has a migration core to manage database schema changes. It also integrates with VCS to enable version controlled schema management.

Bytebase is the middleware sitting between you and your database. It's the GitLab/GitHub for Database DevOps, built for developers, DBAs and platform engineers. As GitLab/GitHub provides a GUI and collaboration workspace for teams to manage code, Bytebase does the similar job for managing databases.

<img style="border-radius: 5px;" src="https://raw.githubusercontent.com/bytebase/bytebase/main/docs/assets/change-query-secure-govern.webp">

## Key Features

[SQL Review](https://www.bytebase.com/docs/sql-review/overview/)

Bytebase analyzes SQL changes to enforce rules in compliance with your organization's policy. The enforcement includes naming conventions, anti-SQL pattern detection and etc. Prod and non-prod environments can also enforce different rules respectively.

[Database CI/CD and Change Automation](https://www.bytebase.com/docs/change-database/change-workflow/)

Like code review, Bytebase streamlines the database change process. Within a single workflow, a database change can be reviewed and deployed from the dev environment all the way to the production environment.

[GitOps (Database-as-Code)](https://www.bytebase.com/docs/vcs-integration/overview/)

Bytebase keeps the complete schema change history. It also integrates with VCS systems. Teams can manage the SQL migration scripts in the VCS and trigger schema deployment on code commit.

[Batch Change and Query](https://www.bytebase.com/docs/change-database/batch-change/)

Bytebase allows you to change a collection of databases in a single workflow. It also allows you to issue
a single query against multiple databases.

[SQL Editor](https://www.bytebase.com/docs/sql-editor/overview/)

A web-based SQL Editor to query and export data. DBAs no longer need to give away sensitive database credentials when developers need to access the data.

[Dynamic Data Masking](https://www.bytebase.com/docs/security/data-masking/overview/)

Bytebase provides multi-level masking policy with workflow to grant unmasked data access.

[Data Access Control](https://www.bytebase.com/docs/security/data-query/)

Bytebase provides a suite of features to enable organizations to enforce data security policies, avoid data leaks and conform compliance.

[Data Rollback](https://www.bytebase.com/docs/change-database/rollback-data-changes/)

- Statement-level rollback

- Database-level manual and periodical backup and restore

- Point-in-time recovery (PITR)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bytebase | `bytebase/bytebase:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c "exec bytebase --port $PORT --disable-sample --external-url $BYTEBASE_EXTERNAL_URL"`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/opt/bytebase`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/_ce3VS)
