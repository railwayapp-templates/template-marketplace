# Deploy hello-serverpod on Railway

Simple hello world app using Serverpod, Flutter, and Dart

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/SJzxFe)

## About

# Hello Serverpod

Simple hello world app using Serverpod, Flutter, and Dart

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/SJzxFe?referralCode=androidquartz)

## Original Blog Post on Railway

[Deploying a Dart app in Railway](https://blog.railway.com/p/deploy-a-dart-app-part-1)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hello-serverpod | [Andrew-Bekhiet/hello_serverpod](https://github.com/Andrew-Bekhiet/hello_serverpod) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| hello-serverpod-proxy | [Andrew-Bekhiet/serverpod-caddy-reverse-proxy](https://github.com/Andrew-Bekhiet/serverpod-caddy-reverse-proxy) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SERVERPOD_DATABASE_PORT` | hello-serverpod | 5432 | - |
| `SERVERPOD_DATABASE_USER` | hello-serverpod | (secret) | - |
| `SERVERPOD_DATABASE_PASSWORD` | hello-serverpod | (secret) | - |
| `SERVERPOD_DATABASE_REQUIRE_SSL` | hello-serverpod | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `BACKEND_PORT` | hello-serverpod-proxy | 8080 | - |
| `FRONTEND_PORT` | hello-serverpod-proxy | 8082 | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** C++, CMake, Dart, PLpgSQL, Swift, C, HTML, Dockerfile, Kotlin, Objective-C, Shell

[View on Railway →](https://railway.com/template/SJzxFe)
