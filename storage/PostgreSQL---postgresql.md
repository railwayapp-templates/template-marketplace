# Deploy PostgreSQL on Railway

PostgreSQL database service

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresql)

## About

Run PostgreSQL on Railway using a multi-platform image based on the official PostgreSQL image, with managed TLS certificates, safe persistent-volume handling, and automatic certificate renewal.

This template provides a persistent PostgreSQL database with TLS support for both Railway's private network and public TCP Proxy. On first startup, the image creates a private Certificate Authority (CA) and a CA-signed server certificate. The certificate includes Railway's private and public database hostnames, allowing clients to use strict hostname verification. On subsequent deployments, the image validates the certificate chain, keys, expiration, and required hostnames, renewing certificates safely while preserving the CA whenever possible.

The image also validates the Railway volume location, prevents two PostgreSQL processes from using the same volume during overlapping deployments, and refuses to start when the volume contains data from a different PostgreSQL major version.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/ncontiero/postgres-ssl:18.6` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `SSL_REQUIRE` | false | Set to true to reject plaintext TCP database and replication connections. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB. |
| `SSL_CA_CERT_DAYS` | 3650 | Private Certificate Authority validity in days. |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB. |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |
| `RUNTIME_LOCK_WAIT_SECONDS` | 300 | Maximum time to wait for a previous deployment to release the volume. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/postgresql)
