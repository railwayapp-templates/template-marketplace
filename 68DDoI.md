# Deploy SonarQube on Railway

Automatic code review tool that helps you deliver Clean Code.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/68DDoI)

## About

SonarQube is designed to run as a containerized service alongside a PostgreSQL database. It offers a powerful web interface for developers and teams to track code quality metrics over time, integrating seamlessly with popular CI/CD pipelines.

On Railway, you can deploy SonarQube and its PostgreSQL backend without worrying about low-level infrastructure setup. This makes it easy to integrate static code analysis into your workflow and enforce quality gates on pull requests or builds.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| sonarqube:lts-community | `sonarqube:lts-community` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `PORT` | sonarqube:lts-community | 9000 | - |
| `SONARQUBE_LOG_LEVEL` | sonarqube:lts-community | INFO | - |
| `SONARQUBE_CE_JAVA_OPTS` | sonarqube:lts-community | -Xmx512m -Xms128m | - |
| `SONARQUBE_ES_JAVA_OPTS` | sonarqube:lts-community | -Xmx512m -Xms128m | - |
| `SONARQUBE_JDBC_PASSWORD` | sonarqube:lts-community | (secret) | - |
| `SONARQUBE_JDBC_USERNAME` | sonarqube:lts-community | (secret) | - |
| `SONARQUBE_WEB_JAVA_OPTS` | sonarqube:lts-community | -Xmx512m -Xms128m | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/sonarqube`

**Category:** Automation

[View on Railway →](https://railway.com/template/68DDoI)
