# Deploy pgweb | Postgres UI on Railway

View and query your Postgres instance with a sleek and minimalistic UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/sZ09XT)

## About

Features
========

### Cross-platform

Pgweb runs on OSX, Linux and Windows operating systems without a hustle. Binaries are cross-complied with Go and available for 32/64 bit systems. You can even run it on RaspberryPi

### Easy to Install

Pgweb comes as a single binary file that's ready to go. You can install it manually, via Docker or using Homebrew on OSX which is updated regularly and is super convenient.

### Zero Dependencies

No need to install anything on your machines or services. Just download and run. To get started Pgweb just needs a browser and a PostgreSQL server to connect to.

### PostgreSQL 9.1+

Most versions of PostgreSQL are supported, starting with official support for 9.1. Older versions could also be compatible but not guaranteed.

### Simple and Clean

Pgweb was designed to be very simple and clean UI to browse database tables or run and analyze SQL queries. Export query results or table rows to CSV/JSON/XML. Multiple schemas are supported. Records query history.

### Flexible Sessions

Pgweb can work with any local or remote PostgreSQL server (Heroku supported) as well as any server behind a firewall by using native SSH tunnelling with passwords or ssh keys. Quick-connect with server bookmarks.

## Instructions for use
---
Simple one click install. Does not come with a predefined database so you can easily import into an existing project.

Add your database URL and you're good to go!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgweb | `sosedoff/pgweb` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8081 | - |
| `PGWEB_DATABASE_URL` | - | Required for this to work. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/template/sZ09XT)
