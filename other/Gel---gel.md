# Deploy Gel on Railway

Deploy Gel, the open-source graph-relational database, on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gel)

## About

Gel is an open-source graph-relational database that sits on top of PostgreSQL and replaces tables, foreign keys and join syntax with object types and typed links. You describe your data as a schema of types and the links between them, then query it with EdgeQL, which returns nested JSON-shaped results in one round trip instead of the join-and-reassemble dance an ORM performs. It ships schema migrations, a web admin UI, GraphQL and HTTP endpoints, and client libraries for TypeScript, Python, Go, Rust, .NET and Java. Teams reach for it when their data is genuinely a graph — permissions, catalogues, document trees — and they still want strict typing and constraints.

Deploy Gel on Railway and this template gives you the shape upstream documents for production: a `gel` server running against a dedicated `postgres` service rather than the database bundled into the image, so storage can be resized and inspected on its own. A `gateway` service running Caddy holds the public domain, forwards browser and HTTP API traffic to Gel over the private network, and blocks the server's unauthenticated Prometheus endpoint. Client libraries and the `gel` CLI speak Gel's binary protocol, which needs raw TCP, so the `gel` service also carries a Railway TCP proxy.

![Diagram of the Gel, PostgreSQL and Caddy gateway services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788851798/gel-architecture.png)

Gel is a database server, not a hosted service or an ORM you import. It owns a PostgreSQL cluster, compiles EdgeQL into SQL, and serves clients over three surfaces on one port: a binary protocol, an HTTP API for EdgeQL and GraphQL, and the admin UI. Self-hosting is the only way to run it today — managed Gel Cloud stopped taking new instances in December 2025 and shut down at the end of January 2026.

Key features:

- **EdgeQL** — a composable query language where nested shapes replace joins, and results are typed
- **Native SQL** — Gel 6 and later answer plain SQL over the PostgreSQL wire protocol, so BI tools, Drizzle, Prisma and SQLAlchemy work
- **Schema migrations** — declarative schema files with a reviewable history
- **Branches** — copy a whole database, schema and data, to develop against
- **Built-in extensions** — authentication, GraphQL, full-text search, `pgvector` and AI
- **Access policies** — row-level security expressed in the schema, not in application code

Three Railway services make this work. `gel` is the database server, with a small volume for its TLS certificate and signing keys. `postgres` is the storage engine every branch, type and row lives in, on its own volume. `gateway` runs `caddy:2-alpine`, terminates the public domain and proxies everything except `/metrics` to Gel.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gateway | `caddy:2-alpine` | Web service |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| gel | `geldata/gel:7` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | gateway | 8080 | Port the gateway listens on |
| `CADDY_CONFIG` | gateway | {"apps":{"http":{"servers":{"srv0":{"listen":[":{env.PORT}"],"trusted_proxies":{"source":"static","ranges":["100.64.0.0/10","fd00::/8","152.233.0.0/17"]},"routes":[{"match":[{"path":["/healthz"]}],"handle":[{"handler":"static_response","status_code":200,"body":"ok"}]},{"match":[{"path":["/metrics","/metrics/*"]}],"handle":[{"handler":"static_response","status_code":403,"body":"forbidden"}]},{"handle":[{"handler":"reverse_proxy","upstreams":[{"dial":"{env.GEL_UPSTREAM}"}]}]}]}}}}} | Caddy JSON config: health route, blocked metrics, proxy |
| `GEL_UPSTREAM` | gateway | - | Private Gel address to proxy to |
| `POSTGRES_DB` | postgres | gel | Database created on first boot |
| `DATABASE_URL` | postgres | - | Private connection string |
| `POSTGRES_USER` | postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | postgres | (secret) | Superuser password, read by the entrypoint |
| `PORT` | gel | 5656 | Port Railway health-checks |
| `GEL_PRIVATE_URL` | gel | gel.railway.internal:5656 | Private address peers dial |
| `GEL_SERVER_PORT` | gel | 5656 | Port the server listens on |
| `GEL_SERVER_ADMIN_UI` | gel | enabled | Serve the admin UI at /ui |
| `GEL_SERVER_PASSWORD` | gel | (secret) | Password for the admin superuser |
| `GEL_SERVER_SECURITY` | gel | strict | Require TLS and SCRAM authentication |
| `GEL_SERVER_EXTRA_ARGS` | gel | --tls-cert-file=/var/lib/gel/state/edbtlscert.pem --tls-key-file=/var/lib/gel/state/edbprivkey.pem --jws-key-file=/var/lib/gel/state/edbjwskeys.pem | Keep TLS and signing keys on the volume |
| `GEL_SERVER_BACKEND_DSN` | gel | - | PostgreSQL backend connection string |
| `GEL_SERVER_RUNSTATE_DIR` | gel | /var/lib/gel/state | Runstate on the volume, keeps signing keys |
| `GEL_SERVER_INSTANCE_NAME` | gel | railway | Instance name shown in logs and the UI |
| `GEL_SERVER_TLS_CERT_MODE` | gel | generate_self_signed | Generate the certificate on first boot |
| `GEL_SERVER_DEFAULT_BRANCH` | gel | main | Branch created during bootstrap |
| `GEL_SERVER_COMPILER_POOL_MODE` | gel | on_demand | Scale compiler workers with load |
| `GEL_SERVER_COMPILER_POOL_SIZE` | gel | - | Optional cap; derived from the CPU limit when blank |
| `GEL_SERVER_HTTP_ENDPOINT_SECURITY` | gel | optional | Accept plain HTTP behind Railway's edge |

## Configuration

- **Start command:** `/bin/sh -c 'printf %s "$CADDY_CONFIG" > /etc/caddy/config.json; caddy validate --config /etc/caddy/config.json || exit 1; exec caddy run --config /etc/caddy/config.json'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'N=$(cut -d" " -f1 /sys/fs/cgroup/cpu.max); D=$(cut -d" " -f2 /sys/fs/cgroup/cpu.max); if [ "$N" = "max" ]; then N=4; else N=$((N/D)); fi; if [ "$N" -lt 2 ]; then N=2; fi; export GEL_SERVER_COMPILER_POOL_SIZE=${GEL_SERVER_COMPILER_POOL_SIZE:-$N}; echo "[railway] compiler pool max = $GEL_SERVER_COMPILER_POOL_SIZE"; exec docker-entrypoint.sh server'`
- **Healthcheck:** `/server/status/ready`
- **TCP Proxies:** 5656
- **Volume:** `/var/lib/gel`

**Category:** Other

[View on Railway →](https://railway.com/deploy/gel)
