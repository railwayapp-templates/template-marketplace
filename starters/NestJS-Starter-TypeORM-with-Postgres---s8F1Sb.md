# Deploy NestJS Starter TypeORM with Postgres on Railway

Starter for API Rest or microservice with NestJS and TypeORM with postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/s8F1Sb)

## About

NestJS is a progressive Node.js framework for creating efficient, reliable and scalable server-side applications, which is built and fully compatible with TypeScript and JavaScript, combining elements of object-oriented programming, functional programming and functional reactive programming.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| nestjs-starter-typeorm | [rudemex/nestjs-starter-typeorm](https://github.com/rudemex/nestjs-starter-typeorm) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | nestjs-starter-typeorm | 8080 | - |
| `CONTEXT` | nestjs-starter-typeorm | v1 | - |
| `ORIGINS` | nestjs-starter-typeorm | http://localhost:3000,http://localhost:8080 | - |
| `TEST_KEY` | nestjs-starter-typeorm | testKeyEnv-example | - |
| `APP_STAGE` | nestjs-starter-typeorm | prod | - |
| `API_PREFIX` | nestjs-starter-typeorm | TD_MY_API | - |
| `CORS_ENABLED` | nestjs-starter-typeorm | true | - |
| `SWAGGER_PATH` | nestjs-starter-typeorm | docs | - |
| `DATABASE_TYPE` | nestjs-starter-typeorm | postgres | - |
| `ALLOWED_HEADERS` | nestjs-starter-typeorm | Content-Type,Authorization,Set-Cookie,Access-Control-Allow-Origin,Cache-Control,Pragma | - |
| `ALLOWED_METHODS` | nestjs-starter-typeorm | GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS | - |
| `SWAGGER_ENABLED` | nestjs-starter-typeorm | true | - |
| `CORS_CREDENTIALS` | nestjs-starter-typeorm | (secret) | - |
| `DATABASE_DB_SYNC` | nestjs-starter-typeorm | true | - |
| `TRACING_ENDPOINT` | nestjs-starter-typeorm | http://localhost:4318/v1/traces | - |
| `DATABASE_PASSWORD` | nestjs-starter-typeorm | (secret) | - |
| `DATABASE_USERNAME` | nestjs-starter-typeorm | (secret) | - |
| `PROPAGATE_HEADERS` | nestjs-starter-typeorm | x-custom-header | - |
| `RICK_AND_MORTY_API_URL` | nestjs-starter-typeorm | https://rickandmortyapi.com/api | - |
| `DATABASE_DB_AUTO_LOAD_ENTITIES` | nestjs-starter-typeorm | true | - |
| `RICK_AND_MORTY_API_URL_LIVENESS` | nestjs-starter-typeorm | /api/character/1 | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `v1/health/liveness`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/s8F1Sb)
