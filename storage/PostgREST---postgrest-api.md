# Deploy PostgREST on Railway

REST API served straight out of a PostgreSQL schema, with Swagger UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgrest-api)

## About

PostgREST turns a PostgreSQL database into a fast REST API without a line of backend code. You define tables, views, functions and roles in SQL; PostgREST reads the catalog and serves the matching endpoints, with filtering, ordering, pagination, embedded relations and an OpenAPI description at the root path. Authorization is not bolted on — every request runs as a real database role, so `GRANT`, `REVOKE` and row-level security are the access control. Teams reach for it when they want a thin, auditable data API over Postgres rather than a CRUD service that drifts from the schema.

This template deploys PostgREST with a managed PostgreSQL database and a Swagger UI console, wired together. Traffic reaches PostgREST on its public domain; PostgREST connects privately to Postgres as a least-privilege `authenticator` role that owns nothing and can only switch into the anonymous or authenticated role. On first boot it creates those roles, an `api` schema, a bcrypt-hashed user table hidden from the API, a `login` function that mints JSON Web Tokens, and a demo table, so you can self-host PostgREST and call a working endpoint immediately. Swagger UI reads the OpenAPI description from the API and gives you a browser console for every endpoint.

![Diagram of the PostgREST, Swagger UI and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788271550/postgrest-architecture.png)

PostgREST is a single Haskell binary that maps HTTP onto SQL. It caches the schema, opens a small connection pool, and turns each request into one prepared statement, which is why it routinely outperforms hand-rolled ORM backends. Because the API surface *is* the schema, there is no second source of truth: add a view, get an endpoint.

- Full REST semantics over tables and views: filtering, ordering, pagination, upserts, bulk insert and resource embedding across foreign keys
- Stored functions exposed as `POST /rpc/` for anything SQL can express
- JWT authentication where the token's role claim selects the database role
- An always-current OpenAPI description generated from the catalog and SQL comments
- An admin server with `/live`, `/ready` and Prometheus metrics on its own port

Three services make up the deployment. PostgREST is the API. PostgreSQL holds every table, role and permission, so it is both the datastore and the authorization system. Swagger UI is a static console that fetches the OpenAPI document in the browser and stores nothing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgrest | [gridalpha/postgrest-railway](https://github.com/gridalpha/postgrest-railway) | Web service |
| swagger-ui | `swaggerapi/swagger-ui:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | postgrest | 3001 | Port Railway health-checks, the admin server |
| `DATABASE_URL` | postgrest | - | Admin connection, bootstrap only |
| `API_USER_EMAIL` | postgrest | admin@example.com | First API account, change before deploying |
| `PGRST_BOOTSTRAP` | postgrest | true | Create roles and schema on boot |
| `PGRST_LOG_LEVEL` | postgrest | warn | Log level, info logs every request |
| `PGRST_SEED_DEMO` | postgrest | true | Create the demo todos table |
| `PGRST_DB_SCHEMAS` | postgrest | api | Schemas exposed as endpoints |
| `PGRST_JWT_SECRET` | postgrest | (secret) | HS256 key signing and verifying tokens |
| `API_USER_PASSWORD` | postgrest | (secret) | First API account password |
| `PGRST_DB_MAX_ROWS` | postgrest | 1000 | Maximum rows returned per request |
| `PGRST_SERVER_HOST` | postgrest | *6 | Dual-stack bind, reachable privately |
| `PGRST_SERVER_PORT` | postgrest | 3000 | Public API listening port |
| `PGRST_DB_ANON_ROLE` | postgrest | anon | Role used for unauthenticated requests |
| `JWT_LIFETIME_SECONDS` | postgrest | 3600 | Lifetime of issued tokens |
| `AUTHENTICATOR_PASSWORD` | postgrest | (secret) | Password for the low-privilege API role |
| `PGRST_ADMIN_SERVER_PORT` | postgrest | 3001 | Admin server with live, ready, metrics |
| `PGRST_OPENAPI_SECURITY_ACTIVE` | postgrest | true | Adds JWT security to OpenAPI output |
| `URL` | swagger-ui | - | OpenAPI document the console loads |
| `PORT` | swagger-ui | 8080 | HTTP server listening port |
| `FILTER` | swagger-ui | true | Show the tag filter box |
| `DEEP_LINKING` | swagger-ui | true | Link directly to individual operations |
| `DOC_EXPANSION` | swagger-ui | list | Expand tags but not operations |
| `VALIDATOR_URL` | swagger-ui | none | Disable the external spec validator |
| `TRY_IT_OUT_ENABLED` | swagger-ui | true | Enable Try it out by default |
| `PERSIST_AUTHORIZATION` | swagger-ui | true | Keep the token across page reloads |
| `DISPLAY_REQUEST_DURATION` | swagger-ui | true | Show request timings in responses |
| `NGINX_ENTRYPOINT_WORKER_PROCESSES_AUTOTUNE` | swagger-ui | 1 | Size nginx workers to the container |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Languages:** PLpgSQL, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/postgrest-api)
