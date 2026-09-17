# Deploy Colanode on Railway

Collaboration workspace with team chat, pages and databases

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/colanode-app)

## About

Colanode is an open-source, local-first collaboration workspace putting team chat, Notion-style pages, customisable databases and file storage behind one server you own. Every client keeps a full SQLite copy of whatever you may read, so the app works offline and edits merge through CRDTs once the connection returns. Teams reach for it when Slack and Notion have split their conversations from their documents, and when the data is too sensitive for a vendor's cloud.

Self-host Colanode on Railway and this template wires the whole stack. `colanode-server` runs the sync API, the file endpoint and the job worker; `colanode-web` serves the browser client; `Postgres` stores accounts, workspaces, nodes and CRDT updates with the `vector` extension enabled; `Redis` carries the job queue and upload locks; and a managed `colanode-files` bucket holds every uploaded file. Nothing writes to a container filesystem, so the deployment survives redeploys without a volume.

![Colanode server and web client with Postgres and Redis on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789506618/colanode-architecture.webp)

Colanode collapses three tools into one workspace. Channels handle conversation, pages handle documentation, databases handle structured records — and because a database row *is* a page, a task in a tracker carries the write-up nobody wanted to link out to. Self-hosting matters because that content is a company's internal memory.

Key features:

- Real-time chat in channels and direct messages, with reactions and threads
- Rich text pages with headings, checklists, quotes, tables and embedded files
- Databases with typed fields and table, kanban, calendar and gallery views
- Resumable file uploads kept in object storage
- Multiple workspaces per server, each with its own members
- Desktop apps for macOS, Windows and Linux beside the browser client

The Railway shape follows upstream's own compose file. `colanode-server` is the only service that touches data: it migrates at boot, serves the sync API over HTTP and WebSocket, streams downloads from the bucket, and runs the job worker in-process. `colanode-web` is a static nginx build holding no state; it calls the server across origins, which is why the server takes the web domain as its CORS origin.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| colanode-web | `ghcr.io/colanode/web:latest` | Web service |
| colanode-server | [gridalpha/colanode-railway](https://github.com/gridalpha/colanode-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | colanode-web | 80 | Port Railway health-checks |
| `NGINX_ENTRYPOINT_WORKER_PROCESSES_AUTOTUNE` | colanode-web | 1 | Size nginx workers from cgroup |
| `PORT` | colanode-server | 3000 | Port Railway health-checks |
| `LOG_LEVEL` | colanode-server | info | Server log verbosity |
| `REDIS_URL` | colanode-server | - | Redis connection string |
| `S3_BUCKET` | colanode-server | - | Bucket holding uploaded files |
| `S3_REGION` | colanode-server | - | Bucket placement region |
| `AI_ENABLED` | colanode-server | false | Assistant and semantic search toggle |
| `WEB_DOMAIN` | colanode-server | - | Host used in invitation links |
| `CORS_ORIGIN` | colanode-server | - | Allowed browser origin |
| `S3_ENDPOINT` | colanode-server | - | Object storage endpoint |
| `SERVER_MODE` | colanode-server | standalone | standalone or cluster event bus |
| `SERVER_NAME` | colanode-server | Colanode | Name shown in client server list |
| `POSTGRES_URL` | colanode-server | - | Postgres connection string |
| `STORAGE_TYPE` | colanode-server | s3 | Storage backend selector |
| `EMAIL_ENABLED` | colanode-server | false | Outbound SMTP mail toggle |
| `MAX_FILE_SIZE` | colanode-server | 524288000 | Upload ceiling in bytes |
| `S3_ACCESS_KEY` | colanode-server | - | Bucket access key |
| `S3_SECRET_KEY` | colanode-server | (secret) | Bucket secret key |
| `S3_FORCE_PATH_STYLE` | colanode-server | true | Path-style S3 addressing |
| `JOBS_CLEANUP_ENABLED` | colanode-server | true | Orphan row and file cleanup |
| `ACCOUNT_VERIFICATION_TYPE` | colanode-server | automatic | Registration verification mode |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/config`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/colanode-app)
