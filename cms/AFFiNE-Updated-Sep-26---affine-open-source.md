# Deploy AFFiNE [Updated Sep '26] on Railway

AFFiNE [Sep '26] (Self-Hosted Notion and Miro Alternative)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/affine-open-source)

## About

AFFiNE is the open-source answer to Notion, but with a real infinite-canvas whiteboard built in as a first-class citizen alongside docs and databases, not a drawing tool bolted onto a doc editor. This template deploys its real 3-service architecture, verified live end-to-end.

Notion's Business plan runs $20/user/month, and even the Plus plan is $10/user/month, both billed per seat regardless of actual usage. A 10-person team on Business pays $200/month before any AI add-ons stack on top. AFFiNE self-hosted on Railway flips that entirely: a flat infrastructure cost regardless of team size, no per-seat charge at all.

The second reason is feature shape, not just price. Notion has no native whiteboard. AFFiNE ships one as a real workspace mode, an actual infinite canvas, not a drawing widget inside a doc, alongside its doc editor and database blocks, all in the same workspace.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| affine | `ghcr.io/toeverything/affine:stable` | Web service |
| redis | `redis:8.2.1` | Database |
| pgvector | `pgvector/pgvector:pg18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | affine | 3010 | HTTP port Railway routes public traffic to — must match AFFINE_SERVER_PORT. |
| `NODE_ENV` | affine | production | Node.js runtime mode. |
| `DATABASE_URL` | affine | - | Postgres connection string, built directly from the private domain rather than through the PGHOST_PRIVATE indirection on the Postgres service. |
| `REDIS_SERVER_HOST` | affine | - | Redis private hostname. |
| `REDIS_SERVER_PORT` | affine | 6379 | Redis port. |
| `REDIS_SERVER_USER` | affine | (secret) | Redis AUTH username. |
| `AFFINE_ADMIN_EMAIL` | affine | - | Bootstrap admin account email, created by the preDeployCommand migration script. |
| `AFFINE_CONFIG_PATH` | affine | /root/.affine/config | Config directory inside the mounted volume. |
| `AFFINE_SERVER_HOST` | affine | 0.0.0.0 | Binds to all interfaces inside the container. |
| `AFFINE_SERVER_PORT` | affine | 3010 | Internal listener port. |
| `AFFINE_SERVER_HTTPS` | affine | false | Railway's own edge terminates TLS, so the app itself serves plain HTTP internally. |
| `AFFINE_ADMIN_PASSWORD` | affine | (secret) | Bootstrap admin password. Must contain at least 1 uppercase letter, 2 digits, and 2 special characters — confirmed via AFFiNE's own docs. This expression chains guaranteed draws from each required class (1 upper + 2 digits + 2 specials) plus 11 more random characters, meeting the requirement by construction rather than by chance, the same defensive pattern used for Libredesk's system password. Verified live to resolve correctly. |
| `REDIS_SERVER_PASSWORD` | affine | (secret) | Redis AUTH password. |
| `AFFINE_INDEXER_ENABLED` | affine | false | Disables the search indexer, which needs a separate Manticore/Elasticsearch instance this template doesn't deploy. |
| `AFFINE_SERVER_EXTERNAL_URL` | affine | - | Public-facing app URL, used for generated links and CORS. |
| `REDISHOST` | redis | - | Internal Redis service hostname. |
| `REDISPORT` | redis | 6379 | Redis server listening port. |
| `REDISUSER` | redis | default | Redis default authentication user (plain --requirepass, not ACLs). |
| `REDIS_URL` | redis | - | Internal Redis connection string. |
| `REDISPASSWORD` | redis | (secret) | Same password under Railway's conventional Redis variable naming. |
| `REDIS_PASSWORD` | redis | (secret) | Auth password Redis is started with (--requirepass). Auto-generated. |
| `POSTGRES_DB` | pgvector | railway | Name of the database created on startup. |
| `POSTGRES_USER` | pgvector | (secret) | Postgres superuser name. |
| `PGHOST_PRIVATE` | pgvector | - | Private internal domain for Postgres — this is what affine's DATABASE_URL is built from. |
| `PGPORT_PRIVATE` | pgvector | - | Private internal domain for Postgres — this is what affine's DATABASE_URL is built from. |
| `POSTGRES_PASSWORD` | pgvector | (secret) | Password for the Postgres superuser. Auto-generated. |
| `DATABASE_URL_PRIVATE` | pgvector | - | Full private connection string, for reference/consistency with the reference config's naming — affine's own DATABASE_URL is built independently (see below) rather than referencing this. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.affine`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/affine-open-source)
