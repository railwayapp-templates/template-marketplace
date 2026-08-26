# Deploy PgAdmin on Railway

Web app for managing PostgreSQL databases and running SQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgadmin-console)

## About

pgAdmin is the official administration console for PostgreSQL, maintained by the community that builds the database. It puts an object explorer, a SQL editor with result grids, live dashboards, and backup, restore and ERD tooling behind a browser tab, so a team can inspect schemas, tune queries and grant roles without a desktop client on every laptop. Self-host pgAdmin when your databases sit on a private network, or when saved connections and query history should be shared by URL rather than trapped on one machine.

Deploy pgAdmin on Railway and you get more than one container. The template provisions pgAdmin next to a managed PostgreSQL server, creates a `pgadmin` database on it for pgAdmin's own configuration, and registers that server in the browser tree before you log in. A volume at `/var/lib/pgadmin` keeps the session store and per-user files. The first screen after sign-in is a working server, not an empty "Add New Server" dialog.

![Diagram of the pgAdmin and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787626340/pgadmin-architecture.png)

pgAdmin is a Python web application: Flask behind gunicorn, serving a React front end. Every database connection opens server-side from the container, which is what makes it useful on Railway — PostgreSQL services stay on the private network with no public port, while pgAdmin is the only thing exposed, behind its own login.

Key capabilities:

- Object explorer for databases, schemas, tables, views, functions and roles, with property panels and generated DDL for each
- Query Tool with autocompletion, explain plans, history and CSV export
- Live dashboards for sessions, transactions, tuple activity and block I/O
- Backup, restore, import/export and maintenance (VACUUM, ANALYZE) from the UI

Two services make this up. **pgAdmin** is the web console, holding the volume and the public domain. **Postgres** plays two roles: pgAdmin's configuration store, and a real database you can use immediately. Register more servers afterwards — other PostgreSQL services in the project resolve by internal hostname.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgadmin | [gridalpha/pgadmin-railway](https://github.com/gridalpha/pgadmin-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | pgadmin | 8080 | HTTP port pgAdmin listens on |
| `PGADMIN_DATABASE_URL` | pgadmin | - | Configuration database and pre-registered server |
| `PGADMIN_DEFAULT_EMAIL` | pgadmin | admin@example.dev | First administrator login |
| `PGADMIN_DEFAULT_PASSWORD` | pgadmin | (secret) | First administrator password |
| `PGADMIN_CONFIG_PROXY_X_FOR_COUNT` | pgadmin | 2 | Proxy hops trusted for client IP |
| `PGADMIN_CONFIG_MAX_LOGIN_ATTEMPTS` | pgadmin | (secret) | Failed logins before account lockout |
| `PGADMIN_CONFIG_SESSION_COOKIE_SECURE` | pgadmin | True | Session cookie is HTTPS-only |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/pgadmin`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/pgadmin-console)
