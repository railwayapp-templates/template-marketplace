# Deploy HTMX+Spring+Thymeleaf+MySQL on Railway

HTMX + Spring + Thymeleaf + MySQL. Full-stack server-rendered app.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/htmxspringthymeleafmysql)

## About

**HTMX + Spring Boot + Thymeleaf + MySQL** is a server-rendered full-stack setup: Spring Boot serves HTML with Thymeleaf, HTMX updates fragments without a heavy SPA, and MySQL stores data through JPA. You ship one JVM service in Docker; Flyway runs SQL migrations at startup. Tailwind and HTMX load from a CDN, so there is no separate frontend build pipeline.

Hosting means running a **multi-stage Dockerfile** (Maven build, slim JRE runtime) as a **web** service and adding Railway’s **MySQL** plugin. The app expects **`DATABASE_URL`** as a **`mysql://user:pass@host:3306/database`** string; on Railway, set **`DATABASE_URL="${{MySQL.MYSQL_URL}}"`** on the web service so it uses the plugin’s private-network URL. **`RailwayDataSourceConfig`** parses that URL into a HikariCP **`jdbc:mysql://`** datasource and enables SSL for non-local hosts. **Flyway** applies migrations (for example `V1__todos.sql`) before the app accepts traffic. Configure the service health check to **`GET /health`**, which returns JSON and verifies the database. **`PORT`** defaults to **`8080`**. Thymeleaf templates and HTMX attributes live in the repo; no Node bundler is required for the demo UI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| web | [atoolz/railway-htmx-java-spring-thymeleaf-mysql](https://github.com/atoolz/railway-htmx-java-spring-thymeleaf-mysql) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MYSQLHOST` | - | private hostname on Railway’s internal network for other services in the project |
| `MYSQLPORT` | - | leave empty for default 3306, or set an explicit port |
| `MYSQLUSER` | - | database login (often root); align with your image/plugin bootstrap user |
| `MYSQL_URL` | - | in-cluster mysql:// URL; web service uses ${{MySQL.MYSQL_URL}} as DATABASE_URL |
| `MYSQLDATABASE` | - | plugin-style alias for the database name (no underscore) |
| `MYSQLPASSWORD` | (secret) | password for MYSQLUSER (typically the same as root in one-click templates) |
| `MYSQL_DATABASE` | - | logical database/schema name created on first init |
| `MYSQL_PUBLIC_URL` | - | mysql:// via Railway TCP proxy for clients outside the private network |
| `MYSQL_ROOT_PASSWORD` | (secret) | generated secret at provision; never commit real values to git |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/health`

**Category:** Starters · **Languages:** Java, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/htmxspringthymeleafmysql)
