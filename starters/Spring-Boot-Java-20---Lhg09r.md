# Deploy Spring Boot (Java 20) on Railway

A Spring Boot starter for Java 20.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Lhg09r)

## About

This is a simple PostgreSQL-backed todos app as a Spring Boot starter for Java 20. It includes a controller, Thymeleaf templating, a PostgreSQL database, and a static file for styles.

To read more about Spring Boot, visit the (Spring Boot Learn page)[https://spring.io/projects/spring-boot#learn].

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| springboot-java | [aleksrutins/springboot-java](https://github.com/aleksrutins/springboot-java) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | springboot-java | 8080 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Java, CSS, HTML, Dockerfile

[View on Railway →](https://railway.com/template/Lhg09r)
