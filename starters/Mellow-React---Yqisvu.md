# Deploy Mellow React on Railway

A full-stack React app with The Boring JavaScript Stack.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Yqisvu)

## About

This template makes it easy to deploy your Boring Stack app from day one on Railway.

After deploying this template you will need to use the environment variables in your app in `config.production.js` 

Also you will need to finish up your deploy by following the docs on setup Redis and setup database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| boring-stack | [sailscastshq/boring-stack](https://github.com/sailscastshq/boring-stack) (branch: main) (root: templates/mellow-react) | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_URL` | boring-stack | - | Connection string to the Redis instance to be used as a session store. |
| `DATABASE_URL` | boring-stack | - | Connection string to your database  |
| `SESSION_SECRET` | boring-stack | (secret) | A unique production session secret. |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `npm start`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** EJS, JavaScript, Vue, Svelte, CSS, Shell

[View on Railway →](https://railway.com/deploy/Yqisvu)
