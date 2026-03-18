# Deploy Scala Play on Railway

A simple Play framework app connected to a Postgres database.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/my9q_q)

## About

# Scala Play Framework Starter

This is a simple Scala [Play framework](https://www.playframework.com) starter app.

Play Framework makes it easy to build web applications with Java & Scala.

Play is based on a lightweight, stateless, web-friendly architecture.

Built on Pekko (Play 3) and Akka (Play 2), Play provides predictable and minimal resource consumption (CPU, memory, threads) for highly-scalable applications.


## ✨ Features

- Play
- Scala
- Postgres

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Scala Play | [railwayapp-templates/scala-play](https://github.com/railwayapp-templates/scala-play) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `APPLICATION_SECRET` | Scala Play | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Scala, HTML

[View on Railway →](https://railway.com/template/my9q_q)
