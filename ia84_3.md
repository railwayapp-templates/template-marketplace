# Deploy The Boring JavaScript Stack (Sails, React, Postgres, Redis, Inertia) on Railway

A Sails starter app with React, Postgres, Redis, Inertia & Tailwind

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/ia84_3)

## About

## The Boring JavaScript Stack

- [Sails](https://sailsjs.com)
- [Inertia](https://inertiajs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Vue](https://vuejs.org), [React](https://reactjs.org), or [Svelte](https://svelte.dev)

The ethos of The Boring JavaScript Stack is this 👇🏾

You can use your favorite frontend framework and build Modern Single Page Applications(SPA) without the hassle of the complexities that building SPA the traditional way bring to the table.

With The Boring JavaScript Stack, you don't need 👇🏾

- Client-side state management - your application state lives in your database which is where it belongs.
- You don't need an API for your SPA - the data each page needs gets sent to it as props thanks to [Inertia](https://inertiajs.com)
- No double routing - The routing for your app is handled at the backend level with [Sails](https://sailsjs.com)

## Docs

[Read the docs](https://docs.sailscasts.com/boring-stack/).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| thriving-reflection | [railwayapp-templates/sails-theboringstack-react](https://github.com/railwayapp-templates/sails-theboringstack-react) | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |

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

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Other · **Languages:** EJS, JavaScript, CSS

[View on Railway →](https://railway.com/template/ia84_3)
