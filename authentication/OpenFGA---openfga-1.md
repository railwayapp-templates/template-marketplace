# Deploy OpenFGA on Railway

OpenFGA 1.21 Zanzibar-style authorization server with Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openfga-1)

## About

OpenFGA is a CNCF fine-grained authorization server inspired by Google Zanzibar. You model users, objects and relations in a small DSL, write relationship tuples, and ask OpenFGA whether a user can perform an action. SDKs for Go, Node.js, Python, Java and .NET call its HTTP or gRPC API.

This template deploys OpenFGA v1.21.0 with a Railway Postgres datastore. Database migrations run automatically as a Railway pre-deploy command before each deployment, so upgrades are one step. Every API request needs the preshared key generated at deploy time, sent as a bearer token. The HTTP API is on the public domain, and HTTP and gRPC also listen on the private network over IPv4 and IPv6. The Playground UI is disabled because it cannot be used with key authentication. OpenFGA is stateless and light, so the Hobby plan is enough. Back up Postgres regularly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openfga | `openfga/openfga:v1.21.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | openfga | 8080 |
| `OPENFGA_GRPC_ADDR` | openfga | [::]:8081 |
| `OPENFGA_HTTP_ADDR` | openfga | [::]:8080 |
| `OPENFGA_LOG_FORMAT` | openfga | json |
| `OPENFGA_AUTHN_METHOD` | openfga | preshared |
| `OPENFGA_DATASTORE_ENGINE` | openfga | postgres |
| `OPENFGA_PLAYGROUND_ENABLED` | openfga | false |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `/openfga run`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/openfga-1)
