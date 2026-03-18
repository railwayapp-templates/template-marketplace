# Deploy Chamber - a SecretOps service on Railway

Chamber is a web service for containing secrets.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/VS9MIg)

## About

The easiest way to use Chamber is with `chamber-cli` which you can install with the following command (requires Rust and Cargo to be installed):
`cargo install chamber-cli`

Then you can use `chamber` to see all the commands!

The service will start out in the "sealed" state. You can unseal it by going to the logs, finding the root key and then use `chamber unseal` followed by the root key. You can rotate the root key and cryptographic key used by using `chamber upload`, which will take the `chamber.bin` file used in the current directory.

Check out the GitHub repo for more info: https://github.com/joshua-mo-143/chamber

This service is currently a work in progress. If you're using this in production, no API stability garuantees can currently be made although most work from the release onwards should be primarily

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| chamber | [https://www.github.com/joshua-mo-143/chamber](https://www.github.com/joshua-mo-143/chamber) (root: /chamber-server) | Web service |

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
- **Volume:** `/`

**Category:** Other · **Languages:** Rust, Dockerfile, Makefile

[View on Railway →](https://railway.com/template/VS9MIg)
