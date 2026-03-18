# Deploy Beego on Railway

A simple Beego app connected to a Postgres database.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/CPq9Ry)

## About

# Beego Starter

A Beego (Golang) starter app connected to a Postgres database.

## ✨ Features

- Beego
- Go

## 💁‍♀️ How to run locally

- Run `go mod tidy` to install all the dependencies.
- Run `bee run` to start the app.

## 📝 Notes

- Once the app is run, a `user` table is created and seeded with data. You can find the details in the `main.go` file.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Beego | [railwayapp-templates/beego](https://github.com/railwayapp-templates/beego) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Smarty, Go

[View on Railway →](https://railway.com/deploy/CPq9Ry)
