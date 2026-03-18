# Deploy EdgeDB with separate PostgreSQL on Railway

EdgeDB template to connect to a managed Railway PostgreSQL instance

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/6AT4wH)

## About

Refer to the [Official EdgeDB Docker Deployment Guide](https://www.edgedb.com/docs/guides/deployment/docker). This template follows that guide as closely as possible.

This template expects there to already be a running PostgreSQL instance in the project. Retrieve its connection url in URI format, and paste that as the environment variable for `EDGEDB_SERVER_BACKEND_DSN`.

This template also expects a password to be set in the field `EDGEDB_SERVER_PASSWORD`. For this value, set the password to be exactly the same as the PostgreSQL instance.

There are a few additional environment variables that you can configure:
- Admin UI is turned on

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| edgedb | `edgedb/edgedb` | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5656 | Railway required variable to expose port |
| `EDGEDB_SERVER_ADMIN_UI` | enabled | Web Admin UI |
| `EDGEDB_SERVER_PASSWORD` | (secret) | Set this to the PostgreSQL password |
| `EDGEDB_SERVER_BACKEND_DSN` | - | PostgreSQL connection string in URI format |
| `EDGEDB_SERVER_TLS_CERT_MODE` | generate_self_signed | Recommended setting by EdgeDB |

## Configuration

- **TCP Proxies:** 5656

**Category:** Storage

[View on Railway →](https://railway.com/template/6AT4wH)
