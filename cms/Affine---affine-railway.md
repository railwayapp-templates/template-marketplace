# Deploy Affine on Railway

Notion alternative. Docs, whiteboard, kanban, databases & real-time sync

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/affine-railway)

## About

AFFiNE is an open-source, local-first workspace that puts documents, an infinite whiteboard and structured databases on one canvas. A paragraph you write in page mode is the same object you drag around in edgeless mode, so notes, diagrams, kanban boards and wikis stop living in three separate tools. Teams reach for it when they want Notion-style docs and Miro-style whiteboarding without handing the content to someone else.

Deploy AFFiNE on Railway and the self-hosted stack comes up wired together: the AFFiNE server (`ghcr.io/toeverything/affine`, source at [github.com/toeverything/AFFiNE](https://github.com/toeverything/AFFiNE)), a managed PostgreSQL holding documents and history, and a managed Redis backing the job queues. A volume keeps uploads and the signing key, and migrations run on every boot.

![AFFiNE Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786646077/12e5b2f4-4a8d-4e82-b728-04ecd416f1ed.png)

AFFiNE is TypeScript on NestJS with a CRDT-backed editor, so several people can edit one document at once and offline edits merge cleanly on reconnect. Self-host it when documents hold material you cannot put on someone else's SaaS, or when you want members without per-seat pricing.

- **Page and edgeless modes** over one document — write a doc, then arrange it on an infinite canvas
- **Database blocks** with table, kanban and calendar views, embeddable in any page
- **Real-time collaboration**, doc history and version snapshots
- **Local-first sync** — clients work offline and reconcile afterwards
- **Admin panel** at `/admin` for accounts, server settings, jobs and auth policy

The deployment is one AFFiNE server in its `allinone` flavor: frontend, the GraphQL and REST API at `/graphql` and `/api`, the websocket sync gateway at `/socket.io`, and the background document service, all on port 3010. PostgreSQL is the system of record, Redis carries the job queues, and the volume holds uploaded blobs and the signing key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| affine | `ghcr.io/toeverything/affine:0.27.3` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `PORT` | affine | 3010 | Health check target port |
| `NODE_ENV` | affine | production | Node runtime mode |
| `NO_COLOR` | affine | 1 | Plain-text log output |
| `AFFINE_ENV` | affine | production | AFFiNE namespace |
| `DATABASE_URL` | affine | - | PostgreSQL connection string |
| `NODE_OPTIONS` | affine | --max-old-space-size=3072 | Node heap ceiling |
| `DEPLOYMENT_TYPE` | affine | selfhosted | Enables setup wizard and admin |
| `REDIS_SERVER_HOST` | affine | - | Redis private hostname |
| `REDIS_SERVER_PORT` | affine | - | Redis port |
| `AFFINE_CONFIG_JSON` | affine | {"redis":{"ioredis":{"family":0}},"auth":{"allowSignup":false}} | Config overrides written at boot |
| `AFFINE_SERVER_HOST` | affine | - | Public hostname |
| `AFFINE_SERVER_PORT` | affine | 3010 | Server listening port |
| `AFFINE_SERVER_HTTPS` | affine | true | Marks site HTTPS, secures cookies |
| `REDIS_SERVER_DATABASE` | affine | 0 | Redis database index |
| `REDIS_SERVER_PASSWORD` | affine | (secret) | Redis password |
| `REDIS_SERVER_USERNAME` | affine | (secret) | Redis username |
| `AFFINE_INDEXER_ENABLED` | affine | false | Server-side search indexing off |
| `AFFINE_SERVER_EXTERNAL_URL` | affine | - | Public base URL for links |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `REDIS_PUBLIC_URL` | Redis | - | Public connection string over the TCP proxy, for external tools |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'set -e; mkdir -p /root/.affine/config /root/.affine/storage; printf %s "$AFFINE_CONFIG_JSON" > /root/.affine/config/config.json; echo "boot: uid=$(id -u) config=$(cat /root/.affine/config/config.json)"; node ./scripts/self-host-predeploy.js; exec docker-entrypoint.sh node ./dist/main.js'`
- **Healthcheck:** `/info`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.affine`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/affine-railway)
