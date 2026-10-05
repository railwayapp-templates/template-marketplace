# Deploy Windmill | Open-Source Retool and Airflow Alternative on Railway

Windmill scripts, flows and apps with workers and a superadmin on boot

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/windmill-dev)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/windmill-dev?utm_medium=integration&amp;utm_source=button&amp;utm_campaign=windmill-dev)

[Windmill](https://www.windmill.dev/) is the open-source developer platform for internal code: write a script in Python, TypeScript, Bash, Go, SQL or a dozen other languages, and Windmill gives it a generated UI, a webhook, a schedule and a place in multi-step flows with retries, approvals and branching. Build internal apps on top with a drag-and-drop editor. This template runs Windmill Community Edition 1.822.0 with a server, a job worker, a native worker and Postgres, and creates your superadmin on first boot, so Windmill's default `admin@windmill.dev` / `changeme` login never exists on a public URL.

The stack is four services: Windmill, Worker, Native Worker and Postgres.

- **Windmill** serves the web app and the API on the public domain. It does not run jobs.
- **Worker** runs the jobs: Python, TypeScript (Deno and Bun), Bash, Go, PowerShell, PHP, Rust, C#, Java, Ruby, R, Ansible, DuckDB and dbt scripts, plus flows and dependency installs.
- **Native Worker** runs the lightweight native jobs in-process: native TypeScript (`fetch`), Postgres, MySQL, GraphQL, Snowflake, BigQuery and MS SQL queries. Upstream splits these into their own worker group; without one, those jobs would sit in the queue.
- **Postgres** holds everything: scripts, flows, apps, resources, secrets (encrypted per workspace), schedules, the job queue and job logs.
- **Superadmin ready, default login gone.** On the very first boot the server starts on localhost only, creates your account from `WINDMILL_ADMIN_EMAIL` and the generated `WINDMILL_ADMIN_PASSWORD`, deletes the default admin, checks that `changeme` no longer works, and only then starts serving. Railway routes no traffic to a deploy until its health check passes, so there is no window to claim the instance.
- **One pinned version.** All three Windmill services build the same wrapper of the official image, so the server and the workers can never drift apart. Upgrades run their own migrations on boot.
- **Scripts can call Windmill.** The workers reach the server over Railway's private network, so the `wmill` client works inside scripts (reading resources and variables, starting other jobs).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Worker | [nomideusz/windmill-railway](https://github.com/nomideusz/windmill-railway) (root: /server) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Native Worker | [nomideusz/windmill-railway](https://github.com/nomideusz/windmill-railway) (root: /server) | Worker |
| Windmill | [nomideusz/windmill-railway](https://github.com/nomideusz/windmill-railway) (root: /server) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MODE` | Worker | worker | Runs Python, TypeScript, Bash, Go, SQL and other jobs |
| `DATABASE_URL` | Worker | - | Postgres on the private network |
| `WORKER_GROUP` | Worker | default | Worker group - its job tags are set in Windmill's Workers page |
| `BASE_INTERNAL_URL` | Worker | - | Where scripts reach the Windmill API (the wmill client) - the server on the private network |
| `POSTGRES_DB` | Postgres | windmill | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user - a superuser, which Windmill's migrations need to create its roles |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |
| `MODE` | Native Worker | worker | Runs lightweight native jobs in-process |
| `NATIVE_MODE` | Native Worker | true | Runs several native jobs at once in a single process |
| `SLEEP_QUEUE` | Native Worker | 200 | Queue polling interval in ms |
| `DATABASE_URL` | Native Worker | - | Postgres on the private network |
| `WORKER_GROUP` | Native Worker | native | Handles native TypeScript (fetch), Postgres, MySQL, GraphQL and other native jobs |
| `BASE_INTERNAL_URL` | Native Worker | - | Where scripts reach the Windmill API (the wmill client) - the server on the private network |
| `MODE` | Windmill | server | Runs the API and web app; jobs run on the worker services |
| `PORT` | Windmill | 8000 | Port the Windmill server listens on - leave as is |
| `BASE_URL` | Windmill | - | Public URL used in webhooks and links - set it to your custom domain after adding one |
| `DATABASE_URL` | Windmill | - | Postgres on the private network |
| `SERVER_BIND_ADDR` | Windmill | :: | Listen on IPv6 too, so the workers reach the server over Railway's private network |
| `WINDMILL_ADMIN_EMAIL` | Windmill | - | Your email - the superadmin login, created on first boot in place of Windmill's default admin@windmill.dev |
| `WINDMILL_ADMIN_PASSWORD` | Windmill | (secret) | Superadmin password, set on first boot only - copy it from here to log in, then change it in Windmill |

## Configuration

- **Start command:** `windmill`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/version`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/windmill-dev)
