# Deploy spring-boot-railway-template on Railway

The Java starter that deploys: Spring Boot 4.1 + Postgres in one click

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/spring-boot-railway-template)

## About

Deploying provisions two services: the Spring Boot `app` (built from the linked GitHub repo with
Docker) and a `Postgres` database with persistent storage. The first build runs a full Maven
build, so expect roughly 3–5 minutes before the healthcheck goes green; subsequent deploys are
faster thanks to Docker layer caching. Hosting cost scales with usage — a typical small instance
runs the JVM at 0.5–1 GB of RAM, which lands around **$5–10/month including the Postgres
service**. After deploy, Railway assigns a public domain; open it to see the app metadata JSON,
then try `curl https://YOUR-DOMAIN/api/todos`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| app | [lNamelessl/spring-boot-railway-template](https://github.com/lNamelessl/spring-boot-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/actuator/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Java, Dockerfile

[View on Railway →](https://railway.com/deploy/spring-boot-railway-template)
