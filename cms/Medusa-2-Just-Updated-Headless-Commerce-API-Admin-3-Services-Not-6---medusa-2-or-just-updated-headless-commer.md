# Deploy Medusa 2 | (Just Updated) Headless Commerce API + Admin, 3 Services Not 6 on Railway

Commerce API + Admin, prebuilt: 3 services, migrations on every deploy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/medusa-2-or-just-updated-headless-commer)

## About

Medusa is the open-source headless commerce platform behind stores that outgrew a hosted
cart: a complete commerce API — products, variants, inventory, carts, orders, fulfilment,
promotions, tax, regions, multi-currency pricing — plus the Admin dashboard, plus a workflow
engine you extend in TypeScript. This template deploys Medusa 2.17.2 as a prebuilt image with
PostgreSQL and Redis in three billed services instead of six, an admin account seeded before
the store is reachable, and database migrations that run on every deploy rather than only on
the first one.

Medusa is a Node application that keeps every piece of commerce state in PostgreSQL and uses
Redis for its event bus, workflow engine and cache. The Admin dashboard is not a separate
service — it is a static bundle the same server hosts — so a working store is three services,
not six.

Three Railway-specific details decide whether the deployment is sound, and all three are
handled here.

**Migrations run on every boot.** The launch script every other Medusa template on Railway
uses decides whether the database needs work by checking whether the `user` table exists, and
`db:migrate` sits inside that branch — so migrations run exactly once, on the very first boot,
and never again. Any later version bump then starts against the schema the previous version
left behind. This image migrates every time it starts.

It also connects to PostgreSQL correctly whichever PostgreSQL you point it at. Medusa infers
its TLS setting from the connection string alone — anything that is not `localhost` gets TLS
demanded of it — and its migration runner retries a failing connection forever rather than
reporting the error, so against a database without TLS `medusa db:migrate` prints "Migrations
table created successfully" and then does nothing at all: no migration SQL, no lock, no error,
just a silent reconnect loop. This image probes the server once and configures the connection
from what the server actually offers, which is why its PostgreSQL does not have to be a
special TLS-enabled build.

**The admin password is the one you set, today.** Medusa's CLI can only create an account; it
has no update or reset command, so on other templates the password applied on first boot can
never be changed again while the Railway variable panel happily shows a new value. Here a
later boot resets the password to whatever the variable currently holds, and the container
refuses to start on an empty one rather than serving a store nobody can sign in to.

**Nothing phones home.** The launch utility used across this category POSTs your Railway
project ID and public shop URL to the template author's own server on every boot, shipped as
a default in the deploy form. This template reports to nobody.

Redis is deployed with a password it actually enforces, append-only persistence, and no public
TCP proxy. Uploaded product images live on a volume instead of the disposable filesystem.

Typical cost is about **$10–15/month** on Railway for the application, PostgreSQL and Redis.
Medusa is free and open source under the MIT licence.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17.10-alpine` | Database |
| redis | `redis:8.2.1-alpine` | Database |
| medusa | `ghcr.io/bon5co/medusa-railway:2.17.2` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |
| `JWT_SECRET` | medusa | (secret) |
| `COOKIE_SECRET` | medusa | (secret) |
| `MEDUSA_ADMIN_PASSWORD` | medusa | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Start command:** `/bin/sh -c 'chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/static`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/medusa-2-or-just-updated-headless-commer)
