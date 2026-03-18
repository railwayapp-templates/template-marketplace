# Deploy undb on Railway

secure, no-code, SQLite platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/tEWVpP)

## About

# UNDB

undb is a next-generation, SQLite-based no-code platform enabling developers and businesses to create secure no-code applications. It offers a developer-friendly, privacy-first environment with type-safe APIs, binary packaging, and BaaS capabilities, catering to developers, small businesses, enterprises, and educators seeking to build robust applications with minimal friction and full data control.

# Usage Guide

## First Login

This template has user registration enabled by default allowing you to register your account. After you've registered your account I'd recommend disabling user registration by setting `UNDB_DISABLE_REGISTRATION` to `false` in the service variables. That is unless you do want people to have the ability to register accounts on your undb deployment.

## Email Authentication

Email authentication is disabled by default to allow for quick sign-up, if you need email authentication then you'll need to configure that with `maildev` by specifying the following variables:
- `UNDB_MAIL_HOST=maildev`
- `UNDB_MAIL_PORT=1025`
- `UNDB_VERIFY_EMAIL=true`

# Documentation

For more documentation about how undb works and how to use it, please see:
- [undb github](https://github.com/undb-io/undb)
- [undb docs](https://docs.undb.io)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| undb | `ghcr.io/undb-io/undb:latest` | Web service |
| libSQL | `ghcr.io/tursodatabase/libsql-server:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | undb | 3721 | - |
| `TINI_SUBREAPER` | undb | true | - |
| `UNDB_ADMIN_EMAIL` | undb | - | Your admin account email |
| `UNDB_DB_PROVIDER` | undb | turso | - |
| `UNDB_ADMIN_PASSWORD` | undb | (secret) | Your admin account password |
| `UNDB_DISABLE_REGISTRATION` | undb | false | - |
| `SQLD_PUBLIC_PORT` | libSQL | 443 | - |
| `SQLD_PRIVATE_PORT` | libSQL | 8080 | - |

## Configuration

- **Healthcheck:** `/healthy`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`
- **Volume:** `/var/lib/sqld`

**Category:** CMS

[View on Railway →](https://railway.com/template/tEWVpP)
