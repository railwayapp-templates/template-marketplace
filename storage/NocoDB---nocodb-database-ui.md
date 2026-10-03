# Deploy NocoDB on Railway

Host NocoDB [Oct'26]— spreadsheet UI over Postgres, MySQL, your own data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nocodb-database-ui)

## About

NocoDB is an open-source Airtable alternative that does what Airtable cannot: put a spreadsheet interface on a database you already own. Grid, kanban, gallery, calendar and form views over Postgres, MySQL or SQL Server, unlimited users, no per-seat pricing. This template runs it with its own Postgres metadata store, a volume for attachments, and the settings that decide whether pointing it at a real database is safe.

NocoDB is two products in one — a place to build new tables, and a front end for databases that already exist. The second is why people choose it, and the one every deployment guide skips.

**Connecting a database gives NocoDB write access to its schema.** This is not a read-only viewer. NocoDB creates its own bookkeeping tables in any database you connect, and the UI lets anyone with edit rights add columns, change types and drop fields against your real schema, immediately. Never point it at production with an owner-level account — use a user scoped to one schema, or a replica.

**`NC_AUTH_JWT_SECRET` encrypts your saved connections, not just sessions.** Upstream describes it as the secret used for auth *and* for storing other secrets — so the credentials for every external database you connect are encrypted with it. Rotate it and you have not merely logged everyone out, you have made every saved data-source credential unreadable.

**The first person to open the URL becomes the owner.** A fresh NocoDB has no admin until someone signs up, and signup is open. Deploy, get distracted, and your workspace belongs to whoever found the domain first. Claim it immediately and close public signup before connecting anything.

**`NC_DB` does not take a standard Postgres URL.** NocoDB uses its own format — `pg://host:port?u=user&p=password&d=database`. A `postgresql://` URL that works everywhere else fails here, and the failure is a container that will not start rather than a clear error.

**Attachments are files on disk, separate from everything else.** Metadata lives in Postgres; uploaded files go to `/usr/app/data`. Setting up Postgres and assuming you are safe is the common mistake — without a volume, a redeploy keeps every table and loses every attachment.

**Set `NC_PUBLIC_URL` or your links point nowhere.** Invitation emails and shared-view URLs are built from it. Left unset, people receive links they cannot open, and the instance itself looks fine from where you are sitting.

Typical cost: **~$10–20/month** for NocoDB, Postgres and volumes at $10/GB/month RAM, $20/vCPU/month CPU and $0.15/GB/month volumes. NocoDB's community edition is free with unlimited users; SSO and audit logging are paid tiers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| NocoDB | `nocodb/nocodb` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `NC_DB` | NocoDB | - | NC_DB |
| `NC_REDIS_URL` | NocoDB | - | NC_REDIS_URL |
| `NC_PUBLIC_URL` | NocoDB | - | NC_PUBLIC_URL |
| `NC_AUTH_JWT_SECRET` | NocoDB | (secret) | NC_AUTH_JWT_SECRET |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | NocoDB | true | ENABLE_ALPINE_PRIVATE_NETWORKING |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/usr/app/data/`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/nocodb-database-ui)
