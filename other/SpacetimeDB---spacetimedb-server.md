# Deploy SpacetimeDB on Railway

Database that runs your app's logic and streams live query results

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/spacetimedb-server)

## About

SpacetimeDB is a relational database that runs your application's logic inside the database itself. Instead of a database, a backend and a socket layer, you publish one *module* — tables and reducer functions compiled to WebAssembly from Rust, C#, TypeScript or C++ — and clients connect straight to it over a WebSocket, subscribing to SQL queries that push updates as rows change.

Deploy SpacetimeDB on Railway with this template and you get a `spacetimedb` service running the standalone node from the official `clockworklabs/spacetime` image, its commitlog and JWT signing keys on a volume at `/stdb`, behind a Caddy `gateway`. The gateway matters: a bare node authenticates nobody, so anyone who found the URL could publish a module onto it. It publishes only what clients need — identity issuance, the subscription WebSocket, module HTTP handlers, read-only schema lookups — and serves the full API under a private admin path only you know. Source: [github.com/gridalpha/spacetimedb-railway](https://github.com/gridalpha/spacetimedb-railway).

![The public Caddy gateway in front of the private SpacetimeDB node and its volume](https://res.cloudinary.com/rroe4rtk/image/upload/v1788777721/spacetimedb-architecture.png)

Conventional realtime stacks put a database, a stateless API and a WebSocket fan-out layer in a row, and most of the code and latency is the plumbing between them. SpacetimeDB removes the middle: reducers run inside the database as serialisable transactions, and each subscription is a live SQL query pushed on commit.

- **Modules in Rust, C#, TypeScript or C++**, compiled to WebAssembly and published in one command
- **Live subscriptions** — clients subscribe to `SELECT` queries and get row deltas over a WebSocket
- **Reducers as the only write path**, each one ACID transaction with the caller in `ctx.sender`
- **Row-level security**, and built-in identity that OIDC providers such as Auth0 or Clerk can extend
- **Client SDKs** for Rust, C#, TypeScript, Unity and Unreal, generated from your schema

Self-host it when the data must sit on infrastructure you control, when a game server must sit near your players, or when a container costs less than metered capacity.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gateway | [gridalpha/spacetimedb-railway](https://github.com/gridalpha/spacetimedb-railway) | Web service |
| spacetimedb | [gridalpha/spacetimedb-railway](https://github.com/gridalpha/spacetimedb-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `STDB_UPSTREAM` | gateway | - | SpacetimeDB address to proxy to |
| `STDB_ADMIN_PATH` | gateway | - | Secret path prefix for the full API |
| `STDB_PUBLIC_HTTP_SQL` | gateway | false | Publish the HTTP SQL route anonymously |
| `STDB_PUBLIC_HTTP_CALL` | gateway | false | Publish the HTTP reducer-call route anonymously |
| `PORT` | spacetimedb | 3000 | Port the node binds and Railway probes |
| `PRIVATE_URL` | spacetimedb | http://spacetimedb.railway.internal:3000 | Private address the gateway proxies to |
| `STDB_LOG_LEVEL` | spacetimedb | info | Server log level |
| `STDB_MODULE_HTTP` | spacetimedb | true | Allow module outbound HTTP requests |
| `SPACETIMEDB_DISABLE_DISK_LOGGING` | spacetimedb | 1 | Keep log copies off the volume |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/v1/health`
- **Volume:** `/stdb`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/spacetimedb-server)
