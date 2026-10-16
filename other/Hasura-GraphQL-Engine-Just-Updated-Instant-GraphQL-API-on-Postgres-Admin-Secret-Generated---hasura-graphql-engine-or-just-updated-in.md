# Deploy Hasura GraphQL Engine | (Just Updated) Instant GraphQL API on Postgres, Admin Secret Generated on Railway

Instant GraphQL API on Postgres. Admin secret generated.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hasura-graphql-engine-or-just-updated-in)

## About

Hasura GraphQL Engine turns a Postgres database into an instant GraphQL API with permissions, subscriptions and an admin console. This template deploys it together with its own Postgres database, with the admin secret and database password generated for you.

The template starts two services: `hasura` (the engine, public HTTPS domain) and `postgres` (private, on a persistent volume). The engine connects to Postgres over Railway's private network using a generated password, and the admin secret is generated per deploy, so nothing has to be filled in before you click Deploy. Hasura stores its metadata in the same Postgres database.

Machine-readable contract:

```
public_url:     https://${RAILWAY_PUBLIC_DOMAIN of service hasura}
internal_url:   http://hasura.railway.internal:8080
graphql:        POST /v1/graphql
sql:            POST /v2/query
console:        /console
health:         GET /healthz  (200 when ready)
credentials:    HASURA_GRAPHQL_ADMIN_SECRET (service hasura), POSTGRES_PASSWORD (service postgres)
database_url:   HASURA_GRAPHQL_DATABASE_URL (service hasura)
port:           8080 (HTTP)
```

Working check, run it after the deploy turns green:

```
curl -s -X POST https:///v1/graphql \
  -H 'content-type: application/json' \
  -H "x-hasura-admin-secret: $HASURA_GRAPHQL_ADMIN_SECRET" \
  -d '{"query":"{ __typename }"}'

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:18.6@sha256:74935e72241653ca55e0414067e6d8763aceb8a810eb51b452253ec3dcfc4336` | Database |
| hasura | `hasura/graphql-engine:v2.51.0@sha256:5d435a6756de53709bf48c15b822cabab38d57acd22e656cf633cc2df67df150` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `HASURA_GRAPHQL_ADMIN_SECRET` | hasura | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Start command:** `/bin/sh -c 'export HASURA_GRAPHQL_ENABLE_CONSOLE=true HASURA_GRAPHQL_DEV_MODE=false HASURA_GRAPHQL_SERVER_HOST="*"; exec graphql-engine serve'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/hasura-graphql-engine-or-just-updated-in)
