# Deploy OpenFGA on Railway

OpenFGA: Zanzibar-style fine-grained auth engine, backed by Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openfga-authorization)

## About

OpenFGA is an open-source authorization engine built on Google's Zanzibar design, the system behind permissions in Docs and Drive. Instead of scattering `if user.isAdmin` checks through your codebase, you declare an authorization model once, store relationships as tuples like `user:anne is owner of document:roadmap`, and ask the server one question at runtime: can this user do this to this object? It is a CNCF project, originally built by the Auth0 team, running in production at Docker, Grafana Labs and Canonical. Teams self-host OpenFGA when permissions outgrow a role column — nested groups, folder inheritance, per-object sharing, multi-tenancy — and want those decisions answered in milliseconds.

This template runs OpenFGA on Railway with a dedicated PostgreSQL database, the shape the project's own production guide recommends. The API service is built from [gridalpha/openfga-railway](https://github.com/gridalpha/openfga-railway), a thin image around the official `openfga/openfga` binary that applies database migrations on every boot, so the schema is created and kept current with no manual step. The server is published on a Railway domain over HTTPS and protected by a pre-shared API key generated at deploy time. PostgreSQL stays on the private network holding every store, model, tuple and changelog entry, and a gRPC listener and Prometheus endpoint run alongside the HTTP API.

![Diagram of the OpenFGA and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788291094/openfga-architecture.png)

Relationship-based access control moves authorization out of application code and into data. You declare types and relations — a `team` has `member`s, a `folder` has `viewer`s, a `document` inherits `viewer` from its parent — then write plain facts about who relates to what. OpenFGA walks that graph, so a user who joins a team immediately reaches everything that team can, and removing them revokes it just as fast. Self-hosting keeps that graph — a precise map of who can see what — in your own infrastructure.

- **Check** answers one yes/no authorization question in a few milliseconds
- **ListObjects** and **ListUsers** run it in reverse: every document a user can view, or every user who can view one
- **Contextual tuples and conditions** evaluate unstored facts like time of day or IP range
- **Immutable model versions** mean a model change never rewrites existing tuples
- **A changelog API** journals every tuple write for audit and cache invalidation
- Both **HTTP/REST** and **gRPC**, plus Prometheus metrics and OpenTelemetry tracing

The architecture is two services. OpenFGA is stateless, so it restarts cleanly and scales to more replicas on demand. PostgreSQL is the system of record, dedicated to OpenFGA so it is tuned independently of your application's own database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| openfga | [gridalpha/openfga-railway](https://github.com/gridalpha/openfga-railway) | TCP service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | openfga | 8080 | HTTP port Railway routes and probes |
| `OPENFGA_LOG_LEVEL` | openfga | info | Log verbosity |
| `OPENFGA_LOG_FORMAT` | openfga | json | Structured logs for Railway |
| `OPENFGA_AUTHN_METHOD` | openfga | preshared | Bearer API key authentication |
| `OPENFGA_DATASTORE_URI` | openfga | - | Private Postgres connection string |
| `OPENFGA_METRICS_ENABLED` | openfga | true | Prometheus endpoint on 2112 |
| `OPENFGA_DATASTORE_ENGINE` | openfga | postgres | Persistent datastore backend |
| `OPENFGA_PLAYGROUND_ENABLED` | openfga | false | Deprecated playground stays off |
| `OPENFGA_AUTHN_PRESHARED_KEYS` | openfga | - | Accepted API keys, comma separated |
| `OPENFGA_DATASTORE_MAX_OPEN_CONNS` | openfga | 40 | Connection pool ceiling |
| `OPENFGA_DATASTORE_MIN_IDLE_CONNS` | openfga | 5 | Idle pool floor, below min open |
| `OPENFGA_DATASTORE_MIN_OPEN_CONNS` | openfga | 10 | Warm connection baseline |
| `OPENFGA_DATASTORE_METRICS_ENABLED` | openfga | true | Database pool metrics |
| `OPENFGA_DATASTORE_CONN_MAX_LIFETIME` | openfga | 1h | Connection recycle interval |
| `OPENFGA_DATASTORE_CONN_MAX_IDLE_TIME` | openfga | 300s | Idle connection reaping delay |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 8081

**Category:** Authentication · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/openfga-authorization)
