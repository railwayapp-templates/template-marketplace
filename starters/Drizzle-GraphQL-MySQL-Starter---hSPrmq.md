# Deploy Drizzle GraphQL MySQL Starter on Railway

A simple GraphQL API using Drizzle schemas

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hSPrmq)

## About

## Overview

Drizzle ORM is a lightweight, type-safe, and performant TypeScript ORM for SQL databases. It offers a fluent query builder, automatic SQL generation, and seamless integration with popular databases, enabling developers to write efficient and maintainable database interactions with full TypeScript support.

Pair the power of Drizzle schemas with GraphQL to easily access the exact data you need in a standardised format.

This template combines GraphQL, Drizzle and Typescript to make a perfect starter for building APIs, prototyping with GraphQL and early development.

## Highlights

- GraphQL
- Drizzle schemas
- Typescript
- Environment variable setup using dotenv

## Learn More

- [GraphQL](https://graphql.org/)
- [Drizzle](https://orm.drizzle.team/)
- [drizzle-graphql](https://github.com/drizzle-team/drizzle-graphql)
- [Typescript](https://www.typescriptlang.org/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| drizzle-graphql-mysql-starter | [matthewspear/drizzle-graphql-mysql-starter](https://github.com/matthewspear/drizzle-graphql-mysql-starter) | Web service |
| MySQL | `mysql:9` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MYSQLHOST` | - | Railway Private Domain Name. |
| `MYSQLPORT` | 3306 | MySQL port. |
| `MYSQLUSER` | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | (secret) | Root password for MySQL DB. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Starters · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/hSPrmq)
