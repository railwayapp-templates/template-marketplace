# Deploy libSQL Server on Railway

libSQL is SQLite for modern applications

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/p121Tx)

## About

<p align="center">
    <a href="https://turso.tech/libsql">
        <img style="border-radius: 5px; width: 500px;" src="https://github.com/libsql/libsql.github.io/blob/main/images/libsql-1200x630.png?raw=true" alt="libsql logo">
    </a>
</p>

<h3 align="center">libSQL Server - A server mode for libSQL</h3>

The `sqld` ("SQL daemon") project is a server mode for [libSQL](https://github.com/tursodatabase/libsql)

**Note:** This template does not come with any authentication enabled by default, to set up authentication see [their documentation](https://github.com/tursodatabase/libsql/blob/main/docs/DOCKER.md#sqld_http_auth). If you plan to leave the database without authentication please remove the public domain from the service.

### Developers love libSQL

**Build on the most deployed database in the world**

SQLite is the most deployed database in the world because it's the simplest to write, test and deploy. libSQL, the open contribution fork of SQLite, builds on that foundation while preserving all the benefits developers love.

**Develop, test and deploy with the same database**

Unlike Postgres and MySQL, a SQLite database is just a file. That means local testing is fast and doesn't depend on spawning containers or services. libSQL adds an HTTP mode that lets you take the code you just tested straight into production.

**Run locally or over the network**

libSQL comes with a server mode, libsql-server, and because of other powerful native features like replication, embedded replicas, multi tenancy and edge nodes in every major geo in the world, that means you can write locally and deploy wherever you like.

### Features

- SQLite dialect layered on top of HTTP.

- SQLite-compatible API that you can drop-in with LD_PRELOAD in your application to switch from local database to a remote database.

- Read replica support.

- Integration with mvSQLite for high availability and fault tolerance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| libSQL | `ghcr.io/tursodatabase/libsql-server:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | - | The port that libSQL runs on |
| `SQLD_PUBLIC_URL` | - | Public URL |
| `SQLD_PRIVATE_URL` | - | Private URL |
| `SQLD_PUBLIC_HOST` | - | Public hostname |
| `SQLD_PUBLIC_PORT` | 443 | Public port |
| `SQLD_PRIVATE_HOST` | - | Private hostname |
| `SQLD_PRIVATE_PORT` | 8080 | Private port |
| `SQLD_HTTP_LISTEN_ADDR` | - | The address to listen on |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/sqld`

**Category:** Other

[View on Railway →](https://railway.com/template/p121Tx)
