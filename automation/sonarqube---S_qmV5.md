# Deploy sonarqube on Railway

Tool to automatically ensure high code quality, and security

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/S_qmV5)

## About

## SonarQube: Your Partner for Clean Code

SonarQube is a self-managed, automatic code review tool that systematically helps you deliver Clean Code. It seamlessly integrates into your existing workflow, performing continuous code inspections and detecting issues across 30+ programming languages. By embedding SonarQube into your Continuous Integration (CI) pipeline on popular DevOps platforms, you ensure that your code consistently meets high-quality standards.

### Key Features
- **Seamless Integration**: Works with GitHub, GitLab, Jenkins, and more.
- **Quality Gates**: Prevent flawed code from progressing in your pipeline.
- **Robust Analysis**: Over 6,000 security rules for languages like Java, C#, and Python.

### Getting Started
Default login credentials:
- **User**: admin
- **Password**: admin

For more information, visit the [SonarQube Documentation](https://docs.sonarqube.org/) or explore the [SonarSource Website](https://www.sonarsource.com/).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sonarqube | `sonarqube:community` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | sonarqube | 9000 | - |
| `SONAR_LOG_LEVEL` | sonarqube | INFO | - |
| `SONAR_CE_JAVAOPTS` | sonarqube | -Xmx512m -Xms128m | - |
| `SONAR_WEB_JAVAOPTS` | sonarqube | -Xmx512m -Xms128m | - |
| `SONAR_JDBC_PASSWORD` | sonarqube | (secret) | - |
| `SONAR_JDBC_USERNAME` | sonarqube | (secret) | - |
| `SONAR_SEARCH_JAVAOPTS` | sonarqube | -Xmx512m -Xms128m | - |
| `SONAR_ES_BOOTSTRAP_CHECKS_DISABLE` | sonarqube | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/template/S_qmV5)
