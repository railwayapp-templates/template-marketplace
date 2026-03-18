# Deploy onepixel on Railway

API for URL shortener writtein in Golang

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/xAJ1-J)

## About

API for URL shortener writtein in Golang

This can shorten URLs and given short URL, the API can tell the long URL. 

Supports user signup with passwords.

Backend is written in Golang using Go Fiber

https://github.com/championswimmer/onepixel_backend 

For more details get in touch 
https://twitter.com/championswimmer

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| onepixel_backend | [championswimmer/onepixel_backend](https://github.com/championswimmer/onepixel_backend) | Web service |

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
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Go, HTML, Makefile, Dockerfile, CSS, JavaScript

[View on Railway →](https://railway.com/template/xAJ1-J)
