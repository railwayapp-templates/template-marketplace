# Deploy OpenFGA on Railway

Deploy and host OpenFGA with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openfga)

## About

is a scalable open source authorization system for developers that allows implementing authorization for any kind of application and smoothly evolve as complexity increases over time. It is owned by the [Cloud Native Computing Foundation](https://cncf.io)

[OpenFGA](https://openfga.dev) is a high performance and flexible authorization/permission engine built for developers and inspired by Google Zanzibar. It incorporates powerful Relationship-Based Access Control (ReBAC) and Attribute Based Access Control (ABAC) concepts with a domain-specific language that makes it easy to craft authorization and permission solutions that can grow and evolve to any use case, at any scale.

It is owned by the [Cloud Native Computing Foundation](https://cncf.io).

This template runs a single instance of OpenFGA and Postgres. When the OpenFGA container, it runs the `openfga migrate` command first. This approach does not work if you run multiple OpenFGA nodes. If that's the case, you'll need to manually run `openfga migrate` whenever you update to a new OpenFGA version.

OpenFGA is configured with a [pre-shared key](https://openfga.dev/docs/getting-started/setup-openfga/configure-openfga#pre-shared-key-authentication) that you need to specify in the `OPENFGA_AUTHN_PRESHARED_KEYS` variable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| OpenFGA | `openfga/openfga` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `OPENFGA_AUTHN_METHOD` | OpenFGA | preshared | - |
| `OPENFGA_DATASTORE_ENGINE` | OpenFGA | postgres | - |
| `OPENFGA_PLAYGROUND_ENABLED` | OpenFGA | false | - |
| `OPENFGA_AUTHN_PRESHARED_KEYS` | OpenFGA | - | Key used to authenticate OpenFGA calls, should be treated as a secret |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `./openfga run`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/openfga)
