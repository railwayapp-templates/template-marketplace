# Deploy Mellow Svelte on Railway

A full-stack Svelte app with The Boring JavaScript Stack.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/K-dheh)

## About

This template makes it easy to deploy your Boring Stack app from day one on Railway.

After deploying this template you will need to use the environment variables in your app in `config.production.js` 

Also you will need to finish up your deploy by following the docs on setup Redis and setup database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Redis | `bitnami/redis:7.2.5` | Database |
| boring-stack | [sailscastshq/boring-stack](https://github.com/sailscastshq/boring-stack) (branch: main) (root: templates/mellow-svelte) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `REDIS_URL` | boring-stack | - | Connection string to the Redis instance to be used as a session store. |
| `DATABASE_URL` | boring-stack | - | Connection string to your database  |
| `SESSION_SECRET` | boring-stack | (secret) | A unique production session secret. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Start command:** `npm start`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** JavaScript, EJS, Vue, Svelte, CSS, Shell

[View on Railway →](https://railway.com/deploy/K-dheh)
