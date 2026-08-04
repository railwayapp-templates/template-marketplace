# Deploy pgAdmin — PostgreSQL Admin & Query Tool on Railway

Self-host pgAdmin — web GUI to manage your PostgreSQL databases

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgadmin-postgres-gui)

## About

pgAdmin is the most popular open-source admin and management tool for PostgreSQL — a full web interface for running queries, browsing and editing schemas, managing roles, monitoring performance, and handling backups and restores, all from your browser. This template deploys pgAdmin 4 on Railway with the port wired correctly and your saved server connections persisted on a volume, so it's reachable on first deploy and doesn't forget your databases every time you redeploy.

---

pgAdmin is simple to run, but two Railway-specific details separate a template that just works from one that frustrates — both handled here.

**pgAdmin is an interface, not a database.** This is the key thing to understand: pgAdmin does not include a PostgreSQL server. It's a management GUI that connects to databases you already have — a Railway PostgreSQL service or any external PostgreSQL instance. After logging in, you register a server with its host, port, database, username, and password (for a Railway Postgres service, pull these from its `DATABASE_URL`).

**The port must be wired to Railway's `PORT`, or it's unreachable.** pgAdmin listens on port 80 by default, but Railway assigns a port via the `PORT` variable and routes to it. If pgAdmin isn't told to listen on that port, Railway can't reach the container and it looks broken. This template sets `PGADMIN_LISTEN_PORT=${{PORT}}` and `PGADMIN_LISTEN_ADDRESS=0.0.0.0` so it's reachable immediately — the number-one pgAdmin-on-Railway failure, solved.

**Your saved connections persist on a volume — no re-registering every deploy.** By default pgAdmin stores server definitions inside the container, so a redeploy wipes them and you re-add every database by hand. This template attaches a volume for pgAdmin's config directory (`/var/lib/pgadmin`) so your registered servers, query history, and preferences survive redeploys — the difference that makes it usable day to day.

**Postfix is disabled.** `PGADMIN_DISABLE_POSTFIX=true` stops pgAdmin from launching its built-in mail server, which isn't needed on Railway. Configure external SMTP later if you want password-reset emails.

**Secure it — it can reach your databases.** pgAdmin logs in with `PGADMIN_DEFAULT_EMAIL` and `PGADMIN_DEFAULT_PASSWORD`. Since it holds connections to your databases, set a strong password and keep the instance access-controlled. Railway's automatic HTTPS encrypts the session.

Typical cost: **~$5/month** on Railway for the single lightweight service. pgAdmin is free and open source under the PostgreSQL License, with no paid tiers.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgadmin | `dpage/pgadmin4` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5050 | - |
| `PGADMIN_LISTEN_PORT` | 5050 | - |
| `PGADMIN_DEFAULT_EMAIL` | - | Email address used when setting up the initial administrator account to login to pgAdmin. |
| `PGADMIN_LISTEN_ADDRESS` | 0.0.0.0 | - |
| `PGADMIN_DISABLE_POSTFIX` | True | - |
| `PGADMIN_DEFAULT_PASSWORD` | (secret) | Password used when setting up the initial administrator account to login to pgAdmin. |

**Category:** Observability

[View on Railway →](https://railway.com/deploy/pgadmin-postgres-gui)
