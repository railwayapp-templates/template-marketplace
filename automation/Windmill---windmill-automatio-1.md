# Deploy Windmill on Railway

Turn scripts into scheduled jobs, APIs and internal apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/windmill-automatio-1)

## About

Windmill is an open-source developer platform that turns ordinary scripts into production infrastructure. Write a function in Python, TypeScript, Go, Bash, PHP or plain SQL, and Windmill gives it an auto-generated input form, a REST endpoint, a webhook, a cron schedule, retries, logging and permissions — without you building any of it. Those scripts compose into multi-step flows with branching, loops and error handlers, and into internal apps. Teams reach for it when cron jobs have outgrown a single box, when Airflow is too heavy for a set of small tasks, and when a low-code tool like Zapier cannot express the logic they need. Every runnable is just code, so it stays reviewable and versioned.

Self-hosting Windmill takes more than one container, and this template wires up the shape upstream documents for production. A Caddy proxy holds the public domain and is the only service exposed to the internet. Behind it, the server runs the frontend, API and migrations; a general worker tier executes jobs in its own container; a native worker tier takes lightweight jobs so they never queue behind a slow Python build; an extra-services container supplies the editor's language servers and debugger; and Postgres holds all state, including the queue. No separate queue or cache is needed, and capacity grows by adding worker replicas or groups.

![Windmill server, workers, LSP gateway, Caddy and Postgres on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787230590/windmill-architecture.png)

Windmill sits between a job scheduler and an internal-tools builder. Self-hosting makes sense when your automations touch private databases, internal APIs or credentials you would rather not hand a SaaS vendor, and when per-task pricing looks expensive next to a server you run anyway.

Key features:

- Scripts in Python, TypeScript (Deno and Bun), Go, Bash, PHP, Rust, C# and direct SQL against Postgres, MySQL, BigQuery, Snowflake and DuckDB
- Auto-generated input forms and documented webhook endpoints for every script
- A flow editor with branching, for-loops, parallelism, retries and error handlers
- An app builder for internal dashboards backed by your own scripts
- Schedules, triggers, a secrets store, audit logs and role-based permissions
- Worker groups and tags, so heavy jobs run on their own machines

The Railway services map onto that cleanly. **Caddy** is the public entry point, splitting traffic by path between the extra-services container and the server. **windmill-server** answers the API, serves the UI and runs migrations. **windmill-worker** is the general execution tier and carries a volume for the dependency cache, so Python wheels and Go modules survive restarts. **windmill-worker-native** takes only lightweight jobs, keeping quick tasks fast while long builds occupy the general tier. **windmill-extra** supplies autocomplete, type checking and the debugger. **Postgres** stores scripts, flows, apps, secrets, run history and the queue.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| windmill-server | [gridalpha/windmill-railway](https://github.com/gridalpha/windmill-railway) (root: windmill) | Worker |
| windmill-extra | [gridalpha/windmill-railway](https://github.com/gridalpha/windmill-railway) (root: extra) | Worker |
| windmill-worker-native | [gridalpha/windmill-railway](https://github.com/gridalpha/windmill-railway) (root: windmill) | Worker |
| windmill-worker | [gridalpha/windmill-railway](https://github.com/gridalpha/windmill-railway) (root: windmill) | Database |
| caddy | [gridalpha/windmill-railway](https://github.com/gridalpha/windmill-railway) (root: caddy) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |
| `MODE` | windmill-server | server | Runs the API and frontend role |
| `PORT` | windmill-server | 8000 | HTTP port the server binds |
| `BASE_URL` | windmill-server | - | Public URL in webhooks and emails |
| `RUST_LOG` | windmill-server | info | Log verbosity |
| `DATABASE_URL` | windmill-server | - | Postgres connection, TLS off on private net |
| `WM_ADMIN_PASSWORD` | windmill-server | (secret) | First superadmin password |
| `PORT` | windmill-extra | 3000 | Gateway port fronting the extra services |
| `ENABLE_LSP` | windmill-extra | true | Editor language servers |
| `DEBUGGER_PORT` | windmill-extra | 3003 | Debugger listening port |
| `ENABLE_NSJAIL` | windmill-extra | false | Needs privileged containers |
| `ENABLE_DEBUGGER` | windmill-extra | true | Interactive DAP debugger |
| `WINDMILL_BASE_URL` | windmill-extra | - | Server address for config lookups |
| `ENABLE_MULTIPLAYER` | windmill-extra | false | Enterprise Edition feature |
| `DEBUG_ALLOWED_ORIGINS` | windmill-extra | - | Origin allowlist for debug sockets |
| `REQUIRE_SIGNED_DEBUG_REQUESTS` | windmill-extra | true | Never false on a public deployment |
| `MODE` | windmill-worker-native | worker | Runs the job execution role |
| `RUST_LOG` | windmill-worker-native | info | Log verbosity |
| `NATIVE_MODE` | windmill-worker-native | true | Lightweight in-process jobs only |
| `SLEEP_QUEUE` | windmill-worker-native | 200 | Queue poll interval in milliseconds |
| `DATABASE_URL` | windmill-worker-native | - | Postgres connection, TLS off on private net |
| `WORKER_GROUP` | windmill-worker-native | native | Worker group this container joins |
| `MIN_FREE_DISK_SPACE_MB` | windmill-worker-native | 1000 | Free space before Windmill alerts |
| `MODE` | windmill-worker | worker | Runs the job execution role |
| `RUST_LOG` | windmill-worker | info | Log verbosity |
| `NUM_WORKERS` | windmill-worker | 1 | Worker processes per container |
| `DATABASE_URL` | windmill-worker | - | Postgres connection, TLS off on private net |
| `WORKER_GROUP` | windmill-worker | default | Worker group this container joins |
| `MIN_FREE_DISK_SPACE_MB` | windmill-worker | 1000 | Free space before Windmill alerts |
| `PORT` | caddy | 8080 | Port the proxy listens on |
| `WINDMILL_EXTRA_HOST` | caddy | - | Language server upstream |
| `WINDMILL_SERVER_HOST` | caddy | - | Windmill API upstream |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/version`
- **Volume:** `/tmp/windmill/cache`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/windmill-automatio-1)
