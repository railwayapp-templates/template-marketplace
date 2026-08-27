# Deploy Nocobase on Railway

No-code platform for building internal business apps on a database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nocobase-railway)

## About

NocoBase is an open-source no-code platform for building internal business systems on a real relational database. It gives you a WYSIWYG interface builder over collections you design yourself — tables, forms, kanban boards, calendars, Gantt charts and a visual workflow engine — so operations teams get the CRM, order tracker or approval tool they need without a frontend project. Every collection maps to ordinary Postgres tables, so your data stays queryable and exportable, and teams self-host NocoBase to keep customer and financial records in-house.

Deploy NocoBase on Railway and the whole stack is wired up: the application service, built from [gridalpha/nocobase-railway](https://github.com/gridalpha/nocobase-railway) on top of the official `nocobase/nocobase:latest-full` image, a managed PostgreSQL database holding every collection and record, and a managed Redis instance as the cache. Only the app has a public domain; browser traffic reaches an in-container nginx that serves the compiled client and proxies API calls to the Node gateway behind it. A volume at `/app/nocobase/storage` keeps uploads, plugins and logs.

![Diagram of the NocoBase, Postgres and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787706293/nocobase-architecture.png)

NocoBase sits between a spreadsheet tool and a bespoke application. You model your data first, then compose screens from blocks bound to that model, and the same collections serve the REST API, the workflow engine and every plugin. That ordering separates it from form-first builders: renaming a field updates every block using it, and permissions are set once against roles, resources and actions rather than per screen.

Key capabilities:

- Collections with relationships, inheritance, SQL views and imported tables
- Blocks for tables, forms, lists, kanban, calendar, Gantt, tree and charts
- Workflows triggered by collection events, schedules, actions and manual steps
- Role-based access control down to single fields and actions
- REST API with OpenAPI docs and API keys per collection
- Roughly a hundred first-party plugins

**PostgreSQL** is the system of record — collections, records, UI schemas, users, roles and workflows — so back it up as you would any production database. **Redis** holds the cache, keeping permission checks and settings out of process memory.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| nocobase | [gridalpha/nocobase-railway](https://github.com/gridalpha/nocobase-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `TZ` | nocobase | Etc/UTC | Timezone for dates and schedules |
| `PORT` | nocobase | 13000 | Health check target port |
| `APP_ENV` | nocobase | production | Application run mode |
| `APP_KEY` | nocobase | - | Signs user tokens and sessions |
| `DB_HOST` | nocobase | - | Private Postgres hostname |
| `DB_PORT` | nocobase | - | Postgres port |
| `DB_USER` | nocobase | (secret) | Database user |
| `APP_PORT` | nocobase | 13000 | Node gateway port behind nginx |
| `INIT_LANG` | nocobase | en-US | Interface language at install |
| `DB_DIALECT` | nocobase | postgres | Database driver selection |
| `DB_DATABASE` | nocobase | - | Database name |
| `DB_PASSWORD` | nocobase | (secret) | Database password |
| `LOGGER_LEVEL` | nocobase | info | Log verbosity |
| `LOGGER_FORMAT` | nocobase | console | Log line format |
| `CACHE_REDIS_URL` | nocobase | - | Redis cache connection string |
| `INIT_ROOT_EMAIL` | nocobase | admin@example.com | Root administrator email |
| `LOGGER_TRANSPORT` | nocobase | console | Send logs to stdout |
| `APP_AES_SECRET_KEY` | nocobase | (secret) | 32-byte AES key, 64 hex chars |
| `INIT_ROOT_NICKNAME` | nocobase | Super Admin | Root administrator display name |
| `INIT_ROOT_PASSWORD` | nocobase | (secret) | Root administrator password |
| `INIT_ROOT_USERNAME` | nocobase | (secret) | Root administrator username |
| `CACHE_DEFAULT_STORE` | nocobase | redis | Use Redis as cache store |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/nocobase/storage`

**Category:** Other · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/nocobase-railway)
