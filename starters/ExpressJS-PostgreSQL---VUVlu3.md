# Deploy ExpressJS PostgreSQL on Railway

An ExpressJS application connected to a PostgreSQL database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/VUVlu3)

## About

## Overview

Express is a Fast, unopinionated, minimalist web framework for 
Node.js. Express is ideal for web applications and APIs and provides a thin layer of fundamental web application features without obscuring Node.js features that you know and love. 

## Highlights

- Starts an ExpressJS server that connects to a Railway PostgreSQL database

## Learn More

- [GitHub](https://github.com/railwayapp-templates/expressjs-postgres)
- [Express](https://expressjs.com/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| expressjs-postgres | [railwayapp-templates/expressjs-postgres](https://github.com/railwayapp-templates/expressjs-postgres) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Tags:** webserver, typescript · **Languages:** TypeScript, Procfile

[View on Railway →](https://railway.com/deploy/VUVlu3)
