# Deploy fastapi-fullstack-mysql on Railway

One click deploy and Host official full stack FastAPI template with mysql

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fastapi-fullstack-mysql-verify)

## About

Deploy this template to get a FastAPI backend serving a built React frontend on one domain, backed by MySQL 8.4. Railway builds the repo-root Dockerfile, runs Alembic migrations, seeds the first superuser, and passes the `/health` healthcheck before marking the deployment live.

Hosting consists of two Railway services:

* **backend** (Docker, from the repo-root `Dockerfile`) — FastAPI application with the frontend static build served by the same process. It expects these variables: `DATABASE_URL` (auto-wired to the MySQL service as `${{MySQL.MYSQL_URL}}`), `PROJECT_NAME`, `SECRET_KEY`, `FIRST_SUPERUSER`, `FIRST_SUPERUSER_PASSWORD`, and `FRONTEND_HOST` (set it to the generated public domain after the first deploy). Migrations (`alembic upgrade head`) and superuser seeding run at container start; the platform healthchecks `GET /health`.
* **MySQL** (database plugin) — MySQL 8.4 with a persistent volume at `/var/lib/mysql`, exposing `MYSQL_URL` to the project.

You scale by changing the compute plan of each service; data persists on the MySQL volume across deploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| backend | [lNamelessl/fastapi-fullstack-mysql](https://github.com/lNamelessl/fastapi-fullstack-mysql) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | host |
| `MYSQLPORT` | MySQL | - | db port |
| `MYSQLUSER` | MySQL | user | change to desired username |
| `MYSQL_URL` | MySQL | - | db url |
| `MYSQLDATABASE` | MySQL | - | sql db |
| `MYSQLPASSWORD` | MySQL | (secret) | password |
| `MYSQL_DATABASE` | MySQL | - | sql db |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | root user password |
| `SECRET_KEY` | backend | (secret) | change to desired secret key |
| `DATABASE_URL` | backend | - | db url |
| `PROJECT_NAME` | backend | full stack fastapi | change to desired project name |
| `FIRST_SUPERUSER` | backend | user@example.com | change to desired first super user email |
| `FIRST_SUPERUSER_PASSWORD` | backend | (secret) | change to the desired password |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, Python, HTML, CSS, Dockerfile, Shell, Mako

[View on Railway →](https://railway.com/deploy/fastapi-fullstack-mysql-verify)
