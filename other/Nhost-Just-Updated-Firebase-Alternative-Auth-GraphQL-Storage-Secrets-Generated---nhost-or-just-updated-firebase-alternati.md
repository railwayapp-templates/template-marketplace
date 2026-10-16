# Deploy Nhost | (Just Updated) Firebase Alternative, Auth + GraphQL + Storage, Secrets Generated on Railway

Auth, GraphQL API and file storage in one stack, secrets generated

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nhost-or-just-updated-firebase-alternati)

## About

Nhost is an open-source Firebase alternative: Postgres with an instant GraphQL API (Hasura), email/password and OAuth authentication, and file storage on S3-compatible object storage. This template deploys the whole stack behind one public gateway, with every secret generated for you.

The template starts six services: `gateway` (public HTTPS entry point), `graphql` (Hasura engine), `auth` (Nhost Auth), `storage` (Nhost Storage), `postgres` (private, volume at `/var/lib/postgresql`) and `objects` (MinIO, private, volume at `/data`). Only the gateway has a public domain. It routes `/auth/v1/*` to Auth, `/storage/*` to Storage and everything else to the GraphQL engine. The admin secret, JWT signing key, database password and object-store keys are generated per deploy, so nothing has to be filled in before you click Deploy. Auth and Storage create their own tables on first boot.

Machine-readable contract:

```
public_url:     https://${RAILWAY_PUBLIC_DOMAIN of service gateway}
graphql:        POST /v1/graphql   (anonymous role is rejected; send a user JWT or the admin secret)
console:        /console           (enter the admin secret)
auth:           /auth/v1/signup/email-password, /auth/v1/signin/email-password
storage:        POST /storage/v1/files   (multipart field file[])
health:         GET /railway_health  (200 when the gateway is up)
internal_urls:  graphql.railway.internal:8080, auth.railway.internal:4000, storage.railway.internal:8000, objects.railway.internal:9000
credentials:    HASURA_GRAPHQL_ADMIN_SECRET (service graphql), JWT_KEY (service graphql),
                POSTGRES_PASSWORD (service postgres), MINIO_ROOT_USER / MINIO_ROOT_PASSWORD (service objects)
```

Working check, run it after the deploy turns green:

```
curl -s -X POST https:///auth/v1/signup/email-password \
  -H 'content-type: application/json' \
  -d '{"email":"agent@example.com","password":"Passw0rd!xyz1"}'

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| storage | `nhost/storage:0.7.2@sha256:8692cf7eba6b775681863796bfb53160d41167818bbfebe8392dea4ce264eb27` | Worker |
| graphql | `nhost/graphql-engine:v2.46.0-ce@sha256:bfc3e5fd51e87f99dc0894976f16c14165d9c0fbd1fe503a3ebfbaf02600fed0` | Worker |
| gateway | `caddy@sha256:d8542f48d34a9cf4e4c11a478865229840e87e4c96ea3f439101f31a5d35f75f` | Web service |
| auth | `nhost/auth:0.40.2@sha256:8674c405184e0b14f5cb80912b1275ac51fb0325035862dacfe943ad77de95b3` | Worker |
| objects | `ghcr.io/bon5co/buzz-railway-minio:latest@sha256:6842303eaf3e2c6413d84c2f67b9dd51ab2992214ecc72230dde4c3050145f00` | Database |
| postgres | `postgres:18.6@sha256:74935e72241653ca55e0414067e6d8763aceb8a810eb51b452253ec3dcfc4336` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `S3_SECRET_KEY` | storage | (secret) |
| `HASURA_GRAPHQL_ADMIN_SECRET` | storage | (secret) |
| `HASURA_GRAPHQL_JWT_SECRET` | graphql | (secret) |
| `HASURA_GRAPHQL_ADMIN_SECRET` | graphql | (secret) |
| `HASURA_GRAPHQL_JWT_SECRET` | auth | (secret) |
| `HASURA_GRAPHQL_ADMIN_SECRET` | auth | (secret) |
| `MINIO_ROOT_USER` | objects | (secret) |
| `MINIO_ROOT_PASSWORD` | objects | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Start command:** `/nix/store/99kk118sis0wavsvvgidfh536pslm524-hasura-storage-0.7.2/bin/hasura-storage serve`
- **Start command:** `/bin/sh -c 'export HASURA_GRAPHQL_ENABLE_CONSOLE=true HASURA_GRAPHQL_DEV_MODE=false HASURA_GRAPHQL_SERVER_HOST="*" HASURA_GRAPHQL_SERVER_PORT=8080 HASURA_GRAPHQL_ENABLE_TELEMETRY=false HASURA_GRAPHQL_UNAUTHORIZED_ROLE=public HASURA_GRAPHQL_CORS_DOMAIN="*"; exec graphql-engine serve'`
- **Start command:** `/bin/sh -c 'printf ":%s {\n\thandle /railway_health {\n\t\trespond \"ok\" 200\n\t}\n\thandle_path /auth/v1/* {\n\t\treverse_proxy %s:4000\n\t}\n\thandle /storage/* {\n\t\turi strip_prefix /storage\n\t\treverse_proxy %s:8000\n\t}\n\thandle {\n\t\treverse_proxy %s:8080\n\t}\n}\n" "$PORT" "$AUTH_HOST" "$STORAGE_HOST" "$GRAPHQL_HOST" > /etc/caddy/Caddyfile && exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/railway_health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'printf "CREATE SCHEMA IF NOT EXISTS auth;\nCREATE SCHEMA IF NOT EXISTS storage;\nCREATE EXTENSION IF NOT EXISTS pgcrypto;\nCREATE EXTENSION IF NOT EXISTS citext;\n" > /docker-entrypoint-initdb.d/00-nhost.sql; exec docker-entrypoint.sh postgres'`
- **Volume:** `/var/lib/postgresql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/nhost-or-just-updated-firebase-alternati)
