# Deploy NestJS Starter TypeORM with MySQL on Railway

Starter for API Rest or microservice with NestJS and TypeORM with MySQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/TdPsDz)

## About

NestJS is a progressive Node.js framework for creating efficient, reliable and scalable server-side applications, which is built and fully compatible with TypeScript and JavaScript, combining elements of object-oriented programming, functional programming and functional reactive programming.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:5.7` | Database |
| PhpMyAdmin | `phpmyadmin/phpmyadmin:latest` | Web service |
| nestjs-starter-typeorm | [rudemex/nestjs-starter-typeorm](https://github.com/rudemex/nestjs-starter-typeorm) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `PORT` | PhpMyAdmin | 80 | - |
| `PMA_HOST` | PhpMyAdmin | - | Hostname or IP address of the database server to use. |
| `PMA_PORT` | PhpMyAdmin | - | Port of the database server to use. |
| `PMA_USER` | PhpMyAdmin | (secret) | Username to use for Config authentication mode. |
| `PMA_PMADB` | PhpMyAdmin | - | Name of the database to be used for the “phpMyAdmin configuration storage” database. |
| `PMA_PASSWORD` | PhpMyAdmin | (secret) | Password to use for Config authentication mode. |
| `PMA_ARBITRARY` | PhpMyAdmin | 1 | Allows you to enter a database server hostname on login form. |
| `MYSQL_ROOT_PASSWORD` | PhpMyAdmin | (secret) | - |
| `PORT` | nestjs-starter-typeorm | 8080 | - |
| `CONTEXT` | nestjs-starter-typeorm | v1 | - |
| `ORIGINS` | nestjs-starter-typeorm | http://localhost:3000,http://localhost:8080 | - |
| `TEST_KEY` | nestjs-starter-typeorm | testKeyEnv-example | - |
| `APP_STAGE` | nestjs-starter-typeorm | prod | - |
| `API_PREFIX` | nestjs-starter-typeorm | TD_MY_API | - |
| `CORS_ENABLED` | nestjs-starter-typeorm | true | - |
| `SWAGGER_PATH` | nestjs-starter-typeorm | docs | - |
| `DATABASE_TYPE` | nestjs-starter-typeorm | mysql | - |
| `ALLOWED_HEADERS` | nestjs-starter-typeorm | Content-Type,Authorization,Set-Cookie,Access-Control-Allow-Origin,Cache-Control,Pragma | - |
| `ALLOWED_METHODS` | nestjs-starter-typeorm | GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS | - |
| `SWAGGER_ENABLED` | nestjs-starter-typeorm | true | - |
| `CORS_CREDENTIALS` | nestjs-starter-typeorm | (secret) | - |
| `DATABASE_DB_SYNC` | nestjs-starter-typeorm | true | - |
| `TRACING_ENDPOINT` | nestjs-starter-typeorm | http://localhost:4318/v1/traces | - |
| `DATABASE_PASSWORD` | nestjs-starter-typeorm | (secret) | - |
| `DATABASE_USERNAME` | nestjs-starter-typeorm | (secret) | - |
| `PROPAGATE_HEADERS` | nestjs-starter-typeorm | x-custom-header | - |
| `DATABASE_INSECURE_AUTH` | nestjs-starter-typeorm | true | - |
| `RICK_AND_MORTY_API_URL` | nestjs-starter-typeorm | https://rickandmortyapi.com/api | - |
| `DATABASE_DB_AUTO_LOAD_ENTITIES` | nestjs-starter-typeorm | true | - |
| `RICK_AND_MORTY_API_URL_LIVENESS` | nestjs-starter-typeorm | /api/character/1 | - |

## Configuration

- **TCP Proxies:** 3306
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `v1/health/liveness`

**Category:** Other · **Languages:** TypeScript, Dockerfile, JavaScript

[View on Railway →](https://railway.com/template/TdPsDz)
