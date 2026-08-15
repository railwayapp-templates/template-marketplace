# Deploy Tooljet on Railway

Retool alternative. Open-source low-code platform for internal tools

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tooljet-railway)

## About

ToolJet is an open-source low-code platform for building internal tools — admin panels, CRUD dashboards, support consoles and back-office screens. You assemble a UI from around 50 drag-and-drop components, wire each one to a query against your own Postgres, MySQL, MongoDB, REST API, S3 bucket or one of 50+ other connectors, and ship it behind your team's login. Teams self-host ToolJet, the leading open-source Retool alternative, because those screens touch customer records, payments and PII that should not leave their own infrastructure.

This template runs ToolJet as five services rather than one container, the shape the project documents for production. The `tooljet` service serves the React client and the API and is the only one with a public URL. A separate `tooljet-worker` runs the same image with `WORKER=true` and consumes the BullMQ job queues. PostgreSQL holds two databases — `tooljet_production` for app definitions, users and query metadata, and `tooljet_db` for tables you create in ToolJet Database. A `postgrest` service exposes `tooljet_db` over REST, which is how ToolJet Database reads and writes rows, and Redis backs the queues and the domain cache. Everything except the app stays on Railway's private network.

![ToolJet Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786742671/fc977240-fd2c-4c85-aa48-b56bd83d5b08.png)

Internal users need screens over production data, and building each one properly costs more engineering time than it is worth. A low-code builder collapses that to an afternoon, and self-hosting keeps the data-source credentials, API keys and OAuth tokens those screens use encrypted in your own Postgres rather than a vendor's.

- Drag-and-drop builder with ~50 components — tables, forms, charts, kanban boards and maps
- 50+ connectors including PostgreSQL, MySQL, MongoDB, Snowflake, BigQuery, Stripe, Airtable, S3 and REST
- JavaScript and Python transformations on query results, plus JS event handlers on components
- ToolJet Database: a built-in no-code Postgres table editor for apps needing their own storage
- Public or private app sharing, and embedding apps elsewhere

The app service is stateless — every app definition, user, session and encrypted credential lives in Postgres — so Railway can restart or scale it freely, and no ToolJet service needs a volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tooljet | `tooljet/tooljet-ce:ce-lts-latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| tooljet-worker | `tooljet/tooljet-ce:ce-lts-latest` | Worker |
| Redis | `redis:8.2` | Database |
| postgrest | `postgrest/postgrest:v14.17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | tooljet | 3000 | HTTP listening port |
| `PG_DB` | tooljet | tooljet_production | Application metadata database |
| `PG_HOST` | tooljet | - | Postgres private hostname |
| `PG_PASS` | tooljet | - | Postgres password |
| `PG_PORT` | tooljet | 5432 | Postgres port |
| `PG_USER` | tooljet | (secret) | Postgres user |
| `PGRST_HOST` | tooljet | http://postgrest.railway.internal:3000 | PostgREST host and port |
| `REDIS_HOST` | tooljet | - | Redis private hostname |
| `REDIS_PORT` | tooljet | 6379 | Redis port |
| `TOOLJET_DB` | tooljet | tooljet_db | ToolJet Database name |
| `ORM_LOGGING` | tooljet | false | Disable ORM query logging |
| `SERVE_CLIENT` | tooljet | true | Serve the React client from this service |
| `TOOLJET_HOST` | tooljet | - | Public URL of the instance |
| `REDIS_PASSWORD` | tooljet | (secret) | Redis password |
| `REDIS_USERNAME` | tooljet | (secret) | Redis username |
| `DISABLE_SIGNUPS` | tooljet | true | Close public registration |
| `SECRET_KEY_BASE` | tooljet | (secret) | Signs session cookies |
| `TOOLJET_DB_HOST` | tooljet | - | ToolJet Database host |
| `TOOLJET_DB_PASS` | tooljet | - | ToolJet Database password |
| `TOOLJET_DB_PORT` | tooljet | 5432 | ToolJet Database port |
| `TOOLJET_DB_USER` | tooljet | (secret) | ToolJet Database user |
| `TOOLJET_EDITION` | tooljet | ce | Community edition build |
| `PGRST_JWT_SECRET` | tooljet | (secret) | Signs ToolJet Database requests |
| `CHECK_FOR_UPDATES` | tooljet | true | Check for new ToolJet releases |
| `ENABLE_TOOLJET_DB` | tooljet | true | Enable the built-in database |
| `LOCKBOX_MASTER_KEY` | tooljet | - | Encrypts stored datasource credentials |
| `DEPLOYMENT_PLATFORM` | tooljet | railway | Telemetry platform label |
| `PGRST_DB_PRE_CONFIG` | tooljet | postgrest.pre_config | PostgREST bootstrap function |
| `USER_SESSION_EXPIRY` | tooljet | 2880 | Session lifetime in minutes |
| `COMMENT_FEATURE_ENABLE` | tooljet | true | Comments on the app canvas |
| `ENABLE_MULTIPLAYER_EDITING` | tooljet | true | Real-time collaborative editing |
| `TOOLJET_QUEUE_DASH_PASSWORD` | tooljet | (secret) | Queue dashboard basic auth password |
| `DISABLE_CUSTOM_QUERY_LOGGING` | tooljet | true | Disable per-query logging |
| `SLOW_QUERY_LOGGING_THRESHOLD` | tooljet | 1000 | Slow query threshold in milliseconds |
| `TOOLJET_DB_STATEMENT_TIMEOUT` | tooljet | 60000 | Query timeout in milliseconds |
| `POSTGRES_DB` | Postgres | rRAILWAY_PRIVATE_DOMAINailway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `PG_DB` | tooljet-worker | tooljet_production | Application metadata database |
| `WORKER` | tooljet-worker | true | Run as a queue worker |
| `PG_HOST` | tooljet-worker | - | Postgres private hostname |
| `PG_PASS` | tooljet-worker | - | Postgres password |
| `PG_PORT` | tooljet-worker | 5432 | Postgres port |
| `PG_USER` | tooljet-worker | (secret) | Postgres user |
| `PGRST_HOST` | tooljet-worker | http://postgrest.railway.internal:3000 | PostgREST host and port |
| `REDIS_HOST` | tooljet-worker | - | Redis private hostname |
| `REDIS_PORT` | tooljet-worker | 6379 | Redis port |
| `TOOLJET_DB` | tooljet-worker | tooljet_db | ToolJet Database name |
| `ORM_LOGGING` | tooljet-worker | false | Disable ORM query logging |
| `PG_DB_OWNER` | tooljet-worker | false | Let only the app create databases |
| `SERVE_CLIENT` | tooljet-worker | false | No client assets on the worker |
| `TOOLJET_HOST` | tooljet-worker | - | Public URL of the instance |
| `REDIS_PASSWORD` | tooljet-worker | (secret) | Redis password |
| `REDIS_USERNAME` | tooljet-worker | (secret) | Redis username |
| `SECRET_KEY_BASE` | tooljet-worker | (secret) | Shared session signing key |
| `TOOLJET_DB_HOST` | tooljet-worker | - | ToolJet Database host |
| `TOOLJET_DB_PASS` | tooljet-worker | - | ToolJet Database password |
| `TOOLJET_DB_PORT` | tooljet-worker | 5432 | ToolJet Database port |
| `TOOLJET_DB_USER` | tooljet-worker | (secret) | ToolJet Database user |
| `TOOLJET_EDITION` | tooljet-worker | ce | Community edition build |
| `PGRST_JWT_SECRET` | tooljet-worker | (secret) | Shared ToolJet Database signing secret |
| `CHECK_FOR_UPDATES` | tooljet-worker | false | Skip update checks on the worker |
| `ENABLE_TOOLJET_DB` | tooljet-worker | true | Enable the built-in database |
| `LOCKBOX_MASTER_KEY` | tooljet-worker | - | Shared credential encryption key |
| `DEPLOYMENT_PLATFORM` | tooljet-worker | railway | Telemetry platform label |
| `PGRST_DB_PRE_CONFIG` | tooljet-worker | postgrest.pre_config | PostgREST bootstrap function |
| `WORKFLOW_TIMEOUT_SECONDS` | tooljet-worker | 300 | Workflow execution timeout |
| `TOOLJET_QUEUE_DASH_PASSWORD` | tooljet-worker | (secret) | Queue dashboard basic auth password |
| `DISABLE_CUSTOM_QUERY_LOGGING` | tooljet-worker | true | Disable per-query logging |
| `SLOW_QUERY_LOGGING_THRESHOLD` | tooljet-worker | 1000 | Slow query threshold in milliseconds |
| `TOOLJET_WORKFLOW_CONCURRENCY` | tooljet-worker | 10 | Concurrent workflow jobs |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `PORT` | postgrest | 3000 | Listening port |
| `PGRST_DB_URI` | postgrest | - | ToolJet Database connection string |
| `PGRST_DB_POOL` | postgrest | 10 | Connection pool size |
| `PGRST_LOG_LEVEL` | postgrest | info | Log verbosity |
| `PGRST_JWT_SECRET` | postgrest | (secret) | Shared ToolJet Database signing secret |
| `PGRST_SERVER_HOST` | postgrest | * | Bind all interfaces |
| `PGRST_SERVER_PORT` | postgrest | 3000 | PostgREST listening port |
| `PGRST_DB_PRE_CONFIG` | postgrest | postgrest.pre_config | Bootstrap function ToolJet creates |

## Configuration

- **Start command:** `/bin/bash -c "cd /app && exec ./server/entrypoint.sh npm run start:prod"`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/tooljet-railway)
